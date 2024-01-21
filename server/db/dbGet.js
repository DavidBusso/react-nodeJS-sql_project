const { pool } = require('./pool');

const getData = async () => {
    try {
        const [data] = await pool.query("SELECT * FROM  users;");
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getCurrentName = async (id) => {
    try {
        const [data] = await pool.query(`SELECT name FROM  users WHERE id = ?;`, [id]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getCurrentData = async (id, table) => {
    try {
        const [data] = await pool.query(`SELECT * FROM  ${table} WHERE userId = ?;`, [id]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getPosts = async (id) => {
    try {
        const [data] = await pool.query(`SELECT * FROM posts;`);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getCurrentComment = async (postId) => {
    try {
        const [data] = await pool.query(`SELECT * FROM  comments WHERE postId = ?;`, [postId]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getCurrentAlbum = async (albumId) => {
    try {
        const [data] = await pool.query(`SELECT * FROM  photos WHERE albumId = ?;`, [albumId]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getOrderBy = async (id, table, column) => {
    try {
        const [data] = await pool.query(`SELECT * FROM  ${table} WHERE userId = ? order by ${column};`, [id]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getByInput = async (id, table, column, input) => {
    try {
        const [data] = await pool.query(`SELECT * FROM  ${table} WHERE userId = ?  AND ${column} LIKE '%${input}%';`, [id]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getCurrentDataByBoolean = async (id, boolean) => {
    try {
        const [data] = await pool.query(`SELECT * FROM todo WHERE userId = ? AND completed = ?;`,
            [id, boolean]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
const getValidation = async (username, password) => {
    try {
 
        const [[result]] = await pool.query(`
    SELECT u.id , EXISTS (
        SELECT 1
        FROM sqldata.users AS u
        JOIN sqldata.passwords AS p ON u.id = p.id
        WHERE u.username ='${username}' AND p.password ='${password}'
    ) AS userExists
    FROM sqldata.users AS u
    WHERE u.username ='${username}';
    `, [username, password]);
        return result;
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = {
    getData,
    getPosts,
    getOrderBy,
    getByInput,
    getCurrentName,
    getCurrentData,
    getCurrentDataByBoolean,
    getCurrentComment,
    getCurrentAlbum,
    getValidation
}