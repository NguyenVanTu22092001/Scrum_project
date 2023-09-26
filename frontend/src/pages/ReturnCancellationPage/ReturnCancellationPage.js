import {Footer, Navbar} from "../../components";

const ReturnCancellationPage = () => {

    return (
        <>
            <Navbar />
            <main id={"returnCancellationSection"}>
                <div className={"titleSection"}>
                    <h1>Order history</h1>
                </div>
                <section className={"totalSection"}>
                    <header>
                        <p className={"itemsColumn"}>Order number</p>
                        <p>Items</p>
                        <p>Quantity</p>
                        <p>Price</p>
                        <p>Total</p>
                        <p>   </p>
                    </header>
                    <section>
                        <article>
                            <p>SOMENUMBER</p>
                            <p>Title of product</p>
                            <p>2</p>
                            <p>35.00</p>
                            <p>70.00</p>
                            <button>Return</button>
                        </article>
                        <article>
                            <p>SOMENUMBER</p>
                            <p>Title of product</p>
                            <p>2</p>
                            <p>35.00</p>
                            <p>70.00</p>
                            <button>Return</button>
                        </article>
                    </section>
                    <footer>
                        <button className={"btn"}>Return all</button>
                    </footer>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ReturnCancellationPage;