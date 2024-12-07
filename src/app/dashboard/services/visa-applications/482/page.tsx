'use client'

interface Props {
	params: {
		id: string;
	};
}

export default function WorkVisa({ params }: Props) {
	const { id } = params;

	return (
		<>
			<h1>Work Visa { id }</h1>
			<p>Page content</p>
		</>
	);
}
