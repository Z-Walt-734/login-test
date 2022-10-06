import Document, {Head, Html, Main, NextScript} from 'next/document';
import {createGetInitialProps} from '@mantine/next';
import React from 'react';

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
	static getInitialProps = getInitialProps;
	/**
 *
 * @return {JSX.Element} Document frame to be rendered
 */
	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />

				</body>
			</Html>
		);
	}
}

export default MyDocument;
