import { ReactNode } from 'react';
import Head from 'next/head';
import styles from './layout.module.css';

export function Layout({ children }: { children: ReactNode; }) {
	return (
		<main className={styles.main}>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Floating Point to Binary</title>
			</Head>
			{children}
		</main>
	);
}
