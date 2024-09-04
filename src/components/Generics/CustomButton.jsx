import React from 'react'
    

const CustomButton = ({title, btnType, onClick}) => {
  return (
    <button type={btnType} className='btn btn-primary text-center'onClick={onClick}>{title}</button>
  )
}

export default CustomButton

