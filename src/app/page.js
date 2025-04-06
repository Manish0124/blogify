import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className=' min-h-screen  flex items-center justify-center bg-gradient-to-r from-purple-600 to bg-purple-500 ' >
      <div className=' container mx-auto  flex flex-col items-center justify-center  ' >
           <h1 className=' text-4xl font-bold mb-4  ' >Browse your collection</h1>
           <Link href={'/blogs'} className=' bg-white text-sm font-semibold py-3 px-6 rounded-md text-black '  >Explore more</Link>
      </div>
    </div>
  )
}




