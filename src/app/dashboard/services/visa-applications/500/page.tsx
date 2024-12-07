'use client'

interface Props {
	params: {
		id: string;
	};
}

export default function StudentVisa({ params }: Props) {
	const { id } = params;

	return (
		<>
			<h1>Student Visa { id }</h1>
			<p>Page content</p>
		</>
	);
}
