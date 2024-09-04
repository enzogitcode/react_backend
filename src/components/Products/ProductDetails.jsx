import { useState, useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useParams } from "react-router-dom";
import ItemCount from './ItemCount';
import { getProductById, addToCart } from '../../service/config';
import { useContext } from 'react';
import { cartContext } from '../../context/CartContext';
import { deleteProducts } from '../../service/config';
import { CustomBtnDangerDelete } from '../Generics/genericsModules';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()

  const cartId = user?.user.carts
  const role = user?.user.role
  const { updateCartContext } = useContext(cartContext)
  const [product, setProduct] = useState(null)
  const [title, setTitle] = useState(null)
  const [owner, setOwner] = useState("")
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [code, setCode] = useState('')
  const [img, setImg] = useState([])
  const [quantity, setQuantity] = useState(0)
  const { pid } = useParams();

  const fetchData = async () => {
    const response = await getProductById(pid)
    const data = response.data
    const { title, code, img, category, description, owner, stock, price } = response.data
    setTitle(title)
    setPrice(price)
    setCategory(category)
    setDescription(description)
    setOwner(owner)
    setStock(stock)
    setImg(img)
    setCode(code)
    setProduct(data)
  }
  useEffect(() => {
    fetchData()
    updateCartContext(cartId)
  }, [])


  const handleQuantity = (quantity) => {
    setQuantity(quantity)
    const product = { pid, title, price }
    const cartId = user?.user.carts
    addToCart(cartId, pid, product, quantity)
    alert(`Producto agregado al carrito: ${pid}, ${title}, ${price}; cantidad: ${quantity}`)
    fetchData()
    updateCartContext(cartId)
  }
  const handleDeleteProduct = async (pid) => {
    await deleteProducts(pid)
    alert(`producto eliminado: ${title}, código ${code}`)
    navigate('/')
  }

  return (
    <div className='text-center'>
      <h3 className='pt-3 pb-2'>{title}</h3>

      <div className="card align-items-center mx-5 rounded-bottom">
        <img src={img} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">Descripción: {description}</p>
          <p className="card-text">Precio: $ {price}</p>
          <p className="card-text">Stock: {stock}</p>
          <p className="card-text">Categoría: {category}</p>
          <p className="card-text">Código Único: {code}</p>
          <p className="card-text">Propietario: {owner}</p>
        </div>
        {role !== 'admin' ?
          <ItemCount stock={stock} initialCounter={1} addQuantity={handleQuantity} />
          :
          null}
      </div>

    </div>
  )
}

export default ProductDetails