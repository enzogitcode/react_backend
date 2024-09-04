import React, { useState } from 'react'
import './products.css'
import { CustomButton } from '../Generics/genericsModules'

const ItemCount = ({ stock, initialCounter, addQuantity }) => {
  const [counter, setCounter] = useState(1)
  const increase = () => {
    if (counter < stock) { setCounter(counter + 1) }
  }
  const decrease = () => {
    if (counter > initialCounter) { setCounter(counter - 1) }
  }
  const resetCounter = () => {
    setCounter(1)
  }

  return (
    <>
      <div className='itemCountContainer d-flex flex-inline text-center'>
        <button onClick={decrease} className='rounded-start-pill px-3 focus-ring'>-</button>
        <p className='m-3 p-1'>{counter}</p>
        <button onClick={increase} className='rounded-end-pill px-3 focus-ring'>+</button>
      </div>
      <div className='itemCountButtons d-flex gap-2 flex-wrap text-center align-items-center justify-content-center py-2'>
        <CustomButton title={"Reset"} onClick={resetCounter} />
        <button className='btn btn-primary' onClick={() => addQuantity(counter)}>Agregar al carrito</button>
      </div>
    </>
  )
}

export default ItemCount