'use client'

interface Props {
	params: {
		id: string;
	};
}

export default function TrainingVisa({ params }: Props) {
	const { id } = params;

	return (
		<>
			<h1>Training Visa { id }</h1>
			<p>Training Visa content</p>
		</>
	);
}
