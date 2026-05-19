# APRENDIZAJE.md

## Proyecto

Basketball Final - React + Vite

## Integrante

ISABELA MORENO MOLINA

---

# a) ¿Qué es useState y cuándo usarlo?

`useState` es un Hook de React que permite crear y manejar estados dentro de un componente funcional.

Un estado es una información que puede cambiar mientras el usuario interactúa con la aplicación. Cuando un estado cambia, React vuelve a renderizar el componente para mostrar la información actualizada en pantalla.

Se usa `useState` cuando necesitamos guardar información dinámica, por ejemplo:

- El texto que escribe el usuario en un buscador.
- Si un modal está abierto o cerrado.
- Qué jugadores están marcados como favoritos.
- La página actual de una tabla.
- El modo oscuro o claro.
- La columna seleccionada para ordenar.

## Ejemplo 1: búsqueda de jugadores

En el proyecto se usa `useState` para guardar el texto que escribe el usuario en el buscador.

```jsx
const [searchTerm, setSearchTerm] = useState('');
```

`searchTerm` guarda el valor actual del input y `setSearchTerm` actualiza ese valor cuando el usuario escribe.

Este estado se usa en el componente `SearchBar`:

```jsx
<SearchBar
  value={searchTerm}
  onChange={setSearchTerm}
  onClear={handleClearSearch}
  resultsCount={filteredPlayers.length}
/>
```

## Ejemplo 2: modal de detalles

En el proyecto se usa `useState` para saber qué jugador fue seleccionado y si el modal está abierto.

```jsx
const [selectedPlayer, setSelectedPlayer] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
```

Cuando el usuario hace clic en una fila de la tabla, se guarda el jugador seleccionado y se abre el modal:

```jsx
const handleOpenModal = (player) => {
  setSelectedPlayer(player);
  setIsModalOpen(true);
};
```

Para cerrar el modal, se cambia el estado a `false` y se limpia el jugador seleccionado:

```jsx
const handleCloseModal = () => {
  setIsModalOpen(false);
  setSelectedPlayer(null);
};
```

## Ejemplo 3: sistema de favoritos

En el proyecto se usa `useState` para guardar los jugadores favoritos.

```jsx
const [favorites, setFavorites] = useState([]);
```

Cuando el usuario hace clic en la estrella de un jugador, se agrega o elimina su ID del arreglo de favoritos:

```jsx
const handleToggleFavorite = (playerId) => {
  setFavorites((prevFavorites) => {
    if (prevFavorites.includes(playerId)) {
      return prevFavorites.filter((id) => id !== playerId);
    }

    return [...prevFavorites, playerId];
  });
};
```

Este estado permite marcar y desmarcar jugadores como favoritos.

---

# b) ¿Qué es useEffect y sus casos de uso?

`useEffect` es un Hook de React que permite ejecutar efectos secundarios dentro de un componente funcional.

Un efecto secundario es una acción que ocurre después de que React renderiza el componente. Se usa para tareas como:

- Guardar datos en `localStorage`.
- Leer datos guardados al cargar la página.
- Crear temporizadores.
- Aplicar debounce.
- Escuchar eventos.
- Limpiar procesos con cleanup.

## Explicación del ciclo de vida

En React, un componente puede pasar por tres momentos principales:

1. **Montaje:** cuando el componente aparece por primera vez en pantalla.
2. **Actualización:** cuando cambia un estado o una propiedad.
3. **Desmontaje:** cuando el componente deja de mostrarse.

`useEffect` permite ejecutar código después del renderizado.

Ejemplo general:

```jsx
useEffect(() => {
  console.log('El componente se renderizó');
});
```

## Diferencia entre useEffect sin array, con [] y con [dep]

### useEffect sin array

Cuando `useEffect` no tiene array de dependencias, se ejecuta después de cada renderizado.

```jsx
useEffect(() => {
  console.log('Este efecto se ejecuta en cada render');
});
```

Este caso se debe usar con cuidado, porque puede ejecutarse muchas veces.

### useEffect con array vacío []

Cuando `useEffect` tiene un array vacío, se ejecuta una sola vez cuando el componente se monta.

En el proyecto se usa para recuperar información guardada en `localStorage` al cargar la aplicación:

```jsx
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
```

### useEffect con dependencias [dep]

