import React from 'react'
import { useParams } from 'react-router-dom'
useParams
const EditItemCart = () => {
  const { cid, pid } = useParams()
  return (
    <div>
      {cid}, {pid}
    </div>
  )
}

export default EditItemCart