import React from 'react';
import PropTypes from 'prop-types';
import {AppShell, Center, Header, Navbar, Text} from '@mantine/core';
import NavLink from './NavLink';

const loggedOutLinks = ['home', 'game', 'resume', 'register', 'login'];
const loggedInLinks = ['home', 'game', 'resume', 'profile', 'logout'];

const Layout = ({children}): JSX.Element => (
	<AppShell
		header={
			<Header height={40}>
				<Center>
					{
						loggedOutLinks.map((l, i) => <NavLink label={l} key={i}></NavLink>)
					}
				</Center>
			</Header>
		}
		navbar={
			<Navbar p='md' hiddenBreakpoint='sm' width={{sm: 200, lg: 300}}>
				<Text>Modifying information goes here</Text>
			</Navbar>
		}

	>

		<main>{children}</main>
	</AppShell>
);

Layout.propTypes = {
	children: PropTypes.object,
};

export default Layout;
