import React, { ChangeEvent } from 'react'
import { IoIosCloudUpload } from "react-icons/io";

interface props {
	labelId: string;
	type: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	file: Blob | undefined;
	label: string
	required?: boolean;
    errors?: []
}

const ImageInput = ({labelId,
	type,
	onChange,
	file,
	label,
	required = false,
    errors
}: props) => {
    let objectUrl = undefined
    if(file)
        objectUrl = URL.createObjectURL(file)
  return (
    <div>
        <label
            htmlFor={labelId}
            className="flex w-[300px] min-h-[200px] overflow-hidden relative justify-center gap-2 items-center hover:bg-primary hover:text-white bg-white border border-primary rounded-md text-primary cursor-pointer"
        >
            
            <span
                className="h-full"
            >
            {
                file?
                    <div className='relative'>
                        <img 
                            src={objectUrl} 
                            className='inputImage fade-in rounded-md'
                            alt="uploaded course image" 
                        />
                        <div 
                            className="preview-image absolute gap-4 transition-all font-extrabold text-secondry flex justify-center items-center top-0 bottom-0 left-0 right-0  hover:bg-white/50"
                        >
                            <div className="hidden bg-white gap-2 items-center px-8 py-3 rounded-md">
                                <IoIosCloudUpload />
                                replace
                            </div>
                        </div>
                    </div>
                :<div className='flex items-center gap-3'>
                    <IoIosCloudUpload /> course image
                </div>
            }
            </span>
        </label>

        <input
            type={type}
            name={labelId}
            id={labelId}
            onChange={onChange}
            required={required}
            className="hidden"
            placeholder={label}
        />
        {
            errors?.map(error=>
                <span className='text-red-500 block'>{error}</span>
            )
        }
    </div>
  )
}

export default ImageInput
