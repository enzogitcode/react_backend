import React from 'react'
import { useAuthContext } from '../../context/AuthContext'

const Home = () => {
  const {user} =useAuthContext()
  const cartId= user?.user?.carts
  
  return (
    <div>Home</div>
  )
}

export default Home