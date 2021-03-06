import { BinaryInput } from '../components/inputs';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Container } from '../components/container';
import { DecimalInput } from '../components/inputs';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Label } from '../components/inputs';
import { Layout } from '../components/layout';
import { useRouter } from 'next/dist/client/router';

const BIAS = 1023; // 1023 is the bias for 64 bit

function decimalToBinary(input: number) {
	const negative = input.toString(10).startsWith('-');
	const [first, second = ''] = Math.abs(input).toString(2).split('.');
	const exponent = (first.length - 1) + BIAS;
	const mantissa = `${first.slice(1)}${second}`;

	return {
		signed: negative ? '1' : '0',
		exponent: exponent.toString(2).padStart(11, '0'),
		mantissa: mantissa.padEnd(52, '0'),
	};
}

function binaryToDecimal({
	signed,
	exponent,
	mantissa,
}: {
	signed: string;
	exponent: string;
	mantissa: string;
}) {
	return (
		Math.pow(-1, parseInt(signed, 2))
		*
		Math.pow(2, parseInt(exponent, 2) - BIAS)
		*
		(1 + mantissa.split('').reduce((total, next, index) => {
			if (next === '1') {
				return total + Math.pow(2, -(index + 1));
			}

			return total;
		}, 0))
	);
}

export default function Page() {
	const router = useRouter();

	const [input, setInput] = useState<number>(Math.PI);
	const [binary, setBinary] = useState(decimalToBinary(input));

	const decimalInput = router.query.decimal;
	useEffect(() => {
		if (typeof decimalInput !== 'string') {
			return;
		}

		const no = Number(decimalInput);
		if (Number.isNaN(no)) {
			return;
		}

		setInput(no);
		setBinary(decimalToBinary(no));
	}, [
		decimalInput,
		setInput
	]);

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

	const onBinaryInput = useCallback((binaryInput: {
		signed: string;
		exponent: string;
		mantissa: string;
	}) => {
		if (
			binaryInput.exponent === '1'.repeat(11) &&
			/1/gm.test(binaryInput.mantissa)
		) {
			setInput(NaN);
			setBinary({
				signed: '0',
				exponent: '1'.repeat(11),
				mantissa: '1' + '0'.repeat(51)
			});
			return;
		}

		setInput(binaryToDecimal(binaryInput));
		setBinary(binaryInput);
	}, [
		setInput,
		setBinary
	]);

	return (
		<Layout>
			<Header />

			<Container>
				<Label>Decimal</Label>
				<DecimalInput
					value={`${input}`}
					type={input === Infinity || input === -Infinity || Number.isNaN(input) ? 'text' : 'number'}
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

			<Calculation {...binary} />

			<Footer />
		</Layout>
	);
}

function Calculation({
	signed,
	exponent,
	mantissa,
}: {
	signed: string;
	exponent: string;
	mantissa: string;
}) {
	const mantissaCalc = useMemo(() => {
		return mantissa.split('').map((value, index) => {
			if (value === '0') {
				return null;
			}

			return (
				<span key={index}>
					2<sup>-{index + 1}</sup>
				</span>
			);
		}).filter(Boolean);
	}, [mantissa]);

	return (
		<Container>
			<p style={{ textAlign: 'center', fontSize: '20px', fontFamily: 'monospace' }}>
				(-1)
				<sup>
					<span style={{ backgroundColor: 'var(--bgSign)' }}>
						{signed}
					</span>
				</sup>
				&nbsp;&times;&nbsp;
				<span>
					2
					<sup>
						<span style={{ backgroundColor: 'var(--bgExponent)' }}>{parseInt(exponent, 2)}</span>
						&minus;
						{BIAS}
					</sup>
				</span>
				&nbsp;&times;&nbsp;
				<span>
					(1{mantissaCalc.length ? <>&nbsp;+&nbsp;</> : null}{mantissaCalc.length ? <span style={{ backgroundColor: 'var(--bgMantissa)' }}>{mantissaCalc.map((item, index) => <span key={index}>{index !== 0 ? <>&nbsp;+&nbsp;</> : null}{item}</span>)}</span> : null})
				</span>
			</p>
		</Container>
	);
}
