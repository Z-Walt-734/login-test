import {MantineProvider} from '@mantine/core';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';

export default function App({Component, pageProps}: AppProps): JSX.Element {
	return (
		<>

			<Head>
				<title>Zach Walters&apos; Blog</title>
				<meta name='viewport' content='minimum-scale=1, inital-scale=1, width=device-width' />
			</Head>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{
					colorScheme: 'dark',
				}}>
				<Layout>

					<Component {...pageProps} />
				</Layout>

			</MantineProvider>
		</>

	);
}
