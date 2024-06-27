import React from 'react'
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();


  return (
    <div>
      <p>It seems that you don{`'`}t have access to this page</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default Unauthorized