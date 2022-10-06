import {Title} from '@mantine/core';
import React from 'react';

const getServerSideProps = withSession( {req, res} ) => {
	
}

/**
* @return {JSX.Element} Home object
*/
function Profile({user}): JSX.Element {
	return (
		<div>
			<h1>Profile</h1>
			<Title>{user}</Title>
		</div>
	);
}

export default Profile;
