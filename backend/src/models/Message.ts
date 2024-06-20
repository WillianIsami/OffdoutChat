import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  userId: { type: String, required: true, ref: "User" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = model('Message', MessageSchema);

export default Message;
