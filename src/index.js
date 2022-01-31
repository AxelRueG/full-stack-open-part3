const express = require('express');
const app = express();

let db = [
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
];

app.get('/info', (req, res) => {
	const html = `<p>Phonebook has info for ${
		db.length
	} people</p><p>${Date()}</p>`;
	res.send(html);
});

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	const pos = db.findIndex((elem) => elem.id == id);
	if (pos < 0) res.status(404).json({});
	else res.status(200).json(db[pos]);
});

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id);
	db = db.filter((elem) => elem.id !== id);
	res.status(200).end();
});

app.get('/api/persons', (req, res) => res.json(db));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listen in port:${PORT}`));

// sat jan 25 2020 19:03:51 GTM +0200 (Eastem European Standart Time)
// ''
