import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { cartContext } from '../../context/CartContext'
import { profileRequest } from '../../service/config'

const Profile = () => {
  
  const { user } = useAuthContext()
  const { updateCartContext } = useContext(cartContext)

  const first_name = user?.user?.first_name
  const last_name = user?.user?.last_name
  const age = user?.user?.age
  const email = user?.user?.email
  const role = user?.user?.role
  const last_connection = user?.user?.last_connection
  const carts = user?.user?.carts

  const fetchCarts = async () => {
    if (user !== undefined) {
      updateCartContext(carts)
    }
  }
  useEffect(() => {    
    fetchCarts()
  }, [])

  if (user !== undefined) {
    return (
      <div className='profileContainer text-center py-4 mx-2 flex-column rounded-pill bg-white'>
        <h1>Bienvenido a tu profile</h1>
        <p>Nombre: {first_name}</p>
        <p>Apellido: {last_name}</p>
        <p>Edad: {age}</p>
        <p>Email: {email}</p>
        <p>Rol: {role}</p>
        <p>Tu última conexión fue: {last_connection}</p>
        {
          role == 'user' ?
            <p><Link to={`/users/upload`}>Cargar Documentos</Link></p>
            :
            null
        }
      </div>
    )
  }
  else {
    return (
      <div>Hola este es tu perfil</div>
    )
  }
}

export default Profile