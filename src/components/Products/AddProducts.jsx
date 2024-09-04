import axios from 'axios';
import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { addProduct, uploadDocs } from '../../service/config';
import { CustomButton } from '../Generics/genericsModules';
import CardProduct from './CardProduct';
import './products.css'


const AddProducts = () => {

  const { user } = useAuthContext()
  const owner = user?.user?.email
  const userId = user?.user?._id
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [img, setImg] = useState("")
  const [showProduct, setShowProduct] = useState(false);
  const newProduct = { title, category, price, stock, description, owner, img }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      addProduct({ ...newProduct })
        .then(response => { console.log(response) })
      setShowProduct(true)
      alert('Nuevo producto creado')
      //cardproduct debe ir después sino toma los inputs vacíos

    } catch (error) {
      console.log(error)
    }
  }
  const clearForm = () => {
    setTitle("")
    setPrice("")
    setDescription("")
    setStock("")
    setCategory("")
    setImg("")
  }

  return (
    <div id='addProductsContainer w-100' className='row align-items-center'>
      <h1 className='text-center'>Formulario para agregar un producto nuevo</h1>
      <div className="addProductsFormContainer px-4 py-4 justify-content-center col border-end-2">
        <form className='d-flex flex-column flex-wrap gap-3 text-center' encType='multipart/form-data' onSubmit={handleSubmit}>

          <label htmlFor='title'>Title</label>
          <input name='title' value={title}
            onChange={(e) => setTitle(e.target.value)} required />

          <label htmlFor='description' className=''>Description</label>
          <input name='description' value={description}
            onChange={(e) => setDescription(e.target.value)} required />

          <label htmlFor='Price' className=''>Price</label>
          <input type='number' name='Price' value={price}
            onChange={(e) => setPrice(e.target.value)} required={true} />

          <label htmlFor='Stock' className=''>Stock</label>
          <input type='number' name='Stock' value={stock}
            onChange={(e) => setStock(e.target.value)} required />

          <label htmlFor='category' className=''>Category</label>
          <input type='text' name='category' value={category}
            onChange={(e) => setCategory(e.target.value)} />

          <label htmlFor='img' className=''>Imágenes</label>
          <input type='file' name='img' value={img}
            onChange={(e) => setImg(e.target.value)} />
          <div className='d-flex justify-content-center text-center gap-4 p-3'>
            <CustomButton title={'Limpiar formulario'} onClick={clearForm}>Limpiar formulario</CustomButton>
            <CustomButton btnType={'submit'} onClick={CardProduct} title={'Enviar'}>Submit</CustomButton>
          </div>
        </form>
      </div>
      <div className='col'>
        {showProduct == true ? <CardProduct newProduct={newProduct} /> : <div className='text-center'><h2>Aquí se verá el producto creado</h2></div>}
      </div>

    </div>
  )
}


export default AddProducts