import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer id={"footer"}>
            <div id={"footerAbove"}>
                <Link to={"/contacts"}>Contact</Link>
            </div>
            <div id={"footerBelow"}>
                <p>Copyright © 2021 All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;
