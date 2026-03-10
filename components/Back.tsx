"use client"

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

const Back = () => {
    const router = useRouter()
  return (
    <Button onClick={() => router.back()} variant={"link"}>
        <ChevronLeft /> Back
    </Button>
  )
}

export default Back