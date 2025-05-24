import pkg from "stream-chat";
const { StreamChat } = pkg;
import "dotenv/config.js";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("stream api or stream secret is missing.");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdStream = userId.toString();
    return streamClient.createToken(userIdStream);
  } catch (error) {
    console.error("Error in generating stream token", error);
  }
};
