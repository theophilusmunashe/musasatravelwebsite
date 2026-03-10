'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
     <div className='min-h-screen bg-zinc-700'>
     <div className="flex flex-col justify-center items-center text-white h-screen">
         <h4 className='text-3xl md:text-4xl flex items-center gap-2'>
         Something went wrong!
         </h4>
         <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
     </div>
 </div>
  )
}