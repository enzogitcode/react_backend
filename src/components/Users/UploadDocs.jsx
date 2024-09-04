import React, { useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../../service/config'
import {useAuthContext} from '../../context/AuthContext'
const UploadDocs = () => {
  const {user} = useAuthContext()
  
  const handleSubmit = async () => {
    
    await axios.post(`${apiURL}/users/${user._id}/documents`, )
    
  }
  
  return (
    <div className='text-center px-3'>
      <form className='text-center d-flex flex-column justify-content-center' encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="profilePhoto">Foto de Perfil</label>
        <input type="file" name='profile'/>

        <label htmlFor="profilePhoto">Identificación</label>
        <input type="file" name='documents'/>

        <label htmlFor="profilePhoto">Comprobante de Documento</label>
        <input type="file" name='documents' />

        <label htmlFor="profilePhoto">Comprobante de Estado de cuenta</label>
        <input type="file" name='documents' />

        <label htmlFor="profilePhoto">Imágenes de mis productos</label>
        <input type="file" name='products' />

        <button type='submit'>Enviar</button>
      </form>
    </div>
  )
}

export default UploadDocs