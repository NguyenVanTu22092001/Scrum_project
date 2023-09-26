import { StockSection, Navbar, Footer } from '../../components';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { ProductCard, Spinner } from '../../components/block';

const CategoryPage = () => {
    let { id } = useParams();
    const [data, setData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(true);
    const [error, setError] = useState("");

    const PATH = useRef(null);
    const pageNumber = useRef(1);

    const ITEMS_PER_PAGE = 32;

    useEffect(() => {
            apiClient.get(`product/category/${id}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    setData(res.data.data);
                    setIsProcessing(false);
                    setError(null);
                })
        }, [])

        const getProducts = async () => {
            const res = await apiClient.get(`product/category/${id}`)
            setData(res.data.data);
            setIsProcessing(false);
            setError(null);          
        }

        const handleSubmit = (e) => {
            e.preventDefault();
    
            setIsProcessing(true);
    
            let value = e.target.value;
            pageNumber.current = parseInt(value) + 1;
    
            getProducts();
        }
    return (
        <>
            <Navbar />
            <>
        { isProcessing === false ?
            <main id={"stockSection"}>
                { error === null ?
                <>
                    <section className={"paginationContainer"}>
                        { Array.from(Array(Math.ceil(data.totalLength / ITEMS_PER_PAGE))).map((page, idx) => {
                                if ((pageNumber.current - 1) === idx) {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                            className={"currentPage"}
                                        >
                                            {idx + 1}
                                        </button>
                                    )
                                } else {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                        >
                                            {idx + 1}
                                        </button>
                                    )}
                            }
                        )}
                    </section>
                    <section className={'stockContainer'}>
                        { data.products.map((product, idx) => {
                            return (
                                <ProductCard
                                    key={idx}
                                    to={`${PATH.current}/${product.id}`}
                                    src={product.image}
                                    title={product.title}
                                    price={`$${(product.price / 100).toFixed(2)}`}
                                    seller={product.user}
                                />
                            )}
                        )}
                    </section>
                    <section className={"paginationContainer"}>
                        { Array.from(Array(Math.ceil(data.totalLength / ITEMS_PER_PAGE))).map((page, idx) => {
                                if ((pageNumber.current - 1) === idx) {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                            className={"currentPage"}
                                        >
                                            {idx + 1}
                                        </button>
                                    )
                                } else {
                                    return (
                                        <button
                                            key={idx}
                                            onClick={handleSubmit}
                                            value={idx}
                                        >
                                            {idx + 1}
                                        </button>
                                    )}
                            }
                        )}
                    </section>
                </>
                : error }
            </main>
            :
            <Spinner/>
        }
        </>
            <Footer />
        </>
    )
}

export default CategoryPage;