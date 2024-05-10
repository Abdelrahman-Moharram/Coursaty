import React from 'react'

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-10 h-screen">
        <div className="md:col-span-8 col-span-10 sm:col-span-10 bg-green-300"> hi</div>
        <div className="md:col-span-2 hidden bg-green-10">by</div>
      </div>
    </div>
  )
}

export default page
