import BlogOverview from '@/components/blog-overview'
import React from 'react'


async function fetchListOfBlog() {
   try {

    const apiResponse = await fetch('http://localhost:3000/api/get-blog',{
      method:'GET',
      cache: "no-store",
    });

   const result = await apiResponse.json();

   return result?.data;
 
   
   } catch (error) {
     throw new Error(error)
   }
}


export default async function Blogs() {

  const blogList = await fetchListOfBlog();
  console.log(blogList);
  

  return (
    <div>
        <BlogOverview blogList={blogList} />
    </div>
  )
}
