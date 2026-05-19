function SearchBar({ value, onChange, onClear, resultsCount }) {
  return (
    <section className="search-bar">
      <label className="search-bar__label">Buscar jugadores</label>

      <div className="search-bar__group">
        <span className="search-bar__icon">🔍</span>

        <input
          className="search-bar__input"
          type="text"
          placeholder="Escribe un nombre de jugador..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        {value && (
          <button
            className="search-bar__clear"
            type="button"
            onClick={onClear}
          >
            X
          </button>
        )}
      </div>

      <p className="search-bar__results">
        Mostrando {resultsCount} resultados
      </p>
    </section>
  );
}

export default SearchBar;