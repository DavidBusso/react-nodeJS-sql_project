const express = require('express');
const { getCurrentData, getPosts, getOrderBy, getByInput } = require('../db/dbGet.js');
const { createPosts } = require('../db/dbPost.js');
const { deleteOne } = require('../db/dbDelete.js');
const { updateTitle, updateBodyPost } = require('../db/dbPut.js');

const postsRouter = express.Router();

postsRouter.get('/user/:id', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const resuls = await getPosts(req.params.id, "posts")
        if (resuls.length == 0) {
            res.status(400)
        }
        res.json(resuls);
    }
    } catch (error) {
        console.error('Error fetching posts data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
postsRouter.get('/user/:id/order/:column', async (req, res) => {
    try {  
          if (req.user == req.params.id) {
        const resuls = await getOrderBy(req.params.id, "posts", req.params.column);
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
postsRouter.post('/user/:id', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const { title, body } = await req.body;
        const resuls = await createPosts(req.params.id, title, body, "posts");
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
postsRouter.get('/user/:id/included/:input', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const resuls = await getByInput(req.params.id, "posts", `title`, req.params.input);
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
postsRouter.delete('/user/:userId/:id', async (req, res) => {
    try {
        if (req.user == req.params.userId) {
        const resuls = await deleteOne(req.params.id, 'posts');
        if (resuls)
            res.status(204).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
postsRouter.put('/user/:id/editTitle', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const { id, title } = req.body;
        const resuls = await updateTitle(req.params.id, id, title, "posts");
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error updating post title:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
postsRouter.put('/user/:id/editBody', async (req, res) => {
    try {
        if (req.user == req.params.id) {
        const { id, body } = req.body;
        const resuls = await updateBodyPost(req.params.id, id, body);
        if (resuls)
            res.status(201).json(resuls);
        else res.status(400).json(resuls);
    }
    } catch (error) {
        console.error('Error updating post body:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
module.exports = postsRouter;