import bcryptjs from 'bcryptjs';
import User from '../models/user_model.js';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req, res, next) => {
    const {userName, email, password, isAdmin} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); 
    const newUser = new User({userName, email, password: hashedPassword, isAdmin});

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);                         //next to just pass the error handling
    }


};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(404, 'User Not Found!'));
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if(!isValidPassword) return next(errorHandler(401, 'Wrong Credentials!'));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;               //To get not seeing the password in the validUser objc
        res
            .cookie('access_token', token, {httpOnly: true})      //store userToken inside a cookie
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
}

