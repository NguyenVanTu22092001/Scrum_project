import { useState, useEffect } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import useCookie, { getCookie } from 'react-use-cookie';

import apiClient from "./apiClient";
import { Context } from './Context';

import { Navbar, Footer, Spinner } from '../components';

const PrivateRoutes = () => {
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    const [user, setUser] = useState([]);
    
    const [auth, setAuth] = useState(false);
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        if(tkn && tkn !== '0') {
            setUserToken(tkn);
            apiClient.get('user', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            })
                .then((res) => {
                    setUser(res.data.data.user);
                    setAuth(true);
                    setIsProcessing(false);
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setAuth(false);
                        setTkn('0');
                        setUserToken('0');
                        setIsProcessing(false);
                    }
                });
        } else {
            setAuth(false);
            setTkn('0');
            setUserToken('0');
            setIsProcessing(false);
        }
    }, [])

    return (
        <>
            { auth ? 
                <Context.Provider value={{ user: user }}>
                    <Outlet />
                </Context.Provider>
            : 
                <>
                    { isProcessing ? 
                        <>
                            <Navbar />
                            <Spinner />
                            <Footer />
                        </>
                    :
                        <Navigate to="/login" />
                    }
                </>
            }
        </>
    )
}

export default PrivateRoutes;