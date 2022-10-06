/* eslint-disable @typescript-eslint/naming-convention */
import type {AuthenticationResultType, InitiateAuthCommandInput} from '@aws-sdk/client-cognito-identity-provider';
import {InitiateAuthCommand, CognitoIdentityProviderClient} from '@aws-sdk/client-cognito-identity-provider';
import type {NextApiRequest, NextApiResponse} from 'next';
import {JwtExpiredError, JwtInvalidClaimError} from 'aws-jwt-verify/error';
const {COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL} = process.env;
import {CognitoJwtVerifier} from 'aws-jwt-verify';

type RequestType = {
	body: AuthenticationResultType;
} & NextApiRequest;

const refreshTokens = async (tokens: AuthenticationResultType): Promise<AuthenticationResultType> => {
	console.log('Token Expired; Resetting');
	const params: InitiateAuthCommandInput = {
		ClientId: COGNITO_APP_CLIENT_ID,
		AuthFlow: 'REFRESH_TOKEN',
		// eslint-disable-next-line quote-props
		AuthParameters: {'REFRESH_TOKEN': tokens.RefreshToken!},
	};

	const newTokens = {
		RefreshToken: '',
		IdToken: '',
		AccessToken: '',
	};

	const cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({region: COGNITO_REGION});
	const initiateAuthCommand = new InitiateAuthCommand(params);

	try {
		const response = await cognitoClient.send(initiateAuthCommand);
		console.log('Refresh Response: ', response);
		// eslint-disable-next-line @typescript-eslint/dot-notation
		const responseStatus = response['$metadata'].httpStatusCode!;

		if (responseStatus === 200) {
			return response.AuthenticationResult!;
		}

		return response.AuthenticationResult!;
	} catch (err: unknown) {
		console.error(err);
	}

	return newTokens;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	console.log('Index Auth');

	// UserPoolId: "ap-south-1_vp7rmjXqs",
	// tokenUse: "id",
	// clientId: "4tl6m03brvjprg81kb5k7cakn4"

	const verifier = CognitoJwtVerifier.create({
		userPoolId: COGNITO_USER_POOL!,
		clientId: COGNITO_APP_CLIENT_ID!,
		tokenUse: 'access',
		includeRawJwtInErrors: true,
	});

	try {
		// Authentication checks (does authorization go here?)
		const payload = await verifier.verify(req.headers.authorization!);
		console.log('Auth Payload: ', payload);
		res.status(200).json({});
	} catch (err: unknown) {
		// Renew if expired
		if (err instanceof JwtExpiredError) {
			const tokens = await refreshTokens(req.body);
			res.status(200).json({...tokens});
		// Kickback to login if not authenticated
		} else if (err instanceof JwtInvalidClaimError) {
			console.error(err);
			res.redirect(401, '/login');
		// Kickback to home screen for super errors
		} else {
			console.error(err);
			res.redirect(520, '/');
		}
	}

	/** ********************************************************* */
};

export default handler;

// Validate JWT
// if not valid
//      refresh token
// return JWT || router push login
