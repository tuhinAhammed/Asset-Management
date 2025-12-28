import React from 'react'

const TextareaInput = ({value , onChange , type , placeholder , name , className}) => {
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        onChange(name, newValue);
      };
  return (
    <textarea value={value} onChange={handleInputChange} className={`inline-block text-base font-medium rounded-md lg:rounded-md px-3 sm:px-3 md:px-4 lg:px-5 py-2 lg:py-4 bg-primary bg-opacity-[0.09] text-primary focus-visible:outline-[0.5px] outline-theme  w-full h-[80px] md:h-[100px] lg:h-[150px] ${className}`} placeholder={placeholder} type={type} name={name}   required></textarea>
  )
}

export default TextareaInput