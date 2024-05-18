'use client'
import Link from 'next/link'
import React from 'react'
import { FaTrash } from 'react-icons/fa'


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
  return (
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
                <a
                    href={``}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                >
                    <FaTrash />
                    Delete
                </a>
              </div>
            </div>
          </label>
        </div>
  )
}

export default Content
