import { useContext } from 'react';

import { Context } from '../../services/Context';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { ListingSection, Navbar, Footer } from "../../components";
import { Spinner } from '../../components/block';
import apiClient from '../../services/apiClient';

export default function EditListingPage () {
    const props = useContext(Context);

    let { id } = useParams();
    let navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();

        getProduct();

        return () => {
            abortController.abort();
        }
    }, []);

    const getProduct = () => {
        apiClient.get(`product/${id}`, {
            headers: {
                Accept: 'application/json'
            }
        })
        .then((resp) => {
            if(resp.data.data.product) {
                if(props.user.id !== resp.data.data.product.users_id) {
                    navigate("/profile");
                }
                else{
                    setProduct(resp.data.data.product);
                    setIsLoading(false);
                }
            }
            else {
                navigate("/products");
            }
            
        });
    }

    return (
        <>
            <Navbar/>
            { !isLoading ? 
                <ListingSection type={"update"} user={props.user} product={product}/>
            : 
                <Spinner /> 
            }
            <Footer/>
        </>
    )
}