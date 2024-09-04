import { useAuthContext } from "../../context/AuthContext"
import { useState } from "react"

const Ticket = ({ purchaser, amount, purchase_dateTime, code }) => {
    const { user } = useAuthContext()
    const first_name = user?.user?.first_name
    const last_name = user?.user?.last_name

    return (
        <>                
        <div>
            <h1 className='text-center'>Ticket Compra</h1>
            <div className='d-flex flex-wrap flex-column text-center'>
                <h3>
                    ¡Muchas gracias {first_name} {last_name} por tu compra!
                </h3>
                <p>Comprador: {purchaser}</p>
                <p>Monto Total: {amount}</p>
                <p>Fecha de compra: {purchase_dateTime}</p>
                <h4>Código Ticket: {code}</h4>
            </div>
        </div>
        </>
    )
}

export default Ticket