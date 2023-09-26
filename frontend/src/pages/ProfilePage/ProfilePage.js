import { useContext } from 'react';

import { Context } from '../../services/Context';

import { Navbar, Footer, ProfileSection } from '../../components';

export default function ProfilePage () {
    const props = useContext(Context);

    return (
        <>
            <Navbar />
            <ProfileSection user={props.user} />
            <Footer />
        </>
    )
}
