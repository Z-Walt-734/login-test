import {Router, useRouter} from 'next/router';

type ValTypes = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

const useRegister = () => {
	const router = useRouter();

	const register = (vals: ValTypes, {setSubmitting}) => {
		fetch('/api/auth/register', {
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
