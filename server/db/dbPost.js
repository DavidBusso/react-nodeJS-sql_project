const { pool } = require('./pool');

const createUser = async (name, username, website) => {
    try {
        const [{ affectedRows }] = await pool.query(`INSERT INTO users (name, username, website) VALUES(?, ?, ?);`,
            [name, username, website])
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const createTodo = async (userId, title, completed, table) => {
    try {
        const [{ affectedRows }] = await pool.query(`INSERT INTO todo (userId, title, completed) VALUES(?, ?, ?);`,
            [userId, title, completed]);
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const createPosts = async (userId, title, body, table) => {
    try {
        const [{ affectedRows }] = await pool.query(`INSERT INTO posts (userId, title, body) VALUES(?, ?, ?);`,
            [userId, title, body])
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const createComments = async (postId, name, email, body) => {
    try {
        const [{ affectedRows }] = await pool.query(`INSERT INTO comments (postId, name, email, body) VALUES(?, ?, ?, ?);`,
            [postId, name, email, body])
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const createPhotos = async (userId, albumId, title, url, table) => {
    try {
        const [{ affectedRows }] = await pool.query(`INSERT INTO photos (albumId, title, url) VALUES(?, ?, ?);`,
            [albumId, title, url])
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
}
module.exports = {
    createUser,
    createTodo,
    createPosts,
    createComments,
    createPhotos
}