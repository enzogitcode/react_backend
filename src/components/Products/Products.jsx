import axios from 'axios'
import { useEffect, useState } from 'react'
import { CustomButton } from '../Generics/genericsModules'
import { NavLink } from 'react-router-dom'
import { getProducts } from '../../service/config'
import { useAuthContext } from '../../context/AuthContext'

const Products = () => {
    const { user } = useAuthContext()
    const [products, setProducts] = useState([])
    const role = user?.user?.role
    const fetchData = async () => {
        const response = await getProducts()
        const data = response.data
        if (role == 'user') {
            setProducts(data)
        }
        else if (role == 'admin') {
            const finalProducts = data.filter(products => products.owner !== 'adminCoder@coder.com' && products.owner !== 'admin')
            setProducts(finalProducts)
        }
        else {
            const finalProducts = data.filter(products => products.owner !== user?.user?.email)
            setProducts(finalProducts)
        }
        console.log(products.length)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='d-flex flex-wrap px-2 py-2'>
            {/* <AsideCategories /> */}
            <div className="productsContainer d-flex flex-wrap gap-6 gap-6 bg-lightblue">
                {products.map((products) => (<div key={products._id} className='cardProduct text-center d-flex flex-column bg-white m-3 p-2 border-radius-xl text-wrap'>
                    <div>Título: {products.title}</div>
                    <div>Descripción: {products.description}</div>
                    <div>Código único:{products.code}</div>
                    <div>Precio: $ {products.price}</div>
                    <div>Stock: {products.stock}</div>
                    <NavLink to={`/api/products/${products._id}`}><CustomButton title={"Ver detalles"} /></NavLink>
                </div>))}
            </div>
        </div>
    )
}

export default Products