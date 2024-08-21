import User from "../models/user.models.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username');
        res.status(200).json(users)
    } catch (e) {
        console.log(e.message);
        res.status(500).json({message: 'Something went wrong'})
    }
}