Cuando `useEffect` tiene dependencias, se ejecuta cada vez que cambia una de esas dependencias.

Ejemplo del proyecto guardando favoritos:

```jsx
useEffect(() => {
  localStorage.setItem('basketballFavorites', JSON.stringify(favorites));
}, [favorites]);
```

Ejemplo del proyecto guardando el modo oscuro:

```jsx
useEffect(() => {
  localStorage.setItem('basketballDarkMode', JSON.stringify(darkMode));
}, [darkMode]);
```

Ejemplo del proyecto guardando el historial de búsqueda:

```jsx
useEffect(() => {
  localStorage.setItem('basketballSearchHistory', JSON.stringify(searchHistory));
}, [searchHistory]);
```

## Ejemplo de cleanup function

El cleanup function es una función que se retorna dentro de `useEffect`. Sirve para limpiar procesos anteriores antes de ejecutar nuevamente el efecto o antes de desmontar el componente.

En el proyecto se usa para limpiar el temporizador del debounce:

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm.trim());
  }, 300);

  return () => {
    clearTimeout(timer);
  };
}, [searchTerm]);
```

`clearTimeout(timer)` evita que se acumulen varios temporizadores mientras el usuario escribe.

---

# c) ¿Qué es useMemo y cuándo usarlo?

`useMemo` es un Hook de React que permite memorizar el resultado de un cálculo.

Se usa cuando tenemos cálculos que no queremos repetir innecesariamente en cada renderizado. Es útil para optimizar el rendimiento de una aplicación.

En este proyecto se usa `useMemo` para:

- Filtrar jugadores.
- Ordenar jugadores.
- Paginar jugadores.
- Calcular estadísticas.

## Diferencia entre useMemo y useCallback

`useMemo` memoriza un valor calculado.

Ejemplo:

```jsx
const filteredPlayers = useMemo(() => {
  let result = [...players];

  if (debouncedSearch) {
    result = result.filter((player) =>
      player.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }

  return result;
}, [debouncedSearch]);
```

`useCallback` memoriza una función.

Ejemplo general:

```jsx
const handleClick = useCallback(() => {
  console.log('Click');
}, []);
```

Diferencia principal:

- `useMemo` guarda el resultado de una operación.
- `useCallback` guarda una función para no crearla nuevamente en cada render.

En este proyecto se usó `useMemo` porque se necesitaba optimizar cálculos de filtros, ordenamiento, paginación y estadísticas.

## Ejemplo de optimización del proyecto

En el proyecto se usa `useMemo` para calcular los jugadores filtrados.

```jsx
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
```

Este cálculo solo se vuelve a ejecutar cuando cambian:

- `debouncedSearch`
- `favorites`
- `showOnlyFavorites`

Así se evita filtrar los jugadores en cada renderizado innecesariamente.

## Ejemplo de ordenamiento con useMemo

El proyecto también usa `useMemo` para ordenar los jugadores por columnas.

```jsx
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
```

Este cálculo solo se actualiza cuando cambian los jugadores filtrados o la configuración de ordenamiento.

## Ejemplo de estadísticas con useMemo

El proyecto usa `useMemo` para calcular estadísticas en tiempo real.

```jsx
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

  return {
    totalPlayers,
    averagePoints,
    averageRebounds,
    topScorer,
    topEfficiency
  };
}, [filteredPlayers]);
```

Este cálculo permite que las estadísticas cambien automáticamente cuando se aplica una búsqueda o filtro.

---

# d) ¿Cómo funciona el cleanup en useEffect?

El cleanup en `useEffect` es una función que React ejecuta para limpiar un efecto anterior.

Se ejecuta en dos momentos principales:

1. Antes de volver a ejecutar el mismo efecto.
2. Cuando el componente se desmonta.

Sirve para evitar errores, acumulación de procesos o problemas de rendimiento.

Ejemplos de uso:

- Limpiar temporizadores.
- Quitar eventos.
- Cancelar peticiones.
- Evitar fugas de memoria.

## Explicación con ejemplo del debounce del proyecto

En el proyecto, el cleanup se usa para controlar el debounce de la búsqueda.

```jsx
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm.trim());
  }, 300);

  return () => {
    clearTimeout(timer);
  };
}, [searchTerm]);
```

Funcionamiento paso a paso:

1. El usuario escribe en el buscador.
2. Cambia el estado `searchTerm`.
3. Se ejecuta el `useEffect`.
4. Se crea un temporizador de 300ms con `setTimeout`.
5. Si el usuario vuelve a escribir antes de que pasen los 300ms, React ejecuta el cleanup.
6. El cleanup ejecuta `clearTimeout(timer)`.
7. Se elimina el temporizador anterior.
8. Se crea un nuevo temporizador.
9. Cuando el usuario deja de escribir, se actualiza `debouncedSearch`.

Esto evita que la búsqueda se ejecute en cada tecla inmediatamente. En lugar de eso, espera 300ms después de que el usuario deja de escribir.

---

# e) ¿Cómo funciona localStorage con React?

`localStorage` es una herramienta del navegador que permite guardar información de forma persistente.

Esto significa que los datos no se pierden aunque el usuario recargue la página o cierre y vuelva a abrir el navegador.

En React se usa normalmente junto con `useEffect`.

Se usa de dos maneras:

1. Leer datos guardados cuando carga la aplicación.
2. Guardar datos cuando cambia un estado.

## Ejemplo de persistencia del proyecto: favoritos

En el proyecto se guardan los jugadores favoritos en `localStorage`.

Primero se crea el estado:

```jsx
const [favorites, setFavorites] = useState([]);
```

Cuando el usuario marca un jugador como favorito, cambia el estado `favorites`.

Después se guarda automáticamente en `localStorage`:

```jsx
useEffect(() => {
  localStorage.setItem('basketballFavorites', JSON.stringify(favorites));
}, [favorites]);
```

Como `localStorage` solo guarda texto, se usa `JSON.stringify()` para convertir el arreglo en texto.

## Recuperar favoritos al cargar la página

Cuando la aplicación carga, se recuperan los favoritos guardados.

```jsx
useEffect(() => {
  const savedFavorites = localStorage.getItem('basketballFavorites');

  if (savedFavorites) {
    setFavorites(JSON.parse(savedFavorites));
  }
}, []);
```

`JSON.parse()` convierte el texto guardado nuevamente en un arreglo.

## Ejemplo de persistencia del modo oscuro

El proyecto también guarda el modo oscuro o claro.

```jsx
useEffect(() => {
  localStorage.setItem('basketballDarkMode', JSON.stringify(darkMode));
}, [darkMode]);
```

Y al cargar la aplicación se recupera:

```jsx
const savedTheme = localStorage.getItem('basketballDarkMode');

