import {useRouter} from 'next/router';
import React from 'react';

/**
* @return {JSX.Element} Home object
*/
function BlogPost(): JSX.Element {
	const router = useRouter();
	const {bid} = router.query;
	return (
		<div>
			<h1>Blog Post Id: {bid} </h1>
		</div>
	);
}

export default BlogPost;
