import React from 'react'
import Spinner from './Spinner';

interface props{
    title: string
    submit?: boolean;
    isLoading: boolean
}
const Button = ({title, submit, isLoading}:props) => {
  return (
    <button
        type={submit? "submit" : "button" }
        className="inline-block rounded border border-primary hover:bg-primary hover:text-white text-primary px-8 py-3 text-sm font-medium transition-all"
    >
      {isLoading ?  
        <div className='flex items-center gap-1'>
          {title}
          <Spinner sm /> 
        </div>
      : `${title}`}
    </button>
  )
}

export default Button
