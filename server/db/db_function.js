const getData = async () => {
    const [data] = await pool.query("SELECT * FROM  users;");
    return data;
}
const getCurrentData = async (id, table) => {
    const [data] = await pool.query(`SELECT * FROM  ${table} WHERE userId = ?;`, [id]);
    return data;
}
const getCurrentComment = async (postId) => {
    const [data] = await pool.query(`SELECT * FROM  comments WHERE postId = ?;`, [postId]);
    return data;
}
const getCurrentAlbum = async (albumId) => {
    const [data] = await pool.query(`SELECT * FROM  photos WHERE albumId = ?;`, [albumId]);
    return data;
}


const createUser = async (name, username, website) => {
    await pool.query(`INSERT INTO posts (name, username, website) VALUES(?, ?, ?);`,
        [name, username, website])
    return await getData();
}
const createTodo = async (userId, title, completed, table) => {
    await pool.query(`INSERT INTO todo (userId, title, completed) VALUES(?, ?, ?);`,
        [userId, title, completed])
    return await getCurrentData(userId, table);
}
const createPosts = async (userId, title, body, table) => {
    await pool.query(`INSERT INTO posts (userId, title, body) VALUES(?, ?, ?);`,
        [userId, title, body])
    return await getCurrentData(userId, table);
}
const createComments = async ( postId, name, email, body) => {
    await pool.query(`INSERT INTO comments (postId, name, email, body) VALUES(?, ?, ?, ?);`,
        [postId, name, email, body])
    return await getCurrentComment(postId);
}
const createPhotos = async (userId, albumId, title, url, table) => {
    await pool.query(`INSERT INTO photos (albumId, title, url) VALUES(?, ?, ?);`,
        [albumId, title, url])
    return await getCurrentAlbum(userId);
}


const deleteUser = async (id) => {
    await pool.query(`DELETE FROM users WHERE id = ?;`, [id])
    return getData();
}
const deleteOne = async (id, userId, table) => {
    await pool.query(`DELETE FROM ${table} WHERE id = ?;`, [id])
    return await getCurrentData(userId, table);
}
const deletePhoto = async (id,  albumId) => {
    await pool.query(`DELETE FROM photos WHERE id = ?;`, [id])
    return await getCurrentAlbum( albumId);
}
const deleteComments = async (id, postId) => {
    await pool.query(`DELETE FROM comments WHERE id = ?;`, [id])
    return await getCurrentComment(postId);
}

const updateTitle = async (userId, id, title, table) => {
    await pool.query(`UPDATE ${table} SET title= ? WHERE id = ?;`, [title, id]);
    return await getCurrentData(userId, table);
}
const updateCompleted = async (userId, id, completed) => {
    await pool.query(`UPDATE todo SET completed =? WHERE id = ?;`, [completed, id]);
    return await getCurrentData(userId, "todo");
}
const updateBodyPost = async (userId, id, body) => {
    await pool.query(`UPDATE posts SET body =? WHERE id = ?;`, [body, id]);
    return await getCurrentData(userId,"posts");
}
const updateComments = async (postId, id, body) => {
    await pool.query(`UPDATE comments SET body =? WHERE id = ?;`, [body, id]);
    return await getCurrentComment(postId);
}

