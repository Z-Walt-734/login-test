import {Router, useRouter} from 'next/router';

type ValTypes = {
	email: string;
	password: string;
};

const useRegister = () => {
	const router = useRouter();
	const register = (vals: ValTypes, {setSubmitting}) => {
		fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(vals),
		}).then(res => {
			if (res.ok) {
				router.push({
					pathname: '/confirm',
					query: {email: vals?.email},
				}, '/confirm').catch(err => {
					console.error(err);
				});
			} else {
				console.error(res);
			}
		}).catch(err => {
			console.error(err);
		}).finally(() => {
			setSubmitting(false);
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
