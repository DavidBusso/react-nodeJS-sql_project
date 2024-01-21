const express = require('express');
const { getCurrentData, } = require('../db/dbGet.js');
const { deleteOne } = require('../db/dbDelete.js');
const { updateTitle } = require('../db/dbPut.js');

const albumsRouter = express.Router();

albumsRouter.get('/sql/albums/user/:id', async (req, res) => {
    try {
        res.json(await getCurrentData(req.params.id, "albums"));
    } catch (error) {
        console.error('Error fetching albums data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
albumsRouter.delete('/sql/albums/user/:id', async (req, res) => {
    try {
        res.status(204).json(await deleteOne(req.body.id, req.params.id, 'albums'));
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
albumsRouter.put('/sql/albums/user/:id/editTitle', async (req, res) => {
    try {
        const { id, title } = req.body;
        res.json(await updateTitle(req.params.id, id, title, "albums"));
    } catch (error) {
        console.error('Error deleting album:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
});
module.exports = albumsRouter;