'use client'

interface Props {
	params: {
		id: string;
	};
}

export default function TouristVisa({ params }: Props) {
	const { id } = params;

	return (
		<>
			<h1>Tourist Visa { id }</h1>
			<p>Page content</p>
		</>
	);
}
