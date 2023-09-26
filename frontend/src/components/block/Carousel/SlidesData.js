import SlideElement from "../SlideElement/SlideElement";

export const SlidesData = [
    {
        div: (
            <>
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText carouselBuySlideElement"}
                    content={"Buy"}
                    url={"/products"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText carouselSellSlideElement"}
                    content={"Sell"}
                    url={"/user/product/add"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText carouselBidSlideElement"}
                    content={"Bid"}
                    url={"*"}
                />
            </>
        )
    },
    {
        div: (
            <>
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText"}
                    content={"Misc"}
                    url={"*"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText"}
                    content={"Misc"}
                    url={"*"}
                />
                <SlideElement
                    parentClassName={"carouselSlideElement"}
                    childClassName={"carouselElementInnerText"}
                    content={"Misc"}
                    url={"*"}
                />
            </>
        )
    }
]