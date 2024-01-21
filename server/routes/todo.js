const express = require('express');
const { getCurrentData, getByInput, getCurrentDataByBoolean, getOrderBy, getValidation } = require('../db/dbGet.js');
const { createTodo } = require('../db/dbPost.js');
const { deleteOne } = require('../db/dbDelete.js');
const { updateTitle, updateCompleted } = require('../db/dbPut.js');

const todoRouter = express.Router();

todoRouter.get('/user/:id', async (req, res) => {
    try {
        console.log(req.user == req.params.id);
        if (req.user == req.params.id) {
            const resuls = await getCurrentData(req.params.id, "todo")
            if (resuls.length == 0) {
                res.status(400)
            }
            res.json(resuls);
        }
    } catch (error) {
        console.error('Error fetching todo data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.get('/user/:id/:boolean', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const resuls = await getCurrentDataByBoolean(req.params.id, req.params.boolean, "todo");
        if (resuls.length == 0) {
            res.status(400)
        }
        res.json(resuls);
    }
    } catch (error) {
        console.error('Error fetching todo data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.get('/user/:id/orderby/:column', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const resuls = await getOrderBy(req.params.id, "todo", req.params.column);
        if (resuls.length == 0) {
            res.status(400)
        }
        res.json(resuls);
    }
    } catch (error) {
        console.error('Error fetching todo data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.get('/user/:id/included/:input', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const resuls = await getByInput(req.params.id, "todo", `title`, req.params.input);

        res.json(resuls);
    }
    } catch (error) {
        console.error('Error fetching todo data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.post('/user/:id', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const { title, completed } = await req.body;
        const resuls = await createTodo(req.params.id, title, completed, "todo");
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.delete('/user/:userId/:id', async (req, res) => {
    try {
        if (req.user == req.params.userId) {
        const resuls = await deleteOne(req.params.id, 'todo')
        if (resuls)
            res.status(204).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.put('/user/:id/editTitle', async (req, res) => {
    try {
        console.log(req.user == req.params.id);
        if (req.user == req.params.id) {
        const { id, title } = req.body;
        const resuls = await updateTitle(req.params.id, id, title, "todo");
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error updating todo title:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
todoRouter.put('/user/:id/editCompleted', async (req, res) => {
    try {
        console.log(req.user == req.params.id);
        if (req.user == req.params.id) {
        const { id, completed } = req.body;
        const resuls = await updateCompleted(req.params.id, id, completed)
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error updating todo completed status:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
module.exports = todoRouter;