import React from 'react'
import { FaTools } from 'react-icons/fa'

const ErrorPage = () => {
  return (
    <div className='min-h-screen bg-zinc-700'>
        <div className="flex flex-col justify-center items-center text-white h-screen">
            <h4 className='text-3xl md:text-4xl flex items-center gap-2'>
                Under constrcuction <span><FaTools />  </span>
            </h4>
            <p className='text-lg capitalize'>please be patient...</p>
        </div>
    </div>
  )
}

export default ErrorPage