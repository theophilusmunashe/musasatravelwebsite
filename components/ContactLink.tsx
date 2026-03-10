import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ContactLink = () => {
  return (
    <div className='my-12 mx-4 md:mx-10 w-fit'>
        <Link href={"/contact"} className='py-2 px-4 text-xl md:text-3xl underline font-medium my-6 flex items-center gap-4 transition-all hover:font-bold' >
        Book a consultation <ArrowUpRight />
    </Link>
    </div>
  )
}

export default ContactLink