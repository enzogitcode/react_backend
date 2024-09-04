import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { updateCart } from '../../service/config'
import { cartContext } from '../../context/CartContext'
const Footer = () => {
  const { user, isAuthenticated } = useAuthContext()
  const { totalContext, totalQuantityContext } = useContext(cartContext)

  useEffect(() => {
    if (isAuthenticated === true && user?.user?.carts !== undefined) {
      updateCart(user?.user?.carts)
    }
  }, [])
  if (isAuthenticated === true) {

    return (
      <div className='divFooter'>
        <div className='d-flex text-center gap-3 m-3'>
          {totalContext > 0? <div>Usuario Logueado. Productos en el carrito: {totalQuantityContext}</div> : <div>Tu carrito está vacío</div>}
          <Link to={`api/carts/usercarts`}>
            <button className='btn btn-primary'>
              Ver Carrito
            </button>
          </Link>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className='divFooter text-center d-flex flex-column'>
        <p>No hay usuario</p>
      </div>
    )
  }
}
export default Footer