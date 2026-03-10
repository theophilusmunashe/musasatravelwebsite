import React from 'react'

import ork from "@/assets/undraw_qa_engineers_dg-5-p.svg"
import chore from "@/assets/undraw_chore_list_re_2lq8.svg"
import Image from 'next/image'

const Header = ({title}: {title: string}) => {
  return (
    <div  className='bg-[#011E30] h-56 flex items-center flex-col justify-center text-white p-4 sm:p-8 lg:p-12 py-20 relative'>
        <h4 className='text-xl font-semibold'>Capture - Blog</h4>
        <button></button>
        <h4 className='text-2xl sm:text-3xl lg:text-4xl  font-bold header capitalize relative mx-auto text-center'>
            {title}
        </h4>
        <div className='w-40 md:w-56 absolute bottom-0 left-4'>
          <Image src={ork} width={100} height={100} alt='work' className='animate-pulse w-full h-full object-contain' />
        </div>
        <div className='w-20 absolute top-4 right-4'>
          <Image src={chore} width={100} height={100} alt='work' className='w-full h-full object-contain' />
        </div>
    </div>
  )
}

export default Header