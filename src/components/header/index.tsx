import { Container } from '../container';
import styles from './header.module.css';

export function Header() {
	return (
		<Container className={styles.header}>
			<h1 className={styles.headline}>Floating Point to Binary</h1>
			<p className={styles.text}>
				Convert floating point numbers to their binary representation according to the <a target="_blank" href="https://en.wikipedia.org/wiki/IEEE_754">IEEE 754</a> standard.
			</p>
		</Container>
	);
}
