import Link from 'next/link';
import {NavLink as MantineLink} from '@mantine/core';
import React from 'react';
import PropTypes from 'prop-types';
import {useRouter} from 'next/router';

type NavLinkProps = {
	label: string;
};

const NavLink = ({label}: NavLinkProps): JSX.Element => {
	const link = label === 'home' ? '/' : '/' + label;
	const router = useRouter();

	return (
		<Link href={link} passHref>
			<MantineLink
				component='a'
				label={label.toLocaleUpperCase()}
				active={router.pathname === link}
			/>
		</Link>
	);
};

NavLink.propTypes = {
	children: PropTypes.string,
};
export default NavLink;
