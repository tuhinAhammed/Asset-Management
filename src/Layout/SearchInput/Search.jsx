import React from 'react'
import { IoSearch } from 'react-icons/io5'

const Search = ({searchTerm , handleSearchChange , className}) => {

  return (
    <div className='border-2 border-theme rounded-sm block relative'>
    <input
      placeholder='Search Here'
      type="search"
      value={searchTerm}
      onChange={handleSearchChange}
      className='py-2 px-4 focus-visible:outline-none '
    />
    <p className='text-lg absolute text-secondary top-0 right-0 py-3 px-4 bg-theme'>
      <IoSearch />
    </p>
  </div>
  )
}

export default Search