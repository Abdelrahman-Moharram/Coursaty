import React from 'react';



interface Props{
    children: React.ReactNode;
    handleClose:()=>void;
    open: boolean;
}
export default function BaseModal({children, open, handleClose}:Props) {


  return (
    <div className="">
    {
      open?
        <>
          <div 
            onClick={handleClose}
            className="fixed top-0 bottom-0 right-0 left-0 bg-black/20 z-[2]"
            >
          </div>
          <div className="flex items-center pt-10 justify-center">
            <div className="w-fit h-fit rounded-md shadow-md p-4 bg-white fixed z-20">
                {children}
            </div>
          </div>
        </>

      :null
    }
    </div>
  );
}
