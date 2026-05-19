function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
    >
      {darkMode ? '☀️ Modo claro' : '🌙 Modo oscuro'}
    </button>
  );
}

export default ThemeToggle;