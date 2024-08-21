import mongoose, {Schema, model} from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            require: true
        },
        password: {
            type: String,
            require: true
        }
    }
);
const User = model('User', userSchema);

export default User;