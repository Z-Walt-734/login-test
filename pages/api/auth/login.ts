/* eslint-disable @typescript-eslint/naming-convention */
import type {AuthenticationResultType, AdminInitiateAuthCommandOutput} from '@aws-sdk/client-cognito-identity-provider';
import {CognitoIdentityProviderClient, AdminInitiateAuthCommand} from '@aws-sdk/client-cognito-identity-provider';
import type {ResponseMetadata} from '@aws-sdk/types';
import type {NextApiRequest, NextApiResponse} from 'next';
const {COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL} = process.env;

type RequestType = {
	body: {
		username: string;
		password: string;
	};
} & NextApiRequest;

const instancOfAdminInitiateAuthCommandOutput = (object: any): object is AdminInitiateAuthCommandOutput => '$metadata' in object;

const handler = async (req: RequestType, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.status(405).json({message: 'Method Not Allowed'});
	}

	const params = {
		AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
		ClientId: COGNITO_APP_CLIENT_ID,
		UserPoolId: COGNITO_USER_POOL,
		AuthParameters: {
			USERNAME: req.body.username as string,
			PASSWORD: req.body.password as string,
		},

	};

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
			const error: AdminInitiateAuthCommandOutput = err;
			// eslint-disable-next-line @typescript-eslint/dot-notation
			const responseStatus: number = err['$metadata'].httpStatusCode!;

			// eslint-disable-next-line @typescript-eslint/no-base-to-string
			res.status(responseStatus).json({message: error.toString()});
		} else {
			res.status(520).json({message: 'Unknown Error'});
		}
	}
};

export default handler;
