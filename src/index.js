const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/Person');

// MIDDLEWARES --------------------------------------------------------------
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

// END POINTS ---------------------------------------------------------------
app.get('/info', (req, res) => {
	const html = `<p>Phonebook has info for ${
		db.length
	} people</p><p>${Date()}</p>`;
	res.send(html);
});

app.get('/api/persons/:id', (req, res, next) => {
	const { id } = req.params;
	Person.findById(id)
		.then((response) => {
			if (response) res.status(200).json(response);
			else res.status(404).json({ message: 'not found' });
		})
		.catch((e) => {
			next(e);
		});
});

app.put('/api/persons/:id', (req, res, next) => {
	const { id } = req.params;
	const { number } = req.body;
	Person.findByIdAndUpdate(id, { number }, { new: true })
		.then((response) => {
			if (response) res.status(201).json(response);
			else res.status(404).json({ message: 'not found' });
		})
		.catch((e) => next(e));
});

app.delete('/api/persons/:id', (req, res, next) => {
	const { id } = req.params;
	Person.findByIdAndDelete(id)
		.then((response) => {
			if (response) res.status(200).end();
			else res.status(404).json({ message: 'not found' });
		})
		.catch((e) => {
			next(e);
		});
});

app.post('/api/persons', (req, res, next) => {
	const { name, number } = req.body;

	if (!(number && name))
		return res.status(400).json({ error: 'fill all fields' });

	const person = new Person({
		name,
		number,
	});

	person
		.save()
		.then((response) => res.status(201).json(response))
		.catch((e) => next(e));
});

app.get('/api/persons', (req, res) =>
	Person.find({}).then((response) => res.json(response))
);

// ERRORS HANDLERS ----------------------------------------------------------
// handler of requests with unknown endpoint
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};
app.use(unknownEndpoint);

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
	console.log(error);
	if (error.name === 'CastError')
		return res.status(400).json({ error: 'malformatted id' });
	else if (error.name === 'ValidationError')
		return response.status(400).json({ error: error.message });
	else return res.status(500).end();
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listen in port:${PORT}`));
