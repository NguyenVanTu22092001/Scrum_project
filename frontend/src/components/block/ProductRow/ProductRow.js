import { useRef, useState } from 'react';
import apiClient from "../../../services/apiClient";
import { Spinner } from '../../block';

const ProductRow = (props) => {
    const [isRemoving, setIsRemoving] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isSuccessMsg, setSuccessMsg] = useState(null);
    const [isErrorMsg, setErrorMsg] = useState(null);

    const price = useRef(props.price);
    const currentQty = useRef(props.quantity);

    const [total, setTotal] = useState(parseFloat(price.current) * currentQty.current);

    const updateCartAdd = (event) => {
        event.preventDefault();

        setIsAdding(true);

        apiClient.post( '/cart/update', 
        {
            quantity: 1,
            rowId: props.rowId
        },
        {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(res => {
                setIsAdding(false)
                if(res.data.status === 'success') {
                    currentQty.current = parseInt(currentQty.current) + 1;
                    setTotal(parseFloat(price.current) * currentQty.current)
                    setSuccessMsg("Product updated successfully")

                    props.handleSubTotal(parseFloat(price.current));
                }
                if(res.data.status === 'fail') {
                    setErrorMsg("Something went wrong!")
                }
            });
    }

    const updateCartMin = (event) => {
        event.preventDefault();

        setIsRemoving(true);

        apiClient.post( '/cart/update', 
        {
            quantity: -1,
            rowId: props.rowId
        },
        {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(res => {
                setIsRemoving(false)
                if(res.data.status === 'success') {
                    currentQty.current = parseInt(currentQty.current) - 1;
                    setTotal(parseFloat(price.current) * currentQty.current)
                    setSuccessMsg("Product updated successfully")

                    props.handleSubTotal(parseFloat(price.current) * -1);
                }
                if(res.data.status === 'fail') {
                    setErrorMsg("Something went wrong!")
                }
            });
    }
    return (
        <>
            <article id={"productRow"}>
            { currentQty.current > 0 ?
                <>
                    <div className={"productTitle"}>{props.title}</div>
                    <p className={"productPrice"}>{`$${parseFloat(price.current).toFixed(2)}`}</p>
                    <span className={"productQuantity"}>
                        <p>{currentQty.current}</p>
                        { !isAdding ? <button className={props.visibility} onClick={updateCartAdd}>+</button> : <Spinner size={20}/> }
                        { !isRemoving ? <button className={props.visibility} onClick={updateCartMin}>-</button>: <Spinner size={20}/> }
                    </span>
                    <p className={"productTotal"}>{`$${parseFloat(total).toFixed(2)}`}</p>
                </>
            :
                <div className={"productTitle"}>No items</div>
            }
            </article>
        </>
        
    )
}

export default ProductRow;
