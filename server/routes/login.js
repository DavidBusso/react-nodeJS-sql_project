const express = require('express');
const { getData, getCurrentName, getValidation } = require('../db/dbGet.js');
const { createUser } = require('../db/dbPost.js');
const { deleteUser } = require('../db/dbDelete.js');
const { middleware } = require('./validtion.js')

const loginRouter = express.Router();

loginRouter.get('/user', async (req, res) => {
    try {
        const resuls = await getData()
        if (resuls.length == 0) {
            res.status(400)
        }
        res.json(resuls);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})

loginRouter.get('/user/validation', async (req, res) => {
    try {
        res.status(200).json({ id:req.user, userExists: 1 });
    } catch (error) {
        console.error('Error validating user:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})
loginRouter.get('/user/:id', async (req, res) => {
    try {
        const [data] = await getCurrentName(req.params.id);
        if (data) {
            res.json(data);
        } else {
            res.status(400).json({ status: 404, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
})
module.exports = loginRouter;