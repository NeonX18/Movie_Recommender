import React from 'react'
import VideoPlayer from "../components/video/Videoplayer"

const Test = ({m_id}) => {
  return (
    <div className = "w-full h-full"><VideoPlayer id={m_id}/></div>
  )
}

export default Test
