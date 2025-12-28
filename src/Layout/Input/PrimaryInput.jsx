import React from 'react'

const PrimaryInput = ({value , onChange , type , placeholder , name , className}) => {
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(name, newValue);
  };
  return (
    
    <div>
      <input value={value} onChange={handleInputChange} className={`inline-block text-base font-medium rounded-md md:rounded-md lg:rounded-md px-3 sm:px-3 md:px-4 lg:px-5 py-3 sm:py-3 md:py-3 lg:py-3 bg-primary bg-opacity-[0.09] text-primary focus-visible:outline-[0.5px] outline-theme  w-full font-secondary ${className}`} placeholder={placeholder} type={type} name={name}  required/>
    </div>
  )
}

export default PrimaryInput