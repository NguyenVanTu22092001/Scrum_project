import { Footer, Navbar, SingleProductSection } from "../../components";

import { Context } from '../../services/Context';
import {useContext} from "react";

export default function SingleProductPage () {
    const props = useContext(Context);

    return (

        <>
            <Navbar/>
            {props.user ? <SingleProductSection user={props.user} /> : <SingleProductSection />}
            <Footer />
        </>
    )
}