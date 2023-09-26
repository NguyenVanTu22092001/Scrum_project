// <Pagination dataLength={} items_per_page={} handleSubmit={} currentPage={} />

const Pagination = (props) => {    
    return (
        <section className={"paginationContainer"}>
            { Array.from(Array(Math.ceil(props.dataLength / props.items_per_page))).map((page, idx) => {
                return (
                    <button
                        key={idx}
                        value={idx}
                        onClick={props.handleSubmit}
                        className={(props.currentPage - 1) !== idx ? "" : "currentPage"}
                    >
                        {idx + 1}
                    </button>
                )}
            )}
        </section>
    )
}

export default Pagination;