import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Feature } from '@/components/Feature'
import React from 'react'

const HomePage = () => {
  return (
     <>
      <Navbar/>
      <Hero/>
      <Feature />
     </>
  )
}

export default HomePage
