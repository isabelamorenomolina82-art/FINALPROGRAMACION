function StatsPanel({ stats }) {
  return (
    <section className="stats-panel">
      <article className="stats-panel__card stats-panel__card--highlight">
        <p className="stats-panel__label">Jugadores en tabla</p>
        <h2 className="stats-panel__value">{stats.totalPlayers}</h2>
        <span className="stats-panel__tag">
          {stats.favoriteCount} favoritos
        </span>
      </article>

      <article className="stats-panel__card">
        <p className="stats-panel__label">Promedio de puntos</p>
        <h2 className="stats-panel__value">{stats.averagePoints}</h2>
      </article>

      <article className="stats-panel__card">
        <p className="stats-panel__label">Promedio de rebotes</p>
        <h2 className="stats-panel__value">{stats.averageRebounds}</h2>
      </article>

      <article className="stats-panel__card">
        <p className="stats-panel__label">Líderes</p>

        {stats.topScorer ? (
          <>
            <p className="stats-panel__leader">
              <strong>Anotador</strong>
              {stats.topScorer.name} - {stats.topScorer.points} pts
            </p>

            <p className="stats-panel__leader">
              <strong>Eficiencia</strong>
              {stats.topEfficiency.name} - {stats.topEfficiency.efficiency} PER
            </p>
          </>
        ) : (
          <p className="stats-panel__leader">Sin datos</p>
        )}
      </article>

      <article className="stats-panel__card stats-panel__card--wide">
        <p className="stats-panel__label">Distribución por posición</p>

        <div className="stats-panel__bars">
          {Object.entries(stats.positionDistribution).map(([position, amount]) => (
            <div className="stats-panel__bar-group" key={position}>
              <span>{position}</span>

              <div className="stats-panel__bar">
                <div
                  className="stats-panel__bar-fill"
                  style={{ width: `${Math.min(amount * 18, 100)}%` }}
                />
              </div>

              <strong>{amount}</strong>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default StatsPanel;