function PlayerRow({
  player,
  onClick,
  isFavorite,
  onToggleFavorite,
  colorClass
}) {
  return (
    <tr
      className={`player-row ${colorClass}`}
      onClick={() => onClick(player)}
    >
      <td>
        <button
          className={`player-row__favorite ${isFavorite ? 'player-row__favorite--active' : ''}`}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(player.id);
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </td>

      <td>{player.number}</td>
      <td>{player.name}</td>
      <td>{player.team}</td>
      <td>{player.position}</td>
      <td>{player.age}</td>
      <td>{player.points}</td>
      <td>{player.rebounds}</td>
      <td>{player.assists}</td>
      <td>{player.efficiency}</td>
    </tr>
  );
}

export default PlayerRow;