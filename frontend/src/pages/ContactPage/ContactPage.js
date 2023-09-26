import {AddressBlock, Navbar, ContactForm} from "../../components";

export default function ContactPage () {
    return (
        <>
            <Navbar/>
            <h1 id={"titleContacts"}>
                Contact us:
            </h1>
            <AddressBlock />
            <ContactForm />
            </>
    )
}