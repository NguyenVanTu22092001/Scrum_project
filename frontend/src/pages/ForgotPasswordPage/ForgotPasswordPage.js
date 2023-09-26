import { useState, useEffect } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { Spinner } from '../../components/block';

import {Navbar} from "../../components";
import {Footer} from "../../components";


const ForgotPasswordPage = () => {
    let navigate = useNavigate();

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

    const [info, setInfo] = useState({
        email: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsProcessing(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/forgot-password', 
                {
                    email: info.email
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        if(res.data.status === 'fail' && res.data.data.hasOwnProperty('error')) {
                            setError(res.data.data.error);
                            setIsProcessing(false);
                        }
                        if(res.data.status === 'success') {
                            setError({});
                            setSuccessMsg('Password reset link sent to your email');
                            setIsProcessing(false);
                        }
                    });
            });
    }

    useEffect(() => {
        if(tkn && tkn !== '0') {
            setUserToken(tkn);
            apiClient.get('check/sanctum/token', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            })
                .then((res) => {
                    navigate("/profile");
                })
                .catch((err) => {
                    if (err.response && err.response.status === 401) {
                        setTkn('0');
                        setUserToken('0');
                        setIsLoading(false);
                    }
                });
        }
        else {
            setIsLoading(false);
        }
    }, []);

    return (
        <>
            <Navbar />
            { !isLoading ?
                <main id={"resetPasswordPage"}>
                    <h1 id={"title"}>Forgot Password</h1>
                    <div id={"resetPasswordContainer"}>
                        <form id={"resetPasswordForm"} onSubmit={handleSubmit}>
                            { successMsg ? successMsg : null}
                            <label id={"resetPassword"}>Email Address <span>*</span></label>
                            <input
                                id={"resetPassword"}
                                type={"text"}
                                value={info.email}
                                onChange={e => setInfo((prevState) => ({
                                    ...prevState,
                                    email: e.target.value
                                }))}
                            />
                            {error.email ? error.email : null}
                            <button type={'submit'} id={"resetPasswordSubmit"}>
                                { isProcessing  ?  <Spinner size={30} />
                                    : <>Reset</>
                                }
                                
                            </button>
                        </form>
                    </div>
                </main>
            :
                <Spinner /> 
            }
            <Footer />
        </>
    )
}
export default ForgotPasswordPage;

