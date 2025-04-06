import connectToDb from "@/dbConfig";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function POST(req) {
  const addNewBlog = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
  });

  try {
    // Connect to the database
    await connectToDb();

    // Extract data from the request body
    const body = await req.json();
    const { title, description } = body;

    // Validate the input data
    const { error } = addNewBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Create a new blog entity
    const newlyCreatedBlogItem = await Blog.create({ title, description }); // Pass an object here
    if (newlyCreatedBlogItem) {
      return NextResponse.json({
        success: true,
        message: "Blog added successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong, please try later!",
      });
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try later!",
    });
  }
}