import { Link } from "react-router-dom";
import { useState } from "react";
import useCookie, { getCookie } from 'react-use-cookie';
import apiClient from '../../../services/apiClient';

export default function ProfileSection (props) {
    const [clicked, setClicked] = useState(false);
    const [userToken, setUserToken] = useCookie('token','0');
    const [successMsg, setSuccessMsg] = useState(null);
    const [error, setError] = useState({});

    const toForm = () => {
        setClicked(true);
    }

    const toProfile = () => {
        setClicked(false);
    }
    const [info, setInfo] = useState(props.user)

    const update = async (event) => {
        event.preventDefault();

        const res = await apiClient.post( `/user`, {
            first_name: info.first_name,
            last_name: info.last_name,
            email: info.email,
            phone: info.phone,
            address_line_1:  info.address_line_1,
            address_line_2:  info.address_line_2,
            postcode:  info.postcode,
            city:  info.city,
            country: info.country
        },
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userToken}`
            }
        })
        
        if (res.data.status === 'success') {
            setSuccessMsg(<div className={"success"}>Profile is successfully updated</div>);
        } else if (res.data.data.error) {
            setError(res.data.data.error);
        } 
    }
    return (
        <>
            <main id={"profileSection"}>
                <p id={"profileSectionTitle"}>Profile</p>
                { !clicked ?
                    <section id={"infoFieldsLeft"}>
                        <div className={"infoFields"}>
                            <span>Name</span>
                            <p className={"infoText"}>{`${props.user.first_name} ${props.user.last_name}`}</p>
                        </div>

                        <div className={"infoFields"}>
                            <span>E-mail</span>
                            <p className={"infoText"}>{`${props.user.email}`}</p>
                        </div>

                        <div className={"infoFields"}>
                            <span>Phone number</span>
                            <p className={"infoText"}>{`${props.user.phone}`}</p>
                        </div>

                        <div className={"infoFields"}>
                            <span>Address</span>
                            <p className={"infoText"}>Address</p>
                        </div>

                        <button onClick={toForm}>Edit</button>
                    </section>
                :
                    <form id={"infoFieldsLeft"}>
                        { setSuccessMsg ? successMsg : '' }
                        <div className={"infoFields profileFormInput"}>
                            <label>First name</label>
                            <input 
                                name={"profileEditFirstName"} 
                                className={"infoText"} 
                                placeholder={"First name"}
                                value={info.first_name}
                                onChange={e => setInfo((prevState) => ({
                                    ...prevState,
                                    first_name: e.target.value
                                }))}
                            />
                            { error.first_name ? <span className={"error"}>{error.first_name}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Last name</label>
                            <input 
                                name={"profileEditLastName"} 
                                 className={"infoText"} 
                                 placeholder={"Last name"}
                                 value={info.last_name}
                                 onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     last_name: e.target.value
                                 }))}
                             />
                             { error.last_name ? <span className={"error"}>{error.last_name}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>E-mail</label>
                            <input 
                                name={"profileEditEmail"}
                                className={"infoText"} 
                                placeholder={"Email"}
                                value={info.email}
                                onChange={e => setInfo((prevState) => ({
                                    ...prevState,
                                    email: e.target.value
                                }))}
                            />
                            { error.email ? <span className={"error"}>{error.email}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Phone number</label>
                            <input 
                                name={"profileEditPhone"}
                                className={"infoText"} 
                                placeholder={"Phone"}
                                 value={info.phone}
                                 onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     phone: e.target.value
                                 }))}
                             />
                             { error.phone ? <span className={"error"}>{error.phone}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Address Line 1</label>
                            <input 
                                name={"profileEditAddressLine1"}
                                className={"infoText"} 
                                placeholder={"Street name. building name. house number"}
                                value={info.address_line_1}
                                onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     address_line_1: e.target.value
                                }))}
                             />
                             { error.address_line_1 ? <span className={"error"}>{error.address_line_1}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Address Line 2</label>
                            <input 
                                name={"profileEditAddressLine2"} 
                                className={"infoText"} 
                                placeholder={"Suite. accesscode. "}
                                value={info.address_line_2}
                                onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     address_line_2: e.target.value
                                }))}
                             />
                             { error.address_line_2 ? <span className={"error"}>{error.address_line_2}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Postcode</label>
                            <input 
                                name={"profileEditPostcode"} 
                                className={"infoText"} 
                                placeholder={"Postcode"}
                                value={info.postcode}
                                onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     postcode: e.target.value
                                }))}
                            />
                            { error.postcode ? <span className={"error"}>{error.postcode}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>City</label>
                            <input 
                                name={"profileEditCity"}
                                className={"infoText"} 
                                placeholder={"City"}
                                value={info.city}
                                onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     city: e.target.value
                                }))}
                             />
                             { error.city ? <span className={"error"}>{error.city}</span> : null }
                        </div>

                        <div className={"infoFields profileFormInput"}>
                            <label>Country</label>
                            <input 
                                name={"profileEditCountry"} 
                                className={"infoText"} 
                                placeholder={"Country"}
                                value={info.country}
                                onChange={e => setInfo((prevState) => ({
                                     ...prevState,
                                     country: e.target.value
                                }))}
                             />
                             { error.country ? <span className={"error"}>{error.country}</span> : null }
                        </div>

                        <button name={"profileChangesSubmit"} onClick={update}>Submit</button>
                        <button name={"profileChangesSubmit"} onClick={toProfile}>View Profile</button>
                    </form>
                }
                <section id={"infoFieldsRight"}>
                    <div className={"infoFields"}>
                        <Link className={"link"}  to={'/user/orders'}>Order history</Link>
                        <p className={"infoText"}>Little Description</p>
                    </div>
                    <div className={"infoFields"}>
                        <Link className={"link"}  to={'/user/listings'}>Listings</Link>
                        <p className={"infoText"}>Little Description</p>
                    </div>
                </section>
            </main>
        </>
    )
}