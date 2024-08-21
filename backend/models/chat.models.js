import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true,
    }
});

const conversationSchema = new mongoose.Schema({
    users: [
        {
            type: String,
            required: true
        }
    ],
    msgs: [
        msgSchema
    ]

});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;