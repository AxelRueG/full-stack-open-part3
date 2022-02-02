const mongoose = require('mongoose');

const URL = process.env.DB_URI;

mongoose
	.connect(URL)
	.then(() => console.log('connected'))
	.catch(() => console.log('error connecting to MongoDB'));

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', personSchema);
