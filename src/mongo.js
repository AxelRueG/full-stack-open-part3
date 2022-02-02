const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an arguments: node mongo.js <password>'
	);
}

const password = process.argv[2];
const URL = `mongodb+srv://usuario_test:${password}@cluster0.ckh2u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(URL);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
	Person.find({}).then((response) => {
		console.log('Phonebook');
		response.map((person) => console.log(person.name, person.number));
		mongoose.connection.close();
	});
} else {
	const name = process.argv[3] ?? '';
	const number = process.argv[4] ?? '';

	const person = new Person({
		name,
		number,
	});

	person.save().then((result) => {
		console.log(`added ${result.name} number ${result.number} to phonebook`);
		mongoose.connection.close();
	});
}
