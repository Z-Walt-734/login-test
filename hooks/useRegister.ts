import {Router, useRouter} from 'next/router';
// eslint-disable-next-line @typescript-eslint/naming-convention
const {API_GATEWAY_ENDPOINT} = process.env;

type ValTypes = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

const useRegister = () => {
	const router = useRouter();

	const register = (vals: ValTypes, {setSubmitting}) => {
		const url: string | undefined = API_GATEWAY_ENDPOINT! + '/auth/register';

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(vals),
		}).then(res => {
			if (res.ok) {
				router.push({
					pathname: '/confirm',
					query: {username: vals?.username},
				},
				'/confirm').catch(err => {
					console.error(err);
				});
			} else {
				console.error(res);
			}
		}).catch(err => {
			console.error(err);
		}).finally(() => {
			// SetSubmitting(false);
		});
	};

	const confirm = () => {
		console.log('Confirming');
	};

	const unregister = () => {
		console.log('Unregistering');
	};

	return {
		register,
		confirm,
		unregister,

	};
};

export default useRegister;
