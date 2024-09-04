import { useContext, useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { clearCart, deleteProducts, getCartById, deleteProductCart, updateQuantity } from '../../service/config'
import { NavLink, useNavigate } from 'react-router-dom'
import { cartContext } from '../../context/CartContext'
import './carts.css'

const UserCarts = () => {
  const { user } = useAuthContext()
  const navigate= useNavigate()
  const { updateCartContext } = useContext(cartContext)
  const [products, setProducts] = useState(null)

  const [total, setTotal] = useState(0)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [showEditorQuantity, setShowEditorQuantity] = useState(false)
  const cartId = user?.user?.carts
  const userId= user?.user?._id
  console.log(userId)
  const fetchCarts = async () => {
    const res = await getCartById(cartId)
    const resProd = res.data.products
    const dataTotal = resProd.map(item => (parseInt(item.product.price) * (item.quantity))).reduce((acc, item) => item + acc, 0)
    console.log(dataTotal)
    const totalQuantity = resProd.map((item) => item.quantity).reduce((acc, item) => acc + item, 0)
    console.log(totalQuantity)
    setTotalQuantity(totalQuantity)
    setTotal(dataTotal)
    setProducts(resProd)
    updateCartContext(cartId)
  }
  useEffect(() => {
    fetchCarts()
  }, [])
  useEffect(() => {
    updateCartContext(cartId)
  }, [])

  const handleClearDelete = async (cartId) => {
    await clearCart(cartId)
    alert('Vaciaste el carrito')
    fetchCarts()
    updateCartContext(cartId)
  }
  const handleDeleteProductCart = async (cartId, item) => {
    await deleteProductCart(cartId, item.product._id)
    alert(`Producto eliminado del carrito: ${item.product.title} , ${item.product._id}`)
    fetchCarts()
    updateCartContext(cartId)
  }
  const editorQuantity = () => {
    setShowEditorQuantity(true)
  }

  const handleUpdateQuantity = async (cartId, item) => {

    await updateQuantity(cartId, item.product._id)

    alert(`Producto actualizado del carrito: ${item.product.title} , ${item.product._id}, nueva cantidad: ${item.quantity}`)
    fetchCarts()
  }
  return (
    <>
      <h1 className='text-center m-2 cartTitle'>Mi Carrito</h1>
      <div className='cartContainer text-center mb-3'>
        <div className='itemCartContainer d-flex flex-wrap flex-column align-items-center justify-content-center gap-4 text-center'>
          {products?.map(item => (
            <div className='itemCart d-flex text-center rounded-pill flex-wrap gap-3 p-4 img-fluid justify-content-center' key={item._id}>
              <h5 className='text-wrap'>{item.product.title}</h5>
              <div>
                <h5 className='text-wrap'>Precio: ${item.product.price}</h5>
              </div>
              <h5 className='text-wrap'>Cantidad: {item.quantity}</h5>
              <button className='btn btn-primary rounded-pill'><NavLink to={`updated/${cartId}/products/${item.product._id}`}>Editar</NavLink></button>
              <button className='btn btn-danger rounded-pill' onClick={() => handleDeleteProductCart(cartId, item)}>Eliminar del carrito</button>
            </div>
          ))}
        </div>
        {totalQuantity >0 ?
        <div className="totalContainer text-center mt-3">
          <h5>Cantidad total de productos: {totalQuantity}</h5>
          <h5>Total: $ {total}</h5>
        </div>
        :
        <div>
          <h5>El carrito esta Vacío</h5>
          <button className='btn btn-primary' onClick={() => navigate(-1)}>Volver</button>
        </div>
        }
          {totalQuantity > 0 ?
        <div className="buttonsContainer d-flex flex-wrap gap-3 justify-content-center align-items-center">
          <button className='btn btn-danger rounded-pill' onClick={() => handleClearDelete(cartId)}>Vaciar carrito</button>
          <NavLink to={`${userId}/checkout`}><button className='btn btn-primary rounded-pill'>Finalizar compra</button></NavLink>
        </div>
          : null
          }
      </div>
    </>

  );
};


export default UserCarts