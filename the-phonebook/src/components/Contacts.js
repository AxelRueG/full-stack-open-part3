const Contact = ({ person, handleDelete }) => {
	const confirmDelete = () => {
		if (window.confirm(`delete ${person.name}?`)) handleDelete(person.id);
	};

	return (
		<div>
			{person.name} {person.number}{' '}
			<button onClick={confirmDelete}>delete</button>
		</div>
	);
};

const Contacts = ({ persons, search, handleDelete }) => {
	return (
		<>
			<h2>Numbers</h2>
			{persons
				.filter((elem) =>
					elem.name.toLowerCase().includes(search.toLowerCase())
				)
				.map((elem) => (
					<Contact key={elem.id} person={elem} handleDelete={handleDelete} />
				))}
		</>
	);
};

export default Contacts;
