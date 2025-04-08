"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"

import AddNewBlog from '../add-blog'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { useRouter } from 'next/navigation'
import { DELETE } from '@/app/api/delete-blog/route'
import { NextRequest, NextResponse } from 'next/server'
import { Label } from '../ui/label'


const InitalFormdata = {
  title : '',
  description:''
}

export default function BlogOverview({blogList}) {

   const[openDialogBox,setOpenDialogBox] = useState(false);
   const [loading,setLoading] = useState(false);
   const[blogFormData,setBlogFormData] = useState(InitalFormdata)
   const[currentEditedBlogId,setCurrentEditedBlogId] = useState(null);

   const router = useRouter()

   useEffect(() => {
    
    router.refresh()
  
   }, [])
   

   console.log(blogFormData);


    async function handleSaveBlogData() {
     try {
      setLoading(true)
      const apiResponse = currentEditedBlogId!==null ?
       await fetch(`/api/update-blog?id=${currentEditedBlogId}`,{
        method:"PUT",
        body:JSON.stringify(blogFormData)
       })
      : await fetch("/api/add-blog",{
        method:"POST",
        body:JSON.stringify(blogFormData)
      })

      const result = await apiResponse.json();
      console.log(result);

      if (result?.success) {
         setBlogFormData(InitalFormdata);
         setOpenDialogBox(false)
         setLoading(false)
         setCurrentEditedBlogId(null)
         router.refresh()

      }
      

      
     } catch (error) {
       console.log(error);
       setLoading(false);
       setBlogFormData(InitalFormdata);
       
     }
   }

   async function handleDeleteBlogById(blogId) {
      try {
        
        const apiResponse = await fetch(`/api/delete-blog?id=${blogId}`, {
          method: "DELETE",
        });

         const result =  await apiResponse.json();  

        if (result?.success)  router.refresh();
         
      } catch (error) {
        console.log(error);
        
      }
   }

   function handelEdit(getCurrentBlog) {
    // console.log("Editing blog:", getCurrentBlog);
      setCurrentEditedBlogId(getCurrentBlog?._id)
      setBlogFormData({
        title:getCurrentBlog?.title,
        description:getCurrentBlog?.description,
      })
      setOpenDialogBox(true)
   }

  //  console.log("Current Edited Blog ID:", currentEditedBlogId);
   
  

  return (
    <div className='h-screen flex flex-col gap-10 p-4 bg-gradient-to-r from-purple-800 to bg-purple-400' >
      <div  >
        <Button onClick={()=>setOpenDialogBox(true)} className=' cursor-pointer ' >Click here</Button>
      </div>
      <div>
         <h2 className=' font-bold text-2xl'>Add section here</h2>
      </div>
          
          <AddNewBlog openDialogBox={openDialogBox} setOpenDialogBox={setOpenDialogBox} loading={loading} setLoading={loading} blogFormData={blogFormData} setBlogFormData={setBlogFormData} handleSaveBlogData={handleSaveBlogData}  currentEditedBlogId={currentEditedBlogId} setCurrentEditedBlogId={setCurrentEditedBlogId} />
     
          
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 ' >
            {
              blogList && blogList.length>0 ? 
               
              blogList.map(blogitem=>
                <Card key={blogitem._id}  className="p-5" >
                    <CardTitle className="mb-5" >{blogitem?.title}</CardTitle>
                    <CardDescription>{blogitem?.description}</CardDescription>
                    <div className='mt-4 flex items-center gap-6' >
                      <Button onClick={()=>handelEdit(blogitem)}>Edit</Button>
                      <Button onClick={()=>handleDeleteBlogById(blogitem._id)} >Delete</Button>
                    </div>
                </Card>
              )

              : <Label className="text-3xl font-extrabold" >no blog found! please add one</Label>
            }
          </div>


    </div>
  )
}