import {Title} from '@mantine/core';
import React from 'react';

export const getServerSideProps = async () => {
	const url = process.env.API_GATEWAY_ENDPOINT;
};

/**
* @return {JSX.Element} Home object
*/
function Profile(): JSX.Element {
	return (
		<div>
			<h1>Profile</h1>
			<Title>{}</Title>
		</div>
	);
}

export default Profile;
