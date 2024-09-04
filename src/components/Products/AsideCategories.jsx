import React, { useState, useEffect } from 'react'
import config from '../../service/config'
import { NavLink } from 'react-router-dom'
import { CustomButton } from '../Generics/genericsModules'

const AsideCategories = () => {
  const [products, setProducts] = useState([])
  const fetchData = async () => {
    const response = await instance.get('http://localhost:8080/api/products/')
    return setProducts(response.data)
  }
  useEffect(() => {
    fetchData()

  }, [])

  const categories = products.map((product) => product.category);
  const arrayCat = [...new Set(categories)];

  return (
    <aside className='d-flex flex-column flex-wrap gap-2'>
      {arrayCat.map(item => (<button key={item} className='rounded-pill p-2'>{item}</button>))}
    </aside>
  )
}

export default AsideCategories