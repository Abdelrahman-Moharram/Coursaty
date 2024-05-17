import React, { ChangeEvent } from 'react'

interface props {
	labelId: string;
	type: string;
	onChange: (e:ChangeEvent<HTMLInputElement>) => void;
	value: string | number;
	label: string
	required?: boolean;
    children?: React.ReactNode | undefined
}

const FloatingInput = ({
    labelId,
	type,
	onChange,
	value,
	label,
	required = false,
    children
}: props) => {
  return (
    <>
        <label
            htmlFor={labelId}
            className="relative block rounded-md border border-primary/80 shadow-sm"
        >
            <input
                type={type}
                name={labelId}
                id={labelId}
                onChange={onChange}
                value={value}
                required={required}
                className="[&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none p-2 peer w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder={label}
            />
                <span
                    className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-primary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                >
                    {label}
                </span>
                {children}
        </label>
    </>
  )
}

export default FloatingInput
