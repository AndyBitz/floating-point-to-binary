import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './inputs.module.css';

export function Label({ children, className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label {...props} className={cn(styles.label, className)}>
			{children}
		</label>
	);
}

export function DecimalInput(props: InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className={styles.container}>
			<input
				className={styles.decimalInput}
				type="number"
				{...props}
			/>
		</div>
	);
}

export function BinaryInput({
	signed,
	exponent,
	mantissa,
	onChange
}: {
	signed: string;
	exponent: string;
	mantissa: string;
	onChange: unknown;
}) {
	return (
		<div className={styles.container}>
			<div className={styles.binaryInputs}>
				<div className={styles.inputSigned}>
					<input
						readOnly
						type="text"
						minLength={1}
						maxLength={1}
						value={signed}
					/>
				</div>
				<div className={styles.inputExponent}>
					<input
						readOnly
						type="text"
						minLength={11}
						maxLength={11}
						value={exponent}
					/>
				</div>
				<div className={styles.inputMantissa}>
					<input
						readOnly
						type="text"
						minLength={52}
						maxLength={52}
						value={mantissa}
					/>
				</div>
			</div>
			<div className={cn(styles.binaryInputs, styles.binaryDescription)}>
				<div style={{ backgroundColor: 'var(--bgSign)' }}>{signed === '1' ? '-' : '+'}</div>
				<div style={{ backgroundColor: 'var(--bgExponent)' }}>{parseInt(exponent, 2)}</div>
				<div style={{ backgroundColor: 'var(--bgMantissa)' }}>{parseInt(mantissa, 2)}</div>
			</div>
			<div className={cn(styles.binaryInputs, styles.binaryDescription)}>
				<div></div>
				<div>Exponent</div>
				<div>Mantissa</div>
			</div>
			<div className={cn(styles.binaryInputs, styles.binaryDescription)}>
				<div></div>
				<div>11 bits</div>
				<div>52 bits</div>
			</div>
		</div>
	);
}
