const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/Person');

// MIDDLEWARES ---------------------------------------------------------
app.use(express.json());
app.use(cors());
app.use(
	morgan((tokens, req, res) => {
		const str = JSON.stringify(req.body);
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			str,
		].join(' ');
	})
);

app.use(express.static(__dirname + '/build'));

// END POINTS ----------------------------------------------------------
app.get('/info', (req, res) => {
	const html = `<p>Phonebook has info for ${
		db.length
	} people</p><p>${Date()}</p>`;
	res.send(html);
});

app.get('/api/persons/:id', (req, res) => {
	const { id } = req.params;
	Person.findById(id)
		.then((response) => {
			if (response) res.status(200).json(response);
			else res.status(404).json({ message: 'not found' });
		})
		.catch((e) => {
			console.error(e);
			res.status(500).end();
		});
});

app.delete('/api/persons/:id', (req, res) => {
	const { id } = req.params;
	Person.findByIdAndDelete(id)
		.then((response) => {
			if (response) res.status(200).end();
			else res.status(404).json({ message: 'not found' });
		})
		.catch((e) => {
			console.error(e);
			res.status(500).end();
		});
});

app.post('/api/persons', (req, res) => {
	const { name, number } = req.body;

	if (!(number && name))
		return res.status(400).json({ error: 'fill all fields' });

	const person = new Person({
		name,
		number,
	});

	person.save().then((response) => res.status(201).json(response));
});

app.get('/api/persons', (req, res) =>
	Person.find({}).then((response) => res.json(response))
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listen in port:${PORT}`));

// OLD DB
/*let db = [
	{
		id: 1,
		name: 'Arto Hellas',
		number: '040-123456',
	},
	{
		id: 2,
		name: 'Ada Lovelace',
		number: '39-44-53235223',
	},
	{
		id: 3,
		name: 'Dan Abramov',
		number: '12-43-234345',
	},
	{
		id: 4,
		name: 'Mary Poppendick',
		number: '39-23-6423122',
	},
];*/
