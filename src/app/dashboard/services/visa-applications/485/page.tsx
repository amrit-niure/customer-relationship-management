'use client'

interface Props {
	params: {
		id: string;
	};
}

export default function PswVisa({ params }: Props) {
	const { id } = params;

	return (
		<>
			<h1>TR Visa { id }</h1>
			<p>Page content</p>
		</>
	);
}
