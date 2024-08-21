import User from "../models/user.models.js";
import bcrypt from 'bcrypt';
import {generateJWTAndSetToCookie} from "../utils/jwt.util.js";

export const signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.findOne({username});

        if (user) {
            res.status(201).json({message: 'Username already exists!'});
        } else {
            const user = new User({
                username: username,
                password: hashedPassword
            });

            await user.save();
            generateJWTAndSetToCookie(user._id, res);
            res.status(201).json({message: 'User created'});
        }

    } catch (error) {
        console.log('error occuered', error);
        res.status(500).json({message: 'User registration failed'});
    }
}

const login = async () => {

}