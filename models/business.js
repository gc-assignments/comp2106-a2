var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  name: {
    type: String,
    required: 'Business name cannot be blank',
    trim: true,
    index: { unique: true }
  },
  description: String,
  website: String,
  phone: {
    type: String,
    required: 'Business must have phone number',
    trim: true,
  },
  email: {
    type: String
  },
  owner: {
    type: String,
    required: 'Business must have owner',
  }
});

module.exports = mongoose.model('Business', BusinessSchema);
