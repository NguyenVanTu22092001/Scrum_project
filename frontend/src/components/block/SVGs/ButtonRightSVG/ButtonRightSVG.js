import React from "react";

const ButtonRightSVG = React.forwardRef((props, ref) => {
    return (

        <svg id={"buttonRightSvg"} height={"24"} width={"24"} xmlns={"http://www.w3.org/2000/svg"} fillRule={"evenodd"} clipRule={"evenodd"}>
            <defs>
                <linearGradient id={"buttonRightFillGradient"} gradientTransform={"rotate(45)"}>
                    <stop offset="25%" stopColor={"#006d77"} />
                    <stop offset="50%" stopColor={"#df2935"} />
                    <stop offset="75%" stopColor={"#ead637"} />
                </linearGradient>
            </defs>
            <path ref={ref} fill={props.fill} d={"M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm0 1c6.071 0 11 4.929 11 11s-4.929 11-11 11-11-4.929-11-11 4.929-11 11-11zm-3 5.753l6.44 5.247-6.44 5.263.678.737 7.322-6-7.335-6-.665.753z"}/>
        </svg>
    )
})



export default ButtonRightSVG;