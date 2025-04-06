

import connectToDb from '@/dbConfig'
import Blog from '@/models/blog';
import { NextResponse } from 'next/server'
import React from 'react'

export async function DELETE(req) {
  

        try {

            await connectToDb();

            const {searchParams} = new URL(req.url);
            console.log(searchParams);
            
            const getCurrentBlogId = searchParams.get('id');

            if (!getCurrentBlogId) {
                return NextResponse.json({
                    success:false,
                    message: ' Blog id is required' 
                })
            }

            const deleteCurrentBlogById = await Blog.findByIdAndDelete(getCurrentBlogId);


            if (deleteCurrentBlogById) {
                return NextResponse.json({
                    success : true, 
                    message: "Blog deleted successfully "
                })
            }
           
                return NextResponse.json({
                    success:false,
                    message: "something went wrong please try again later!!!"
                }) 

            
        } catch (error) {
            console.log(error)
            return NextResponse.json({
                success:false,
                message: "something went wrong please try again later!!"
            })
            
        }

}
