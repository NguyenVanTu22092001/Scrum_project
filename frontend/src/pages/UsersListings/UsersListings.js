import { useContext } from 'react';

import { Context } from '../../services/Context';

import {Navbar, Footer, StockSection} from '../../components';

export default function UsersListings () {
    const props = useContext(Context);

    return (
        <>
            <Navbar />
            <StockSection user={props.user} />
            <Footer />
        </>
    )
}
