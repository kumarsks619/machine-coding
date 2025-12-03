const Pagination = ({ totalPages = 0, page = 0, setPage = () => {} }) => {
    const prev3Pages = Array.from({ length: 3 }, (_, index) => page - 1 - index)
        .filter((value) => value >= 0)
        .reverse();
    const next4Pages = Array.from(
        { length: 4 },
        (_, index) => page + index
    ).filter((value) => value < totalPages);

    const handlePageNumberClick = (pageNumber) => {
        setPage(pageNumber);
    };

    const handlePrevButtonClick = () => {
        if (page <= 0) return;
        setPage((prev) => prev - 1);
    };

    const handleNextButtonClick = () => {
        if (page >= totalPages - 1) return;
        setPage((prev) => prev + 1);
    };

    return (
        <div style={{ display: 'flex' }}>
            {page > 0 && (
                <button
                    type="button"
                    style={{ display: 'grid', placeItems: 'center' }}
                    onClick={handlePrevButtonClick}>
                    {'<'}
                </button>
            )}
            {[...prev3Pages, ...next4Pages].map((value) => (
                <button
                    key={`button-${value}`}
                    type="button"
                    style={{
                        background: page === value ? 'crimson' : 'inherit',
                    }}
                    onClick={() => handlePageNumberClick(value)}>
                    {value + 1}
                </button>
            ))}
            {page < totalPages - 1 && (
                <button
                    type="button"
                    style={{ display: 'grid', placeItems: 'center' }}
                    onClick={handleNextButtonClick}>
                    {'>'}
                </button>
            )}
        </div>
    );
};

export default Pagination;
