import React from 'react'

interface props{
    title: string
}
const Button = ({title}:props) => {
  return (
    <button
        className="inline-block rounded border border-primary hover:bg-primary-hover px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring active:text-indigo-500"
    >
    {title}
    </button>
  )
}

export default Button
