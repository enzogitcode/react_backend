import React from 'react'

const CardProduct = ({ newProduct }) => {
    return (
        <div>
            <div className='text-center'>
                <h3>Producto creado con éxito: </h3>
                <div>Título: {newProduct?.title}</div>
                <img src={newProduct?.img} title={newProduct?.title}/>
                <div>Descripción: {newProduct?.description}</div>
                <div>Código único:{newProduct?.code}</div>
                <div>Precio: $ {newProduct?.price}</div>
                <div>Stock: {newProduct?.stock}</div>
                <div>Imágenes: {newProduct?.img}</div>
            </div>
        </div>
    )
}

export default CardProduct