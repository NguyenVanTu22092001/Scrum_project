import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import { gsap } from "gsap";
import {useNavigate} from "react-router-dom";

import { UserIconSVG } from "../SVGs";
import { LogoutButton } from "../";

export default function Navbar () {
    const navigate = useNavigate();
    const userToken = getCookie('token');
    const navSearch = useRef(null);

    const [clicked, setClicked] = useState(false);

    const navDropdownButton = useRef(null);
    const userIconSvg = useRef(null);
    const navDropdownContent = useRef(null);
    const navDropdownContentAnimation = useRef(null);
    const userIconSvgAnimation = useRef(null);
    const navDropdownButtonAnimation = useRef(null);

    useEffect(() => {
        navDropdownContentAnimation.current = gsap.to(
            navDropdownContent.current, 
            {
                display: "grid", 
                gap: "1rem",
                opacity: 1, 
                duration: 0.2, 
                paused: true
            });
        navDropdownButtonAnimation.current = gsap.to(
            navDropdownButton.current, 
            {
                scale: 2, 
                rotateY: 180, 
                duration: 0.5, 
                paused: true
            });
        userIconSvgAnimation.current = gsap.to(
            userIconSvg.current, 
            {
                fill: "url(#userIconFillGradient)", 
                duration: 0.5, 
                paused: true
            });
    }, [])

    const expand = () => {
        setClicked(true);
        navDropdownContentAnimation.current.play();
        navDropdownButtonAnimation.current.play();
        userIconSvgAnimation.current.play();
    }

    const retract = () => {
        setClicked(false);
        navDropdownContentAnimation.current.reverse();
        navDropdownButtonAnimation.current.reverse();
        userIconSvgAnimation.current.reverse();
    }

    const search = (e) => {
        if (e.key === 'Enter') {
            navigate(`/search/${navSearch.current.value}`);
        }
    }

    const handle = (e) => {
        e.preventDefault();
    }

    return (
        <nav id={"navbar"}>
            <div id={"navLeft"}>
                <Link id={"navHome"} to={"/"}>G-Bay</Link>
            </div>
            <div id={"navRight"}>
                <form className={"navRight"} id={"navSearch"}>
                    <input
                        ref={navSearch}
                        id={"navSearchInput"} 
                        type={"text"} 
                        placeholder={"Search..."} 
                        name={"navSearch"}
                        onKeyDown={search}
                        onSubmit={handle}
                    />
                </form>

                <Link id={"productsLink"} to={"/products"}>Products</Link>
                
                <div id={"navDropdown"} className={"navRight"}>
                    <button 
                        id={"navDropdownButton"} 
                        ref={navDropdownButton} 
                        onClick={!clicked ? expand : retract}
                    >
                        <UserIconSVG fill={"#474044"} ref={userIconSvg}/>
                    </button>
                    <div id={"navDropdownContent"} ref={navDropdownContent}>
                        { userToken && userToken !== "0" ? (
                            <>
                                <Link className={"navRight"} to={"/cart"}>Cart</Link>
                                <Link className={"navRight"} to={"/user/profile"}>Profile</Link>
                                <Link className={"navRight"} to={"/user/product/add"}>Sell</Link>
                                <LogoutButton className={"navRight"}/>
                            </>) : (
                            <>
                                <Link className={"navRight"} to={"/cart"}>Cart</Link>
                                <Link className={"navRight"} to={"/login"}>Login</Link>
                                <Link className={"navRight"} to={"/sign-up"}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
