import Message from "../models/Message.js";

const createMessage = async (messageData: { user: string, content: string }) => {
    const message = new Message(messageData);
    await message.save();
    return message;
};

const getMessages = async () => {
    const messages = await Message.find().sort({ createdAt: -1 });
    return messages;
};

export default { createMessage, getMessages };
