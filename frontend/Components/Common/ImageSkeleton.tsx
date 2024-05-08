import React from 'react'


interface props{
  width:string;
  height:string;
  rounded?:string
}
const ImageSkeleton = ({width, height, rounded='0px'}:props) => {
    return (
      <div 
          className={"bg-slate-400 animate-pulse"}
          style={{
                width,
                height,
                borderRadius:rounded
            }}
          >
      </div>
    )
  }
export default ImageSkeleton
