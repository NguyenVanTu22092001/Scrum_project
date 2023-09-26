import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ProductRow, Spinner } from '../../block';

import apiClient from "../../../services/apiClient";

const CartSection = () => {
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState('00.00');
    const [totalQuantity, setTotalQuantity] = useState('0');

    const [isProcessing, setIsProcessing] = useState(true);

    const handleSubTotal = (param) => {
        setSubTotal(parseFloat(subTotal) + param);
    }
    
    useEffect(() => {
        setIsProcessing(true);

        apiClient.get("cart")
            .then(res => {
                setIsProcessing(false);
                setCart(res.data.data.cart.cartItems);
                setSubTotal(res.data.data.cart.subTotal);
                setTotalQuantity(res.data.data.cart.quantity);
             });
    }, [])
    
    return (
        <>
            <main id={"cartSection"}>
                <div className={"titleSection"}>
                    <h1>Cart</h1>
                </div>
                <section className={"totalSection"}>
                    <header>
                        <p className={"itemsColumn"}>Items</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                    </header>
                    <section>
                        { isProcessing ? 
                            <Spinner size={40} />
                        :
                            totalQuantity > 0 ?
                                Object.keys(cart).map((key) => {
                                    return (
                                        <ProductRow
                                            key={key}
                                            title={cart[key].name}
                                            price={cart[key].price}
                                            quantity={`${cart[key].qty}`}
                                            rowId={cart[key].rowId}
                                            handleSubTotal={handleSubTotal}
                                        />
                                    )
                                })
                            :
                                <ProductRow
                                    title={"No items in cart"}
                                    price={null}
                                    quantity={null}
                                    total={null}
                                    visibility={"invisible"}
                                />
                        }
                    </section>
    
                    <footer>
                        <p id={"bgText"}>G-bay</p>
                        <div>
                            <p>Subtotal</p>
                            <p>{ totalQuantity > 0 ? `$${parseFloat(subTotal).toFixed(2)}`: '$00.00' }</p>
                            <Link id={"productsLink"} to={"/checkout"}><button>Proceed</button></Link>
                        </div>
                    </footer>
                </section>
            </main>
        </>
    )
}

export default CartSection;