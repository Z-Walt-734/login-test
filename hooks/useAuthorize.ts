import type {UserNotConfirmedException} from '@aws-sdk/client-cognito-identity-provider';
import {useRouter} from 'next/router';

type ValsType = {
	email: string | undefined;
	password: string | undefined;
};

const useAuth = () => {
	const router = useRouter();
	const login = (vals: ValsType, {setSubmitting}) => {
		console.log('Logging in');
		fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify(vals),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(async res => {
			if (res.ok) {
				return res;
			}

			const responseData: UserNotConfirmedException = await res.json() as UserNotConfirmedException;
			if (responseData?.message?.includes('UserNotConfirmedException')) {
				await fetch('/api/confirm/send', {
					method: 'POST',
					body: JSON.stringify({email: vals.email}), // CHECK THIS LATER
					headers: {
						'Content-Type': 'application/json',
					},
				});
				await router.push({
					pathname: '/confirm',
					query: {email: vals.email},
				});
			}
		}).then(res => {
			console.log('useAuth Data: ', res);
		}).catch((err: unknown) => {
			console.error('useAuth Error: ', err);
		}).finally(() => {
			// SetSubmitting(false);
		});
	};

	const changePasswordRequest = () => {
		console.log('Resetting password');
	};

	const changePassword = () => {
		console.log('Changeing password ');
	};

	const verifyId = () => {
		console.log('Verifying Id ');
	};

	const verifyAccess = () => {
		console.log('Verifying Access ');
	};

	const verifyRefresh = () => {
		console.log('Verifying refresh ');
	};

	return {
		login,
		changePasswordRequest,
		changePassword,
		verifyId,
		verifyAccess,
		verifyRefresh,
	};
};

export default useAuth;
