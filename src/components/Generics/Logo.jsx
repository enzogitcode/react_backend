import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to={`/`}>
      <p id='customLogo'>Islanders</p>
    </Link>
  )
}

export default Logo