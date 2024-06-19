import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.MONGODB_USERNAME || "username";
const password = process.env.MONGODB_PASSWORD || "password";
const host = process.env.MONGODB_HOST || "0.0.0.0";
const port = process.env.MONGODB_PORT || "27017";
const db_name = process.env.MONGODB_DB_NAME || "db_name";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  console.log("lol", username, password, host, port, db_name)

  return mongoose
    .connect(
      `mongodb://${username}:${password}@${host}:${port}/${db_name}?authSource=admin`
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};

export default dbConnect;
