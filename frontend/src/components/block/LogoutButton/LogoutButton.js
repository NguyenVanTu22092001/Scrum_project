import { useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import { useState } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';

import { Spinner } from '../';

export default function LogoutButton () {

    let navigate = useNavigate();
    const [userToken, setUserToken] = useState(getCookie('token'));
    const [userId, setUserId] = useCookie('user','');
    const [isLoading, setIsLoading] = useState(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        setIsLoading(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/logout', 
                {},
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    }
                })
                    .then(res => {
                        if(res.data.status === 'success') {
                            setUserToken('0');
                            setUserId('');
                            setIsLoading(false);
                            navigate("/login");
                        }
                    });
            });
    }

    return (
        <>
            { !isLoading ? 
                <form onSubmit={handleSubmit}>
                    <button name={"Logout"}>Logout</button>
                </form>
                :
                <Spinner size={30} /> 
            }
        </>
    )
}