if (savedTheme) {
  setDarkMode(JSON.parse(savedTheme));
}
```

Gracias a esto, si el usuario activa el modo oscuro y recarga la página, el modo se mantiene.

## Ejemplo de persistencia del historial de búsqueda

El historial de búsqueda también se guarda en `localStorage`.

```jsx
useEffect(() => {
  localStorage.setItem('basketballSearchHistory', JSON.stringify(searchHistory));
}, [searchHistory]);
```

Y se recupera al cargar la página:

```jsx
const savedHistory = localStorage.getItem('basketballSearchHistory');

if (savedHistory) {
  setSearchHistory(JSON.parse(savedHistory));
}
```

Esto permite conservar las últimas búsquedas realizadas por el usuario.

---

# IA utilizada o autor de IA

Para la realización y documentación del proyecto se utilizó apoyo de inteligencia artificial mediante:

**ChatGPT de OpenAI**

La IA fue utilizada como herramienta de apoyo para:

- Comprender conceptos de React.
- Explicar el uso de Hooks.
- Guiar la creación del proyecto.
- Corregir errores.
- Organizar archivos y componentes.
- Apoyar la documentación del README y APRENDIZAJE.
- Revisar requisitos del parcial.

La estudiante **ISABELA MORENO MOLINA** revisó, probó, adaptó y entregó el proyecto final.

---

# Conclusión

Durante el desarrollo del proyecto se aprendió a usar Hooks fundamentales de React como:

- `useState`
- `useEffect`
- `useMemo`

También se comprendió cómo manejar:

- Estados dinámicos.
- Efectos secundarios.
- Cleanup functions.
- Persistencia con `localStorage`.
- Optimización de cálculos.
- Componentes reutilizables.

Estos conceptos fueron aplicados directamente en el proyecto final de Basketball.
