const Header = ({logout, data}) => {

  const handleLogout = async () => {
    await logout()
    localStorage.clear()
  }
  return (
    <div className='flex items-center justify-between mb-2'>
        <div className='text-2xl'>Hello , <br/><span className='text md:text-3xl font-semibold'>{data && (data.name)}👋</span></div>
        <button onClick={() => handleLogout()} className='bg-red-600 text-lg font-medium text-white py-2 px-4 rounded-lg'>Log Out</button>
    </div>
  )
}

export default Header