import connectToDb from "@/dbConfig";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const editBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const  getCurrentBlogId  = searchParams.get('id');

    console.log("getCurrentBlogId:", getCurrentBlogId);

    if (!getCurrentBlogId) {
        return NextResponse.json({
            success: false,
            message:"blogId is required !"
        })
    }

    const { title, description } = await req.json();

    const { error } = editBlog.validate({
      title,
      description,
    });

  if (error) {
          return NextResponse.json({
            success: false,
            message: error.details[0].message,
          });
       }


       //update the blog

       const updateBlogById = await Blog.findOneAndUpdate({
        _id: getCurrentBlogId,
       },{title,description},{new:true})

       if (updateBlogById) {
        return NextResponse.json({
            success:true,
            message:'blog update successfully !',
        })
       }
       else{
        return NextResponse.json({
            success: false,
            message: "something went wrong ! ",
          });
       }


  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "something went wrong ! ",
    });
  }
}
