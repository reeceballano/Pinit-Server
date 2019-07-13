const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Todo = require('../models/todo');

const todos = [
	{ id: 1, name: "Task 1", status: 0 },
	{ id: 2, name: "Task 2", status: 1 },
	{ id: 3, name: "Task 3", status: 0 },
];

// GET TODOS
route.get('/todos', (req, res) => {
	Todo.find()
		.exec()
		.then(doc => {
			res.status(200).send(doc);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

// GET SINGLE TODO
route.get('/todos/:id', (req, res) => {

	const id = req.params.id;

	Todo.findById(id)
		.exec()
		.then(doc => {
			if(doc) {
				res.status(200).send(doc);
			} else {
				res.status(404).send('Couldnt find the given ID');
			}
		})
		.catch(err => {
			res.status(500).send(err.message);
		});
});

// UPDATE TODO
route.put('/todos/:id', (req, res) => {
	const id = req.params.id;
	const name = req.body.name;

	Todo.updateOne({ _id: id }, { name: name })
		.exec()
		.then( result => {
			res.status(200).send(result);
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

// ADD TODO
route.post('/todos', (req, res) => {
	const name = req.body.name;

	if(name.length < 3) {
		return res.status(400).send('Please provide a valid name');
	}

	const todo = new Todo({
		_id: new mongoose.Types.ObjectId(),
		name: name,
		status: req.body.status
	});

	todo
		.save()
		.then(result => {
			console.log(result);
		})
		.catch(err => console.log(err));
	
	res.status(200).send(todo);
});

// DELETE TODO
route.delete('/todos/:id', (req, res) => {
	const id = req.params.id;

	Todo.remove({_id: id})
		.exec()
		.then(results => {
			res.status(200).send('Task deleted successfully');
		})
		.catch(err => {
			res.status(500).send(err);
		});
});


module.exports = route;