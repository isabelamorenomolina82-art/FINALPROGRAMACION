function SearchHistory({ history, onSelectSearch, onClearHistory }) {
  return (
    <section className="search-history">
      <div className="search-history__header">
        <h3 className="search-history__title">Historial de búsqueda</h3>

        {history.length > 0 && (
          <button
            className="search-history__clear"
            type="button"
            onClick={onClearHistory}
          >
            Limpiar
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="search-history__empty">Sin búsquedas recientes</p>
      ) : (
        <div className="search-history__list">
          {history.map((item) => (
            <button
              className="search-history__item"
              type="button"
              key={item}
              onClick={() => onSelectSearch(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default SearchHistory;