import { useState } from "react";
import { ButtonLeftSVG, ButtonRightSVG } from "../SVGs";
import {SlidesData} from "./SlidesData";


export default function Carousel () {

    const slides = SlidesData;

    const [current, setCurrent] = useState(0)
    const length = slides.length

    const nextSlide = () => {
        setCurrent((current === length - 1 ? 0 : current + 1))
    }
    const prevSlide = () => {
        setCurrent((current === 0 ? length - 1 : current - 1))
    }

    if(!Array.isArray(slides) || slides.length <= 0) {
        return null
    }

    return (

        <div id={"carousel"}>
            <button onClick={prevSlide} className={"carouselButton carouselButtonLeft"}>
                <div className={"carouselButtonSvg"}>
                    <ButtonLeftSVG fill={"url(#buttonLeftFillGradient)"}/>
                </div>
            </button>
            <div id={"carouselTrackContainer"}>
                <ul className={"carouselTrack"}>
                    {slides.map((slide, index) => {
                        return (
                            <li className={index === current? "slideActive carouselSlide" : "slide carouselSlide"} key={index}>
                                {index === current && (slide.div)}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <button onClick={nextSlide} className={"carouselButton carouselButtonRight"}>
                <div className={"carouselButtonSvg"}>
                    <ButtonRightSVG fill={"url(#buttonRightFillGradient)"}/>
                </div>
            </button>
        </div>

    )
}