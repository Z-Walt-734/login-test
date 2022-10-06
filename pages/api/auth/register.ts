/* eslint-disable @typescript-eslint/naming-convention */
import type {AuthenticationResultType, AdminInitiateAuthCommandOutput, SignUpCommandInput, SignUpCommandOutput} from '@aws-sdk/client-cognito-identity-provider';
import {CognitoIdentityProviderClient, SignUpCommand} from '@aws-sdk/client-cognito-identity-provider';
import type {ResponseMetadata} from '@aws-sdk/types';
import {sign} from 'crypto';
import type {NextApiRequest, NextApiResponse} from 'next';
const {COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_SECRET} = process.env;
import {createHmac} from 'crypto';

type RequestType = {
	body: {
		password: string;
		email: string;
	};
} & NextApiRequest;

const instancOfSignUpCommandOutput = (object: any): object is SignUpCommandOutput => '$metadata' in object;

const handler = async (req: RequestType, res: NextApiResponse<AuthenticationResultType | ResponseMetadata >) => {
	if (req.method !== 'POST') {
		res.status(405).send({});
		return;
	}

	const hasher = createHmac('sha256', COGNITO_SECRET!);
	hasher.update(`${req.body.email as string}${COGNITO_APP_CLIENT_ID!}`);
	const secretHash = hasher.digest('base64');

	const params: SignUpCommandInput = {
		ClientId: COGNITO_APP_CLIENT_ID,
		SecretHash: secretHash,
		Password: req.body.password as string,
		Username: req.body.email as string,
		UserAttributes: [
			{
				Name: 'preferred_username',
				Value: req.body.username as string,
			},
		],

	};

	const cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({region: COGNITO_REGION});
	const signupCommand: SignUpCommand = new SignUpCommand(params);
	try {
		const response = await cognitoClient.send(signupCommand);
		console.log('Register Response: ', response);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		const responseStatus: number = response['$metadata'].httpStatusCode!;

		res.status(responseStatus).send({});
		return;
	} catch (err: unknown) {
		console.error('Register Error: ', err);

		if (instancOfSignUpCommandOutput(err)) {
			// eslint-disable-next-line @typescript-eslint/dot-notation
			const responseStatus: number = err['$metadata'].httpStatusCode!;
			// eslint-disable-next-line @typescript-eslint/dot-notation
			res.status(responseStatus).json({...err['$metadata']});
		} else {
			res.status(500).json({});
		}
	}
};

export default handler;
