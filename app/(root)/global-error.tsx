'use client'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
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
      </body>
    </html>
  )
}