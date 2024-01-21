const { getValidation } = require('../db/dbGet.js');
const middleware =async (req, res, next) => {
    try {
        const user = req.headers.auth;
        const [name, password] = user.split(':');
        const data =await getValidation(name, password)
        const { userExists } = data;
        const { id } = data;

        if (!userExists) {
            return res.status(401).send("your name or password is not register");
        }
        req.user = id;
        next();
    }
    catch (error) {
        console.log(error);
    }
};
module.exports = middleware;