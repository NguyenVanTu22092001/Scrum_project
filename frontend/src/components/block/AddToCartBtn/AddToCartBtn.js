import { Spinner } from '../../block';
import { useState } from 'react';
import apiClient from "../../../services/apiClient";

const AddToCartBtn = (props) => {
    const [added, setAdded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const addItemTocart = (event) => {

        event.preventDefault();
        setIsProcessing(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/cart/add', 
                {
                    id: props.id,
                   quantity: props.quantity
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        setAdded(true);
                        setIsProcessing(false)
                    });
            });
    }
    return (
        isProcessing ? 
            <Spinner size={40}/>
        : 
        <>
            <button className={"btn"} style={{width: 'max-content'}} onClick={addItemTocart}>
            { added ? 
                <>Added</>
            :
                <>Add to cart</>
            }
            </button>
        </>
    )
}

export default AddToCartBtn;
