import Conversation from "../models/chat.models.js";


export const addMsgToConversation = async (participants, msg) => {
    try {
        let conversation = await Conversation.findOne({
            users: {$all: participants}
        });

        if (!conversation) {
            conversation = await Conversation.create({users: participants});
        }

        conversation.msgs.push(msg);
        await conversation.save();

    } catch (error) {
        console.log('Error adding message in conversation', error.message);
    }
}

export const getMessagesForConversation = async (req, res) => {
    try {
        const {sender, receiver} = req.query;
        const participants = [sender, receiver];
        const conversation = await Conversation.findOne({
            users: {$all: participants}
        });

        if (!conversation) {
            console.log('Conversation not found');
            return res.json([]);
        }

        return res.json(conversation.msgs);

    } catch (error) {
        console.log('Error occured' + error);
        return res.status(500).json({error: 'Server error'});
    }
}