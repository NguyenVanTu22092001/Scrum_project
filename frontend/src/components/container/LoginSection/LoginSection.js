import { useState, useEffect } from 'react';
import useCookie, { getCookie } from 'react-use-cookie';
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from '../../block';

import apiClient from "../../../services/apiClient";

const LoginSection = () => {
    let navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState(null);

    const [tkn, setTkn] = useState(getCookie('token'));
    const [userToken, setUserToken] = useCookie('token','0');

    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault();

        setIsProcessing(true);

        apiClient.get("http://localhost:8000/sanctum/csrf-cookie")
            .then(res => {
                apiClient.post( '/login', 
                {
                    email: info.email,
                    password: info.password
                },
                {
                    headers: {
                        Accept: 'application/json'
                    }
                })
                    .then(res => {
                        setIsProcessing(false)
                        if(res.data.status === 'fail' && res.data.message !== null) {
                            setErrorMsg("Your login credentials do no match")
                        }
                        if(res.data.data.error) {
                            setError(res.data.data.error);
                        }
                        if(res.data.data.token) {
                            setUserToken(res.data.data.token);
                            navigate("/products");
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
                    navigate("/products");
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
        { !isLoading ?
            <div id={"loginPage"}>
                <div id={"loginContainer"}>
                    <p id={"loginLogo"}>G-bay</p>
                    <p id={"loginLogoCropped"}>G-bay</p>
                    { errorMsg ? <span className={"error"}>{errorMsg}</span> : null }
                    <form id={"loginForm"} onSubmit={handleSubmit}>
                        <input
                            id={"loginEmail"}
                            type={"text"}
                            placeholder={"E-mail address"}

                            value={info.email}
                            onChange={e => setInfo((prevState) => ({
                                ...prevState,
                                email: e.target.value
                            }))}
                        />
                        { error.email ? <span className={"error"}>{error.email}</span> : null }
                        <input
                            id={"loginPassword"}
                            type={"password"}
                            placeholder={"Password"}

                            value={info.password}
                            onChange={e => setInfo((prevState) => ({
                                ...prevState,
                                password: e.target.value
                            }))}
                        />
                        { error.password ? <span className={"error"}>{error.password}</span> : null }
                        <div id={"loginFormButtonContainer"}>
                            { !isProcessing ? <button type={'submit'} id={"loginSubmit"}>Submit</button> : <Spinner size={40}/> }
                        </div>
                    </form>
                    <div id={"loginLinks"}>
                        <Link id={"signUp"} to={'/sign-up'}>Sign up</Link>
                        <Link id={"passwordForgot"} to={'/forgot-password'}>Forgot password?</Link>
                    </div>
                </div>
            </div>
            :
            <Spinner /> 
        }
    </>
    )
}

export default LoginSection;