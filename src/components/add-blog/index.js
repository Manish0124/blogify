import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function AddNewBlog({openDialogBox,setOpenDialogBox ,loading,setLoading,blogFormData,setBlogFormData,handleSaveBlogData, currentEditedBlogId,setCurrentEditedBlogId}) {
  return (
    <div>

<Dialog open={openDialogBox} onOpenChange={()=>{
    setOpenDialogBox(false)
    setBlogFormData({
            title : '',
            description:''
    });
    setCurrentEditedBlogId(null);
}}  >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
            <DialogTitle>{currentEditedBlogId ? 'Edit blog': 'Add Blog' }</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input  id="title" name="title" placeholder="Enter your blog title" value={blogFormData.title} onChange={(event)=>setBlogFormData({...blogFormData,title:event.target.value,})}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              description
            </Label>
            <Input name="description" placeholder="enter your blog" value={blogFormData.description} onChange={(event)=>setBlogFormData({...blogFormData,description:event.target.value})} id="description" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSaveBlogData} type="button">{loading ? "saving changes": "saved changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    </div>
  )
}
