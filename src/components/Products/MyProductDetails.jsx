import React from 'react'
import { useState, useEffect } from 'react'
import { deleteProducts, getProductById } from '../../service/config'
import {  useNavigate, useParams } from 'react-router-dom'
import {CustomBtnDangerDelete} from '../Generics/genericsModules'

const MyProductDetails = () => {
    const { pid } = useParams()
    const navigate = useNavigate()

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

    const fetchData = async () => {
        const response = await getProductById(pid)
        const { title, code, img, category, description, owner, stock, price } = response.data
        setTitle(title)
        setPrice(price)
        setCategory(category)
        setDescription(description)
        setOwner(owner)
        setStock(stock)
        setImg(img)
        setCode(code)

        setProduct(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleDeleteProduct = async (pid) => {
        await deleteProducts(pid)
        alert(`producto eliminado: ${title}, código ${code}`)
        navigate('/myProducts')
    }

    return (
        <div>
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
                    <CustomBtnDangerDelete onClick={() => handleDeleteProduct(pid)} title={'eliminar producto'}/>
                    <button>Editar Producto</button>
                </div>
            </div>
        </div>
    )
}

export default MyProductDetails