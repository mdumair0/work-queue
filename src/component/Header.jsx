import React from 'react'

const Header = ({logout, data}) => {

  const handleLogout = () => {
    logout()
    localStorage.clear()
  }
  return (
    <div className='flex items-center justify-between mb-10'>
        <div className='text-2xl'>Hello , <br/><span className='text-3xl font-semibold'>{data && data.name}👋</span></div>
        <button onClick={() => handleLogout()} className='bg-red-600 text-lg font-medium text-white py-2 px-4 rounded-lg'>Log Out</button>
    </div>
  )
}

export default Header