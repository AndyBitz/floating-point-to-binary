import { BinaryInput } from '../components/inputs';
import { ChangeEvent, useCallback, useState } from 'react';
import { Container } from '../components/container';
import { DecimalInput } from '../components/inputs';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Label } from '../components/inputs';
import { Layout } from '../components/layout';

function decimalToBinary(input: number) {
	const stringed = input.toString(10);
	const dotIndex = stringed.indexOf('.');
	const decimalPlaces = dotIndex === -1 ? 0 : stringed.length - (dotIndex + 1); // Becomes the exponent

	const negative = stringed.startsWith('-'); // Cannot compare input, because -0 === +0
	const exponent = Math.min(1024, decimalPlaces); // Exponent can't be higher than 1024
	const mantissa = parseInt(stringed.replace('.', '').replace('-', ''));

	return {
		signed: negative ? '1' : '0',
		exponent: exponent.toString(2).padStart(11, '0'),
		mantissa: mantissa.toString(2).padStart(52, '0')
	};
}

export default function Page() {
	const [input, setInput] = useState<number>(Math.PI);
	const [binary, setBinary] = useState(decimalToBinary(input));

	const onDecimalInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const number = Number(event.target.value);

		if (!Number.isNaN(number)) {
			setInput(number);
			setBinary(decimalToBinary(number));
		}
	}, [
		input,
		setInput,
		setBinary
	]);

	const onBinaryInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
	}, [
		input,
		setInput
	]);

	return (
		<Layout>
			<Header />

			<Container>
				<Label>Decimal</Label>
				<DecimalInput
					value={input}
					onChange={onDecimalInput}
				/>
			</Container>

			<Container>
				<Label>Binary</Label>
				<BinaryInput
					{...binary}
					onChange={onBinaryInput}
				/>
			</Container>

			<Container>
				<p style={{ textAlign: 'center', fontSize: '20px' }}>
					<span style={{ backgroundColor: 'var(--bgSign)' }}>
						{binary.signed === '1' ? '-' : '+'}
					</span>
					<span style={{ backgroundColor: 'var(--bgMantissa)' }}>
						{parseInt(binary.mantissa, 2)}
					</span>
					&nbsp;&times;&nbsp;
					10
					<sup>-<span style={{ backgroundColor: 'var(--bgExponent)' }}>{parseInt(binary.exponent, 2)}</span></sup>
				</p>
			</Container>

			<Footer />
		</Layout>
	);
}
