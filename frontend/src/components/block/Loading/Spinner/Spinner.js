const Spinner = (props) => {
    return (
        <div id={"spinner-container"}>
            <span 
                className={"spinner"}
                style={{
                    width: `${props.size}px`, 
                    height: `${props.size}px`
                }}
            ></span>
        </div>
    )
}

export default Spinner;
