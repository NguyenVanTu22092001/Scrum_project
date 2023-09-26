import { Carousel } from '../../block';

const LandingSection = () => {
    return (
        <>
            <main id={"landingSection"}>
                <div id={"landingSectionLogoContainer"}>
                    <p className={"mainLogo"}>G-Bay</p>
                </div>
                <Carousel/>
            </main>
        </>
    )
}

export default LandingSection;