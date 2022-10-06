/* eslint-disable @typescript-eslint/naming-convention */
import type {AuthenticationResultType, AdminInitiateAuthCommandOutput, SignUpCommandInput, SignUpCommandOutput} from '@aws-sdk/client-cognito-identity-provider';
import {CognitoIdentityProviderClient, SignUpCommand} from '@aws-sdk/client-cognito-identity-provider';
import type {ResponseMetadata} from '@aws-sdk/types';
import {sign} from 'crypto';
import type {NextApiRequest, NextApiResponse} from 'next';
const {COGNITO_REGION, COGNITO_APP_CLIENT_ID, COGNITO_USER_POOL} = process.env;

type RequestType = {
	body: {
		username: string;
		password: string;
		email: string;
		dob: string;
	};
} & NextApiRequest;

const instancOfSignUpCommandOutput = (object: any): object is SignUpCommandOutput => '$metadata' in object;

const handler = async (req: RequestType, res: NextApiResponse<AuthenticationResultType | ResponseMetadata >) => {
	if (req.method !== 'POST') {
		res.status(405).send({});
		return;
	}

	const params: SignUpCommandInput = {
		ClientId: COGNITO_APP_CLIENT_ID,
		Password: req.body.password as string,
		Username: req.body.username as string,
		UserAttributes: [
			{
				Name: 'Email',
				Value: req.body.email as string,
			},
			{
				Name: 'DOB',
				Value: req.body.dob as string,
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
			res.status(520).json({});
		}
	}
};

export default handler;
