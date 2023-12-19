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
        if(!isValidPassword) return next(errorHandler(401, 'Wrong Password!'));
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


export const SigInWithGoogle = async (req, res, next) => {
    //first thing I'm gone check if the user is all ready exist else create it
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc; 
            res
            .cookie('access_token', token, {httpOnly: true})      //store userToken inside a cookie
            .status(200)
            .json(rest);

        }else {

            //if we gone create the user should create a password cause with  SigUpWithGoogle is with out a pass
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);   //enerates a random password by concatenating two random strings. However, it does not enforce any specific requirements for the password

            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            //create the new user
            const newUser = new User({ 

                userName: 
                req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),   //generatedname take the userName and add a 4 random digits for it like "romdhanewadiakjtf "
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo,
            });
            //save the new user
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc; 
            res
            .cookie('access_token', token, {httpOnly: true})      //store userToken inside a cookie
            .status(200)
            .json(rest);

        }

    } catch (error) {
        next(error);
    }
}

