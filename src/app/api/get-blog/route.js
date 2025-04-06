import connectToDb from "@/dbConfig";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";



export async function GET(req,res) {
      try {

        await connectToDb();
        
        const extarctBlogDataFromDb = await Blog.find({});

        if (extarctBlogDataFromDb) {
            return NextResponse.json({
                success:true,
                data: extarctBlogDataFromDb,
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "something went wrong ! please try again"
            })
        }

        
      } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"something went wrong ! try again latter"
        })
      }
  
}
