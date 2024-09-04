import Ticket from './Ticket';
import { purchase } from '../../service/config';
import { useContext } from 'react';
import { useState } from 'react';
import { cartContext } from '../../context/CartContext'
import { useAuthContext } from '../../context/AuthContext';

const Checkout = () => {
    const { user } = useAuthContext()
    const cartId = user?.user?.carts
    const [ticket, setTicket] = useState(null)
    const [showTicket, setShowTicket] = useState(false);
    const [showCheckout, setShowCheckout] = useState(true);
    const { totalContext, totalQuantityContext, updateCartContext } = useContext(cartContext)

    const handlePurchase = async () => {
        const response = await purchase(cartId)
        console.log(response.data.newTicket)
        console.log(response.data)
        console.log(response.data.purchaser)
        console.log(response.data.amount)
        console.log(response.data.purchase_dateTime)
        console.log(response.data.purchase_dateTime)
        setTicket(response.data)
        setShowTicket(true)
        updateCartContext(cartId)
    };

    return (
        <>
            {
                totalContext > 0 ?
                    <div>
                        <h1 className='text-center'>Finalizar Compra</h1>
                        <div className="totalContainer text-center mt-3">
                            <h5>Cantidad total de productos: {totalQuantityContext}</h5>
                            <h5>Total: $ {totalContext}</h5>
                        </div>
                        <div className='text-center d-flex flex-wrap gap-3 justify-content-center m-3'>
                            <button className='btn btn-primary' onClick={handlePurchase}>Finalizar compra</button>
                        </div>
                    </div>
                    :
                    null
            }
            {showTicket && <Ticket purchaser={ticket.purchaser} amount={ticket.amount} purchase_dateTime={ticket.purchase_dateTime} code={ticket.code} />}
        </>
    );
};

export default Checkout