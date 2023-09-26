import { useState, useEffect } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { Spinner } from '../../components/block';

import {Navbar} from "../../components";
import {Footer} from "../../components";


const ResetPasswordPage = () => {
    let navigate = useNavigate();
    let { token } = useParams();
    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');
    
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);

    const [info, setInfo] = useState({
        email: '',
        password: '',
        confirm_password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsProcessing(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( `/reset-password`, 
                {
                    token: token,
                    email: info.email,
                    password: info.password,
                    password_confirmation: info.confirm_password
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
                            setSuccessMsg('Password updates successfully. You can login with new password');
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
    }, [navigate, setUserToken, tkn, userToken]);

    return (
        <>
            <Navbar />
            { !isLoading ?
                <main id={"resetPasswordPage"}>
                    <h1 id={"title"}>Password reset</h1>
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

                            <label id={"resetPassword"}>New password <span>*</span></label>
                            <input
                                id={"resetPassword"}
                                type={"password"}
                                value={info.password}
                                onChange={e => setInfo((prevState) => ({
                                    ...prevState,
                                    password: e.target.value
                                }))}
                            />
                            {error.password ? error.password : null}
                            <label id={"repeatPassword"}>Confirm password <span>*</span></label>
                            <input
                                id={"repeatPassword"}
                                type={"password"}
                                value={info.confirm_password}
                                onChange={e => setInfo((prevState) => ({
                                    ...prevState,
                                    confirm_password: e.target.value
                                }))}
                            />
                            <button type={'submit'} id={"resetPasswordSubmit"}>
                                { isProcessing  ?  <Spinner size={20} />
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
export default ResetPasswordPage;

