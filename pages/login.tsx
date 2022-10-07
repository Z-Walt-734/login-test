
import React from 'react';
import {useForm} from '@mantine/form';
import {Box, Button, Container, Stack, TextInput, Title} from '@mantine/core';
import schema from '../hooks/useFormValidation';

import * as yup from 'yup';
import {Formik} from 'formik';
import ErrHandler from '../components/ErrHandler';
import useAuth from '../hooks/useAuthorize';

/**
* @return {JSX.Element} Home object
*/
function Login(): JSX.Element {
	const {loginSchema} = schema();
	const {login} = useAuth();
	return (
		<>
			<Title>Login</Title>
			<Formik
				initialValues={{email: '', password: ''}}
				validationSchema={loginSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={login}
			>
				{({
					handleChange,
					handleSubmit,
					handleBlur,
					values,
					errors,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<Container size={450} px='xl'>
							<Stack mt='xl' >
								<TextInput
									onBlur={handleBlur}
									value={values?.email}
									onChange={handleChange}
									type='text'
									name='email'
									label='Email'
									placeholder='Email'
								/>
								{
									errors.email === undefined
										? <></>
										: <ErrHandler isError>{errors?.email}</ErrHandler>
								}
								<TextInput
									onBlur={handleBlur}
									value={values?.password}
									onChange={handleChange}
									type='password'
									name='password'
									label='Password'
									placeholder='Password'
								/>
								{
									errors.password === undefined
										? <></>
										: <ErrHandler isError>{errors?.password}</ErrHandler>
								}
								<Button variant='outline' type='submit' mt='lg' >Submit</Button>
							</Stack>
						</Container>
					</form>
				)

				}

			</Formik>
		</>
	);
}

export default Login;
