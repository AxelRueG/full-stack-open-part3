const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const URL = process.env.DB_URI;

mongoose
  .connect(URL)
  .then(() => console.log('connected'))
  .catch(() => console.log('error connecting to MongoDB'));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint no-param-reassign: "error" */
    /* eslint no-underscore-dangle: ["error", {"allow": ["_id","__v"]}] */
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', personSchema);
