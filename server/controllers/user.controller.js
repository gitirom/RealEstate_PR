import bcryptjs from 'bcryptjs';
import User from '../models/user_model.js';
import { errorHandler } from '../utils/error.js';

export const updateUser = async(req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'));

    try {
        //crypt the password if the user change the pass
        if(req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        //update user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{                             //contain all existing fields from the input documents and newly added fields
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        }, {new: true})   //this for return the new values !!

        const {password, ...rest} = updatedUser._doc

        res.status(200).json(rest)


    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id)
        return next(errorHandler(401, 'You cant delete your account!'));

    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error)
    }
}

