import { useState, createContext } from 'react'
import { getCartById, clearCart, purchase, updateCart, updateQuantity, addToCart, getProductById } from '../service/config'
import ItemCount from '../components/Products/ItemCount'
import { useAuthContext } from './AuthContext'


export const cartContext = createContext({
  cart: [],
  totalContext: 0,
  totalQuantityContext: 0
})


export const CartProvider = ({ children }) => {
  const { user } = useAuthContext()
  const cartId = user?.user?.carts
  const [cart, setCart] = useState([])
  const [totalContext, setTotalContext] = useState(0)
  const [totalQuantityContext, setTotalQuantityContext] = useState(0)

  console.log(cart)
  console.log("monto total: ", totalContext)
  console.log("cantidad de items", totalQuantityContext)

  const updateCartContext = async (cartId) => {
    if (cartId !== undefined) {
      const res = await getCartById(cartId)
      const resProd = res.data.products
      console.log(resProd)
      setCart(resProd)
      const dataTotal = resProd.map(item => (parseInt(item.product.price) * (item.quantity))).reduce((acc, item) => item + acc, 0)
      console.log(dataTotal)
      setTotalContext(dataTotal)
      const totalQuantity = resProd.map((item) => item.quantity).reduce((acc, item) => acc + item, 0)
      console.log(totalQuantity)
      setTotalQuantityContext(totalQuantity)
    }
  }

  return (<cartContext.Provider value={{
    cart,
    totalContext,
    totalQuantityContext,
    updateCartContext

  }}
  >{children}
  </cartContext.Provider>)
}
