const ContactForm = () => {
    return (
        <container>
            <form id={"contactForm"} action={" "}>

                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="Your name"
                />

                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                />

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your email"
                />

                    <label htmlFor="subject">Subject</label>
                    <textarea id="subject"
                              name="subject"
                              placeholder="Write to us"
                    />
                    <button id={"contactFormSubmitBtn"}>Submit</button>
            </form>
        </container>
    )
}

export default ContactForm;