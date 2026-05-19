import PlayerRow from '../PlayerRow/PlayerRow.jsx';

function PlayerTable({
  players,
  onRowClick,
  onSort,
  sortConfig,
  rowColorMode,
  favorites,
  onToggleFavorite
}) {
  const columns = [
    { key: 'number', label: '#' },
    { key: 'name', label: 'Jugador' },
    { key: 'team', label: 'Equipo' },
    { key: 'position', label: 'Posición' },
    { key: 'age', label: 'Edad' },
    { key: 'points', label: 'PTS' },
    { key: 'rebounds', label: 'REB' },
    { key: 'assists', label: 'AST' },
    { key: 'efficiency', label: 'Eficiencia' }
  ];

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) {
      return '';
    }

    if (sortConfig.direction === 'asc') {
      return ' ↑';
    }

    if (sortConfig.direction === 'desc') {
      return ' ↓';
    }

    return '';
  };

  const getColorClass = (index) => {
    if (rowColorMode === 'even' && (index + 1) % 2 === 0) {
      return 'player-row--even';
    }

    if (rowColorMode === 'odd' && (index + 1) % 2 !== 0) {
      return 'player-row--odd';
    }

    return '';
  };

  return (
    <section className="player-table">
      <div className="player-table__wrapper">
        <table className="player-table__table">
          <thead>
            <tr>
              <th>Fav</th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  className="player-table__header"
                  onClick={() => onSort(column.key)}
                >
                  {column.label}
                  {getSortArrow(column.key)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {players.length === 0 ? (
              <tr>
                <td className="player-table__empty" colSpan="10">
                  No hay jugadores para mostrar
                </td>
              </tr>
            ) : (
              players.map((player, index) => (
                <PlayerRow
                  key={player.id}
                  player={player}
                  index={index}
                  onClick={onRowClick}
                  isFavorite={favorites.includes(player.id)}
                  onToggleFavorite={onToggleFavorite}
                  colorClass={getColorClass(index)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default PlayerTable;