import React from 'react'

const SectionTitle = ({className , text , key , ...rest}) => {
  return (
    <div {...rest} className="flex items-center gap-6 ">
        <h1 key={key} className={`text-sm md:text-base text-theme uppercase z-[10] ${className}`}>{text}</h1>
        <hr className='h-1 w-14 bg-theme z-[10] hidden md:flex'/>
    </div>
  )
}

export default SectionTitle