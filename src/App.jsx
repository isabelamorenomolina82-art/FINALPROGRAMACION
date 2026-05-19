import { useEffect, useMemo, useState } from 'react';
import { players } from './data/players.js';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import SearchHistory from './components/SearchHistory/SearchHistory.jsx';
import ThemeToggle from './components/ThemeToggle/ThemeToggle.jsx';
import StatsPanel from './components/StatsPanel/StatsPanel.jsx';
import PlayerTable from './components/PlayerTable/PlayerTable.jsx';
import Pagination from './components/Pagination/Pagination.jsx';
import Modal from './components/Modal/Modal.jsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [rowColorMode, setRowColorMode] = useState('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null
  });

  const [darkMode, setDarkMode] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('basketballDarkMode');
    const savedFavorites = localStorage.getItem('basketballFavorites');
    const savedHistory = localStorage.getItem('basketballSearchHistory');

    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem('basketballDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('basketballFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('basketballSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, showOnlyFavorites, itemsPerPage]);

  useEffect(() => {
    if (debouncedSearch && debouncedSearch.length > 2) {
      setSearchHistory((prevHistory) => {
        const updatedHistory = [
          debouncedSearch,
          ...prevHistory.filter((search) => search !== debouncedSearch)
        ];

        return updatedHistory.slice(0, 5);
      });
    }
  }, [debouncedSearch]);

  const filteredPlayers = useMemo(() => {
    let result = [...players];

    if (debouncedSearch) {
      result = result.filter((player) =>
        player.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (showOnlyFavorites) {
      result = result.filter((player) => favorites.includes(player.id));
    }

    return result;
  }, [debouncedSearch, favorites, showOnlyFavorites]);

  const sortedPlayers = useMemo(() => {
    const result = [...filteredPlayers];

    if (!sortConfig.key || !sortConfig.direction) {
      return result;
    }

    result.sort((a, b) => {
      let firstValue = a[sortConfig.key];
      let secondValue = b[sortConfig.key];

      if (sortConfig.key === 'number') {
        firstValue = Number(firstValue);
        secondValue = Number(secondValue);
      }

      if (typeof firstValue === 'string') {
        const comparison = firstValue.localeCompare(secondValue);

        if (sortConfig.direction === 'asc') {
          return comparison;
        }

        return -comparison;
      }

      if (firstValue < secondValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }

      if (firstValue > secondValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }

      return 0;
    });

    return result;
  }, [filteredPlayers, sortConfig]);

  const totalPages = Math.ceil(sortedPlayers.length / itemsPerPage);

  const paginatedPlayers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return sortedPlayers.slice(start, end);
  }, [sortedPlayers, currentPage, itemsPerPage]);

  const stats = useMemo(() => {
    const totalPlayers = filteredPlayers.length;
    const totalPoints = filteredPlayers.reduce((sum, player) => sum + player.points, 0);
    const totalRebounds = filteredPlayers.reduce((sum, player) => sum + player.rebounds, 0);

    const averagePoints = totalPlayers === 0 ? 0 : (totalPoints / totalPlayers).toFixed(1);
    const averageRebounds = totalPlayers === 0 ? 0 : (totalRebounds / totalPlayers).toFixed(1);

    const topScorer = filteredPlayers.reduce((bestPlayer, player) => {
      if (!bestPlayer || player.points > bestPlayer.points) {
        return player;
      }

      return bestPlayer;
    }, null);

    const topEfficiency = filteredPlayers.reduce((bestPlayer, player) => {
      if (!bestPlayer || player.efficiency > bestPlayer.efficiency) {
        return player;
      }

      return bestPlayer;
    }, null);

    const positionDistribution = filteredPlayers.reduce((distribution, player) => {
      distribution[player.position] = (distribution[player.position] || 0) + 1;

      return distribution;
    }, {});

    return {
      totalPlayers,
      favoriteCount: favorites.length,
      averagePoints,
      averageRebounds,
      topScorer,
      topEfficiency,
      positionDistribution
    };
  }, [filteredPlayers, favorites]);

  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key !== key) {
        return {
          key,
          direction: 'asc'
        };
      }

      if (prevConfig.direction === 'asc') {
        return {
          key,
          direction: 'desc'
        };
      }

      return {
        key: null,
        direction: null
      };
    });
  };

  const handleOpenModal = (player) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlayer(null);
  };

  const handleToggleFavorite = (playerId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(playerId)) {
        return prevFavorites.filter((id) => id !== playerId);
      }

      return [...prevFavorites, playerId];
    });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  return (
    <main className={`app ${darkMode ? 'app--dark' : 'app--light'}`}>
      <section className="scoreboard">
        <div className="scoreboard__team">
          <h2>TCB</h2>
          <p>Top Club Flames</p>
        </div>

        <div className="scoreboard__score">
          <span>98</span>
          <strong>-</strong>
          <span>92</span>
        </div>

        <div className="scoreboard__team scoreboard__team--right">
          <h2>RIV</h2>
          <p>Rival All-Stars</p>
        </div>

        <div className="scoreboard__info">
          <span>Q4 - 01:12</span>
          <p>Arena Central · 18 Nov</p>
        </div>
      </section>

      <section className="dashboard">
        <div className="dashboard__top">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onClear={handleClearSearch}
            resultsCount={filteredPlayers.length}
          />
        </div>

        <div className="dashboard__summary">
          <StatsPanel stats={stats} />

          <SearchHistory
            history={searchHistory}
            onSelectSearch={setSearchTerm}
            onClearHistory={handleClearHistory}
          />
        </div>

        <div className="dashboard__actions">
          <button
            className={rowColorMode === 'even' ? 'dashboard__button dashboard__button--active' : 'dashboard__button'}
            type="button"
            onClick={() => setRowColorMode('even')}
          >
            Filas Pares
          </button>

          <button
            className={rowColorMode === 'odd' ? 'dashboard__button dashboard__button--active' : 'dashboard__button'}
            type="button"
            onClick={() => setRowColorMode('odd')}
          >
            Filas Impares
          </button>

          <button
            className="dashboard__button"
            type="button"
            onClick={() => setRowColorMode('none')}
          >
            Limpiar Resaltado
          </button>

          <ThemeToggle
            darkMode={darkMode}
            onToggle={() => setDarkMode((prevValue) => !prevValue)}
          />

          <label className="dashboard__favorite-filter">
            <input
              type="checkbox"
              checked={showOnlyFavorites}
              onChange={(event) => setShowOnlyFavorites(event.target.checked)}
            />
            Mostrar solo favoritos
          </label>

          <span className="dashboard__favorites-count">
            {favorites.length} favoritos guardados
          </span>
        </div>

        <div className="dashboard__content">
          <div className="dashboard__table">
            <PlayerTable
              players={paginatedPlayers}
              onRowClick={handleOpenModal}
              onSort={handleSort}
              sortConfig={sortConfig}
              rowColorMode={rowColorMode}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={setItemsPerPage}
              totalItems={sortedPlayers.length}
            />
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        player={selectedPlayer}
      />
    </main>
  );
}

export default App;