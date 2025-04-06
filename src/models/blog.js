import mongoose from "mongoose";

//connectTodb 
//model
//api route -->> crud operations



const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
  description: { type: String, required: true },
})


const Blog = mongoose.models?.Blog || mongoose.model("Blog",BlogSchema);

export default Blog;