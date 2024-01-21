const { pool } = require('./pool');
const deleteUser = async (id) => {
        try {
                const [{ affectedRows }] = await pool.query(`DELETE FROM users WHERE id = ?;`, [id])
                return affectedRows;
        }
        catch (error) {
                console.log(error);
        }
};
const deleteOne = async (id, table) => {
        try {
                const [{ affectedRows }] = await pool.query(`DELETE FROM ${table} WHERE id = ?;`, [id]);
                return affectedRows;
        }
        catch (error) {
                console.log(error);
        }

};
const deletePhoto = async (id) => {
        try {
                const [{ affectedRows }] = await pool.query(`DELETE FROM photos WHERE id = ?;`, [id])
                return affectedRows;
        }
        catch (error) {
                console.log(error);
        }
};
const deleteComments = async (id, postId) => {
        try {
                const [{ affectedRows }] = await pool.query(`DELETE FROM comments WHERE id = ?;`, [postId])
                return affectedRows;
        }
        catch (error) {
                console.log(error);
        }
}
module.exports = {
        deleteUser,
        deleteOne,
        deletePhoto,
        deleteComments
}