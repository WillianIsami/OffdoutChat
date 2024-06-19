import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = model('Message', MessageSchema);

export default Message;
