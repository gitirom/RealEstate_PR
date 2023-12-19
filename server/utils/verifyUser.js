import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    //create an error handler 
    if(!token) return next(errorHandler(401,"Not authorized to access this route"));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return next(errorHandler(403,' token is not valid!'));

        req.user = user;
        next();
    });
};