const FormNewNumber = ({
	name,
	number,
	handleName,
	handleNumber,
	handleSubmit,
}) => {
	return (
		<>
			<h2>add a new</h2>
			<form>
				<div>
					name: <input onChange={handleName} value={name} />
				</div>
				<div>
					number: <input onChange={handleNumber} value={number} />
				</div>
				<div>
					<button type="submit" onClick={handleSubmit}>
						add
					</button>
				</div>
			</form>
		</>
	);
};

export default FormNewNumber;
