import Image from 'next/image'
import React from 'react'

import Envison from "@/assets/time-management.png"
import Design from "@/assets/work.png"
import Craft from "@/assets/icons8-home-64.png"
import Support from "@/assets/support-80.png"

const Industry = () => {
  return (
    <div className='flex flex-col sm:gap-12 justify-center items-center gap-8 text-center py-12'>
        <h4 className='text-2xl lg:text-4xl font-medium text-[#111]'>
            Processes
        </h4>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            
            <div className='space-y-4 w-52 flex justify-center flex-col text-center items-center'>
                <Image src={Envison} alt='envison' className='' width={40} height={40} />
                <h4 className='text-xl font-medium text-[#979DAC]'>Envision</h4>
            </div>
            <div className='space-y-4 w-52 flex justify-center flex-col text-center items-center'>
                <Image src={Design} alt='design' className='' width={40} height={40} />
                <h4 className='text-xl font-medium text-[#979DAC]'>Design</h4>
            </div>
            <div className='space-y-4 w-52 flex justify-center flex-col text-center items-center'>
                <Image src={Craft} alt='envison' className='' width={40} height={40} />
                <h4 className='text-xl font-medium text-[#979DAC]'>Craft</h4>
            </div>
            <div className='space-y-4 w-52 flex justify-center flex-col text-center items-center'>
                <Image src={Support} alt='envison' className='' width={40} height={40} />
                <h4 className='text-xl font-medium text-[#979DAC]'>Support</h4>
            </div>
        </div>
    </div>
  )
}

export default Industry