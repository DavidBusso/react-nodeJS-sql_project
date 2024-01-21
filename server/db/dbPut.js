const { pool } = require('./pool');

const updateTitle = async (userId, id, title, table) => {
    try {
        const [{ affectedRows }] = await pool.query(`UPDATE ${table} SET title= ? WHERE id = ?;`, [title, id]);
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const updateCompleted = async (userId, id, completed) => {
    try {
        const [{ affectedRows }] = await pool.query(`UPDATE todo SET completed =? WHERE id = ?;`, [completed, id]);
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const updateBodyPost = async (userId, id, body) => {
    try {
        const [{ affectedRows }] = await pool.query(`UPDATE posts SET body =? WHERE id = ?;`, [body, id]);
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};
const updateComments = async (postId, id, body) => {
    try {
        const [{ affectedRows }] = await pool.query(`UPDATE comments SET body =? WHERE id = ?;`, [body, id]);
        return affectedRows;
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = {
    updateTitle,
    updateCompleted,
    updateBodyPost,
    updateComments
}