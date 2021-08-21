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
	onChange,
}: {
	signed: string;
	exponent: string;
	mantissa: string;
	onChange: (input: {
		signed: string;
		exponent: string;
		mantissa: string;
	}) => unknown;
}) {

	const bitFlip = (part: 'signed' | 'exponent' | 'mantissa', index: number) => {
		const flip = (input: string) => {
			const next = input[index] === '0' ? '1' : '0';
			return input.slice(0, index) + next + input.slice(index + 1);
		};

		const nextSigned = part === 'signed' ? flip(signed) : signed;
		const nextExponent = part === 'exponent' ? flip(exponent) : exponent;
		const nextMantissa = part === 'mantissa' ? flip(mantissa) : mantissa;

		onChange({
			signed: nextSigned,
			exponent: nextExponent,
			mantissa: nextMantissa,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.binaryInputs}>
				<div className={styles.inputSigned}>
					<span>
						{signed.split('').map((item, index) => {
							return (
								<span key={index} onClick={() => bitFlip('signed', index)}>
									{item}
								</span>
							);
						})}
					</span>
				</div>
				<div className={styles.inputExponent}>
					<span>
						{exponent.split('').map((item, index) => {
							return (
								<span key={index} onClick={() => bitFlip('exponent', index)}>
									{item}
								</span>
							);
						})}
					</span>
				</div>
				<div className={styles.inputMantissa}>
					<span>
						{mantissa.split('').map((item, index) => {
							return (
								<span key={index} onClick={() => bitFlip('mantissa', index)}>
									{item}
								</span>
							);
						})}
					</span>
				</div>
			</div>
			<div className={cn(styles.binaryInputs, styles.binaryDescription)}>
				<div style={{ backgroundColor: 'var(--bgSign)' }}>{signed === '1' ? '-' : '+'}</div>
				<div style={{ backgroundColor: 'var(--bgExponent)' }}>{parseInt(exponent, 2)}</div>
				<div style={{ backgroundColor: 'var(--bgMantissa)' }}></div>
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
