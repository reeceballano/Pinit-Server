const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String,
	status: Number
});

module.exports = mongoose.model('Todo', todoSchema);