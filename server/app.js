const express = require('express');
var cors = require('cors')
const loginRouter=require('./routes/login.js');
const todoRouter=require('./routes/todo.js');
const postsRouter=require('./routes/posts.js');
const albumsRouter =require('./routes/albums.js');
const commentsRouter =require('./routes/comments.js');
const middleware = require('./routes/validtion.js')


const app = express();
app.use(cors());

app.listen(3300);
app.use(express.json());
app.use(middleware);
app.use('/sql/login',loginRouter);
app.use('/sql/todo', todoRouter);
app.use('/sql/posts',postsRouter);
app.use('/sql/albums',albumsRouter);
app.use('/sql/comments',commentsRouter);