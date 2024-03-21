import React from 'react'
import Image from 'next/image'

import banner from "../Assets/banner.jpg"

const home = () => {
  return (
    <div>
      <Image src={banner} alt="Kharido" />
    </div>
  )
}

export default home