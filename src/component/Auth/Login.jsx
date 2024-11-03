import React, { useState } from 'react'

const Login = ({handleLogin}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    handleLogin(email, password)
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='border-2 border-emerald-600 p-20 rounded-lg'>
        <form 
          onSubmit={(e) => {
            submitHandler(e)
          }}
          className='flex flex-col items-center justify-center '>
          <input
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            required
            className='bg-transparent outline-none border-2 border-emerald-600 text-l mb-2 p-2 rounded-xl'
            type='email'
            placeholder='Enter Your Email'
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            className='bg-transparent outline-none border-2 border-emerald-600 text-l  p-2 rounded-xl'
            type='password'
            placeholder='Enter Your Password'
          />
          <button className='outline-none border-none bg-emerald-600 text-xl m-2 p-2 w-full rounded-xl' >Login</button>
          <button onClick={() => handleLogin('employee1@example.com', '123')} className='outline-none border-none bg-emerald-600 text-xl m-2 p-2 w-full rounded-xl' >Emp Login</button>
          <button onClick={() => handleLogin('admin@example.com', 'adminSecurePassword')} className='outline-none border-none bg-emerald-600 text-xl m-2 p-2 w-full rounded-xl' >Admin Login</button>

        </form>
      </div>
    </div>
  )
}

export default Login