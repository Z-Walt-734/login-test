import React from 'react';
import {Formik} from 'formik';
import schema from '../hooks/useFormValidation';
import {Button, Container, Stack, TextInput, Title} from '@mantine/core';
import ErrHandler from '../components/ErrHandler';

/**
* @return {JSX.Element} Home object
*/
function Register(): JSX.Element {
	const {registerSchema} = schema();

	return (
		<>
			<Title>Register</Title>
			<Formik
				initialValues={{email: '', password: '', confirmPassword: ''}}
				validationSchema={registerSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={() => {
					console.log('Submitting');
				}}
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
