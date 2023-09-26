import {Link} from "react-router-dom";

export default function SlideElement(props) {
    return (
        <div className={props.parentClassName}>
            <div className={props.childClassName}>
            <Link className={`slideElementLink ${props.childClassName}`} to={props.url}>

                {props.content}
            </Link>
            </div>
        </div>
    )
}