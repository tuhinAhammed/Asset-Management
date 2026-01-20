import React from 'react'

const MidTitle = ({className , text , key , ...rest}) => {
  return (
    <h1 
    {...rest} 
    key={key} 
    className={`text-base md:text-lg capitalize  ${className}`}>{text}</h1>
  )
}

export default MidTitle