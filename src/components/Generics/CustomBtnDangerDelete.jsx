import React from 'react'
import './generics.css'

const CustomBtnDangerDelete = ({title, onClick}) => {
  return (
<button variant="danger" className='btnFonts btn btn-danger text-center' onClick={onClick}>{title}</button>
)
}

export default CustomBtnDangerDelete

