'use client'
import DeleteModal from '@/Components/Modals/DeleteModal';
import { useDeleteCourseContentMutation } from '@/redux/api/Instructor';
import Link from 'next/link'
import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify';


interface contentType{
  id: string;
  name: string;
  file: string;
  video: string
}

interface Props{
  content:contentType
}

const Content = ({content}:Props) => {
  const [openModal, setModal] = useState(false)
  const [deleteCourseContent, {isLoading, data, isError}] = useDeleteCourseContentMutation()

  const handleClose=()=>{
    setModal(!openModal)
  }
  const deleteAction = ()=>{
    deleteCourseContent({content_id: content.id})
    setModal(!openModal)
    if(!isError)
    {
      toast.success(`${content.name} deleted successfully`)
    }
    else{
      console.log(data);
      toast.error(`somethinf went wrong while deleting ${content.name}`)
    }
  }
  return (
    <>
      {
        content?
          <DeleteModal
            isLoading={isLoading} 
            handleClose={handleClose} 
            open={openModal}     
            deleteAction={deleteAction}        
          >
            you can't retrieve any content you delete ever are you sure you want to delete 
            <span className='font-bold'>"{content.name}" </span>
             session
            ?  
          </DeleteModal>
        : null
      }
      <div className="flex">
            <label
              htmlFor={content.id}
              className="w-full flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
            >
              <div className="flex items-center">
                &#8203;
                <input type="checkbox" className="size-4 rounded border-gray-300" id={content.id} />
              </div>

              <div className='w-full'>
                <strong className="font-medium text-gray-900"> {content.name} </strong>
                {
                  !content.video && !content.file?
                    <div className="">No Data Added</div>
                  :null
                }
                {
                  content.video?
                    <Link href={process.env.NEXT_PUBLIC_HOST+content.video} className="block hover:underline mt-1 text-pretty text-sm text-gray-700">
                      Video
                    </Link>
                  :null
                }
                {
                  content.file?
                    <Link href={process.env.NEXT_PUBLIC_HOST+content.file} className="block hover:underline mt-1 text-pretty text-sm text-gray-700">
                      File
                    </Link>
                  :null
                }
                <div className="flex w-full justify-end">
                  <button
                      onClick={handleClose}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                  >
                      <FaTrash />
                      Delete
                  </button>
                </div>
              </div>
            </label>
      </div>
    </>
  )
}

export default Content
