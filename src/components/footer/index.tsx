import styles from './footer.module.css';

export function Footer() {
	return (
		<footer className={styles.footer}>
			<span>
				<a href="https://github.com/AndyBitz/floating-point-to-binary" target="_blank">
					Project on GitHub
				</a>.
			</span>
			&nbsp;
			<span>
				Made by <a href="https://twitter.com/andybitz_" target="_blank">Andy</a>.
			</span>
		</footer>
	);
}
