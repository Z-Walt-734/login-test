/* eslint-disable @typescript-eslint/naming-convention */
import type {AuthenticationResultType, AdminInitiateAuthCommandOutput} from '@aws-sdk/client-cognito-identity-provider';
import {CognitoIdentityProviderClient, AdminInitiateAuthCommand} from '@aws-sdk/client-cognito-identity-provider';
import type {ResponseMetadata} from '@aws-sdk/types';
import type {NextApiRequest, NextApiResponse} from 'next';
const {COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL, COGNITO_SECRET} = process.env;
import {createHmac} from 'crypto';

type RequestType = {
	body: {
		email: string;
		password: string;
	};
} & NextApiRequest;

const instancOfAdminInitiateAuthCommandOutput = (object: any): object is AdminInitiateAuthCommandOutput => '$metadata' in object;

const handler = async (req: RequestType, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).json({message: 'Method Not Allowed'});
	}

	const hasher = createHmac('sha256', COGNITO_SECRET!);
	hasher.update(`${req.body.email as string}${COGNITO_APP_CLIENT_ID!}`);
	const secretHash = hasher.digest('base64');

	const params = {
		AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
		ClientId: COGNITO_APP_CLIENT_ID,
		UserPoolId: COGNITO_USER_POOL,
		AuthParameters: {
			USERNAME: req.body.email as string,
			PASSWORD: req.body.password as string,
			SECRET_HASH: secretHash,
		},

	};
	console.log(params);

	const cognitoClient: CognitoIdentityProviderClient = new CognitoIdentityProviderClient({region: COGNITO_REGION});
	const adminAuthCommand: AdminInitiateAuthCommand = new AdminInitiateAuthCommand(params);
	try {
		const response = await cognitoClient.send(adminAuthCommand);
		console.log('Login Response: ', response);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		const responseStatus: number = response['$metadata'].httpStatusCode!;

		res.status(responseStatus).json({
			...response.AuthenticationResult,
		});
	} catch (err: unknown) {
		console.error('Login Error: ', err);

		if (instancOfAdminInitiateAuthCommandOutput(err)) {
			console.error('rerouting');
			const error: AdminInitiateAuthCommandOutput = err;

			const responseStatus = 403;
			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			res.status(responseStatus).json({message: error.toString()});
		} else {
			res.status(500).json({message: 'Unknown Error'});
		}
	}
};

export default handler;
