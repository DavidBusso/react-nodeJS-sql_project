const express = require('express');
const { getCurrentComment } = require('../db/dbGet.js');
const { createComments } = require('../db/dbPost.js');
const { deleteComments } = require('../db/dbDelete.js');
const { updateComments } = require('../db/dbPut.js');

const commentsRouter = express.Router();

commentsRouter.get('/user/:id/:postId', async (req, res) => {
    try {
        const resuls = await getCurrentComment(req.params.postId)   
        res.json(resuls);
    } catch (error) {
        console.error('Error fetching comments data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})
commentsRouter.post('/user/:id/:postId', async (req, res) => {
    try {
        const { name, email, body } = await req.body;
        const resuls = await createComments(req.params.postId, name, email, body);
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})
commentsRouter.delete('/user/:id/:postId', async (req, res) => {
    try {
        console.log(req.url);
        console.log(req.body.id);
        console.log(req.params.id);
        console.log(req.user == req.params.id);
        if (req.user == req.params.id) {
        const resuls = await deleteComments(req.body.id, req.params.postId);
        if (resuls)
            res.status(204).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})
commentsRouter.put('/user/:id/:postId/editBody', async (req, res) => {
    
    try {
        if (req.user == req.params.id) {
        const { id, body } = req.body;
        const resuls = await updateComments(req.params.postId, id, body);
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error updating comment body:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})
module.exports = commentsRouter;