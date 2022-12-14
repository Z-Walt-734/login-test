import React from 'react';
import {Formik} from 'formik';
import schema from '../hooks/useFormValidation';
import {Button, Container, Stack, TextInput, Title} from '@mantine/core';
import ErrHandler from '../components/ErrHandler';
import useRegister from '../hooks/useRegister';

/**
* @return {JSX.Element} Home object
*/
function Register(): JSX.Element {
	const {registerSchema} = schema();
	const {register} = useRegister();
	return (
		<>
			<Title>Register</Title>
			<Formik
				initialValues={{email: '', username: '', password: '', confirmPassword: ''}}
				validationSchema={registerSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={register}
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
									value={values?.username}
									onChange={handleChange}
									type='text'
									name='username'
									label='Username'
									placeholder='Username'
								/>
								{
									errors.username === undefined
										? <></>
										: <ErrHandler isError>{errors?.username}</ErrHandler>
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
								<TextInput
									onBlur={handleBlur}
									value={values?.confirmPassword}
									onChange={handleChange}
									type='password'
									name='confirmPassword'
									label='Confirm Password'
									placeholder='Confirm Password'
								/>
								{
									errors.confirmPassword === undefined
										? <></>
										: <ErrHandler isError>{errors?.confirmPassword}</ErrHandler>
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

export default Register;
