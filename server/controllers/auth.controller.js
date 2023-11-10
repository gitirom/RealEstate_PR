import bcryptjs from 'bcryptjs';
import User from '../models/user_model.js';

export const signup = async(req, res) => {
    const {userName, email, password, isAdmin} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10); 
    const newUser = new User({userName, email, password: hashedPassword, isAdmin});

    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error.message);
    }


};

