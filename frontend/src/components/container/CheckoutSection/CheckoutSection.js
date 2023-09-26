import {useState, useEffect} from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../../services/apiClient";

import { Spinner } from '../../block';

export default function CheckoutSection() {

    let navigate = useNavigate();

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [user, setUser] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'phone': '',
        'address_line_1': '',
        'address_line_2': '',
        'city': '',
        'postcode': '',
        'country': ''
    });
    const [successMsg, setSuccessMsg] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        cartCheck();
    }, []);

    const cartCheck = () => {
        apiClient.get("cart")
            .then(res => {
                setIsLoading(false);

                if(res.data.data.cart.quantity < 1) {
                    navigate("/products"); 
                }
             });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsProcessing(true);
        apiClient.post( '/order', {
            full_name: `${user.last_name} ${user.first_name}`,
            email: `${user.email}`,
            phone: `${user.phone}`,
            address_line_1: `${user.address_line_1}`,
            address_line_2: `${user.address_line_2}`,
            postcode: `${user.postcode}`,
            city: `${user.city}`,
            country: `${user.country}`
        },
        {
            headers: {
                Accept: 'application/json'
            }
        })
        .then(resp => {
            setIsProcessing(false);

            if(resp.data.status === 'success') {
                setIsRedirecting(true);
                setTimeout(
                    function(){
                        navigate("/"); 
                    },
                5000);
            } 

            if(resp.data.status === 'fail') {
                setError(resp.data.data.error);
            }
        });
    }

    return (
        <>
        { isRedirecting ? 
            <>
            Order submitted successfully.You are being redirected to home page. Have some patience
            </> : null
        }
        { isLoading || isRedirecting ? 
            <>
            <Spinner />
            </> : null
        }
        { !isRedirecting && !isLoading ? 
        <>
            <main id={"checkoutSection"}>
            <p id={"checkoutTitle"}>Checkout</p>
            <form id={"checkoutForm"} onSubmit={handleSubmit}>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        First name *
                    </label>
                    <input 
                        name={"firstName"} 
                        type={"text"} 
                        placeholder={"First name"}
                        value={`${user.first_name}`}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            first_name: e.target.value
                        }))}
                    />
                    {error.first_name ? <div className={"error"}>{error.first_name}</div> : null}
                </div>

                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Last name *
                    </label>
                    <input 
                        name={"lastName"} 
                        type={"text"} 
                        placeholder={"Last name"}
                        value={`${user.last_name}`}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            last_name: e.target.value
                        }))}
                    />
                    {error.last_name ? <div className={"error"}>{error.last_name}</div> : null}
                </div>

                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Email *
                    </label>
                    <input 
                        name={"email"} 
                        type={"text"}
                        placeholder={"email address"}
                        value={user.email}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            email: e.target.value
                        }))}
                    />
                    {error.email ? <div className={"error"}>{error.email}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Phone *
                    </label>
                    <input 
                        name={"phoneNumber"} 
                        type={"text"}
                        placeholder={"phone number"}
                        value={user.phone}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            phone: e.target.value
                        }))}
                    />
                    {error.phone ? <div className={"error"}>{error.phone}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Address line 1 *
                    </label>
                    <input 
                        name={"addressLine1"} 
                        type={"text"}
                        placeholder={"Street, house"}
                        value={user.address_line_1}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            address_line_1: e.target.value
                        }))}
                    />
                    {error.address_country ? <div className={"error"}>{error.address_line_1}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Address line 2 *
                    </label>
                    <input 
                        name={"addressLine2"} 
                        type={"text"}
                        placeholder={"App. suite."}
                        value={user.address_line_2}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            address_line_2: e.target.value
                        }))}
                    />
                    {error.address_line_2 ? <div className={"error"}>{error.address_line_2}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Postcode *
                    </label>
                    <input 
                            name={"postcode"} 
                            type={"text"}
                            placeholder={"postcode"}
                            value={user.postcode}
                            onChange={e => setUser((prevState) => ({
                                ...prevState,
                                postcode: e.target.value
                            }))}
                        />
                        {error.postcode ? <div className={"error"}>{error.postcode}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        City *
                    </label>
                    <input 
                        name={"city"} 
                        type={"text"}
                        placeholder={"city"}
                        value={user.city}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            city: e.target.value
                        }))}
                    />
                    {error.city ? <div className={"error"}>{error.city}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Country *
                    </label>
                    <input 
                        name={"country"} 
                        type={"text"}
                        placeholder={"Country"}
                        value={user.country}
                        onChange={e => setUser((prevState) => ({
                            ...prevState,
                            country: e.target.value
                        }))}
                    />
                    {error.country ? <div className={"error"}>{error.country}</div> : null}
                </div>
                <div className={"checkoutInput"}>
                    <label className={"checkoutFormUnit"}>
                        Payment method *
                    </label>
                    <span id={"checkoutRadio"}>
                            <input name={"paymentMethod"} type={"radio"} value={"Cash on delivery"}/> Cash on delivery
                    </span>
                </div>
                <div className={"checkoutFormRow"}>
                { isProcessing ? <Spinner size={30}/>: <button className={"btn"}>Confirm</button> }
                </div>
            </form>
        </main>
        </> 
    : 
        null
    }
        </>
    )
}