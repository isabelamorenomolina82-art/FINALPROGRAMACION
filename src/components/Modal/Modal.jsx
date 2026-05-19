function Modal({ isOpen, onClose, player }) {
  if (!isOpen || !player) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <article
        className="modal__card"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="modal__title">{player.name}</h2>
        <p className="modal__subtitle">{player.team}</p>

        <div className="modal__grid">
          <div>
            <span>Número</span>
            <strong>{player.number}</strong>
          </div>

          <div>
            <span>Posición</span>
            <strong>{player.position}</strong>
          </div>

          <div>
            <span>Edad</span>
            <strong>{player.age}</strong>
          </div>

          <div>
            <span>Puntos</span>
            <strong>{player.points}</strong>
          </div>

          <div>
            <span>Rebotes</span>
            <strong>{player.rebounds}</strong>
          </div>

          <div>
            <span>Asistencias</span>
            <strong>{player.assists}</strong>
          </div>

          <div>
            <span>Eficiencia</span>
            <strong>{player.efficiency}</strong>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Modal;