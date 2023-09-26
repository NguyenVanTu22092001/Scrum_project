import { useContext } from 'react';

import { Context } from '../../services/Context';

import { ListingSection, Navbar, Footer } from '../../components';

export default function AddListingPage () {
    const props = useContext(Context);

    return (
        <>
            <Navbar/>
            <ListingSection type={"create"} user={props.user}/>
            <Footer/>
        </>
    )
};