import { serviceItems2 } from '@/data/data'
import Image from 'next/image'
import React from 'react'


const Offers = () => {
  return (
    <div className='max-w-7xl mx-auto p-4 flex flex-col justify-center text-center'>
        <h4 className='font-medium text-xl sm:text-3xl lg:text-4xl capitalize text-[#24246B]'>
            Working with us
        </h4>
        <div className='my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-12'>
            {
                serviceItems2.map((item, i: number) => (
                    <div key={i} className='space-y-3'>
                        <div className='mx-auto w-full flex flex-col justify-center items-center'>
                            <Image src={item.image} alt='icon' width={100} height={100} className='' />
                        </div>
                        <h4 className='text-center  text-lg sm:text-xl lg:text-2xl text-[#24246B]'>
                            {item.Service}
                        </h4>
                        <p className='text-sm  text-[#001233]'>
                            {item.Description}
                        </p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Offers