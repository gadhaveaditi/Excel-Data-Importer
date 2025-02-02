
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Amount: { type: Number, required: true },
  Date: { type: Date, required: true },
  Verified: { type: Boolean, required: true },
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;
