import React from 'react'

const Container = ({className , children}) => {
  return (
    <div className={`lg:max-w-lg xl:max-w-xl container px-4 md:px-2 mx-auto overflow-hidden ${className}`}>{children}</div>
  )
}

export default Container