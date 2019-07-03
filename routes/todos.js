const express = require('express');
const route = express.Router();

const todos = [
	{ id: 1, name: "Task 1", status: 0 },
	{ id: 2, name: "Task 2", status: 1 },
	{ id: 3, name: "Task 3", status: 0 },
];

// GET TODOS
route.get('/todos', (req, res) => {
	res.send(todos);
});

// GET SINGLE TODO
route.get('/todos/:id', (req, res) => {
	// FIND ID
	const todo = todos.find(todo => todo.id === parseInt(req.params.id));

	if(!todo) {
		return res.status(404).send('Could\'nt find the given ID');
	}

	res.send(todo);
});

// UPDATE TODO
route.put('/todos/:id', (req, res) => {
	// FIND ID
	const todo = todos.find(todo => todo.id === parseInt(req.params.id));
	const name = req.body.name;

	if(!todo) {
		return res.status(404).send('Could\'nt find the given ID');
	}

	if(name.length < 3) {
		return res.status(400).send('Please provide a valid name');
	}

	todo.name = name;
	res.send(todo);
});

// ADD TODO
route.post('/todos', (req, res) => {
	const name = req.body.name;

	if(name.length < 3) {
		return res.status(400).send('Please provide a valid name');
	}

	const todo = {
		id: todos.length + 1,
		name: name,
		status: 0
	};

	todos.push(todo);
	res.send(todos);
});

// DELETE TODO
route.delete('/todos/:id', (req, res) => {
	// FIND ID
	const todo = todos.find(todo => todo.id === parseInt(req.params.id));

	if(!todo) {
		return res.send('Could\'nt find the given ID');
	}

	const index = todos.indexOf(todo);
	todos.splice(index, 1);

	res.send('Deleted Successfully').send(todos);
});


module.exports = route;