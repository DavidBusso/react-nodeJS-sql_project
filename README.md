Welcome to the rest api project with sql
The project is built on the customer sql tables from Jason Placeholder's website and gives access to only one of the site's users with a password that matches him (from a separate table) and after logging in the user can enter his tasks and posts with comments from all users and each user can delete and edit the tasks, posts and comments belonging to to him
Instructions
open cmd to the databse folder and run the app script to build the tables, make sure that the user and the password inside the script match your sql account
node create_schema.js
open cmd to the server folder and run the server (listener to local server 3300) through the file app
node app.js
Open cmd to the client folder and run the react application
npm start

users examples after you build database and open localhost for server and clinet
user 1 Bret 12345
