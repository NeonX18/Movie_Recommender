import React from 'react'
import { Carousel } from 'flowbite-react';

const FlowBiteCarousel = () => {
  return (
    <div className="h-[80rem] mt-48">
    <Carousel>
      <img src="/register.jpg" alt="..." />
      <img src="/login.jpg" alt="..." />
      <img src="/register.jpg" alt="..." />
      <img src="/login.jpg" alt="..." />
      <img src="/register.jpg" alt="..." />
    </Carousel>
  </div>
  )
}

export default FlowBiteCarousel;