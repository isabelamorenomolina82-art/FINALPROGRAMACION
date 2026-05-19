function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <section className="pagination">
      <div className="pagination__info">
        Mostrando {startItem}-{endItem} de {totalItems} registros
      </div>

      <div className="pagination__size">
        <label htmlFor="itemsPerPage">Mostrar</label>

        <select
          id="itemsPerPage"
          value={itemsPerPage}
          onChange={(event) => onItemsPerPageChange(Number(event.target.value))}
        >
          <option value={5}>5 por página</option>
          <option value={10}>10 por página</option>
          <option value={20}>20 por página</option>
        </select>
      </div>

      <div className="pagination__buttons">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          Primera
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>

        {pages.map((page) => (
          <button
            className={page === currentPage ? 'pagination__button--active' : ''}
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Siguiente
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Última
        </button>
      </div>
    </section>
  );
}

export default Pagination;