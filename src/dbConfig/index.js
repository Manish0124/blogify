import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    const connectionUrl = "mongodb+srv://manish123:12345@cluster0.pfh9inp.mongodb.net/"; // Use environment variable for the connection string
    if (!connectionUrl) {
      throw new Error("MongoDB connection URL is not defined in environment variables.");
    }

    await mongoose.connect(connectionUrl);

    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw error; // Re-throw the error to handle it in the calling code
  }
};

export default connectToDb;

    // const connectionUrl = "mongodb+srv://manish123:<12345>@cluster0.pfh9inp.mongodb.net/"