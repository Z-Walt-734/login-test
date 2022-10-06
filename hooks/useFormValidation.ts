
import * as yup from 'yup';

const schema = () => ({
	loginSchema: yup.object().shape({
		email: yup.string().required('Email is required.'),
		password: yup.string().required('Password is required'),
	}),
	registerSchema: yup.object().shape({
		email: yup.string().required('Email is required.'),
		username: yup.string().required('Username is required'),
		password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
		confirmPassword: yup.string().required('Confirm password').min(8, 'Password mus be at least 8 characters long').oneOf([yup.ref('password')], 'Passwords must match'),
	}),
});

export default schema;
