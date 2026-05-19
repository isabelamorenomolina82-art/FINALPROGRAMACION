# Entrega Parcial Final

Nombre: ISABELA MORENO MOLINA

Proyecto: Basketball Final con React y Vite.

## Descripción

Este proyecto corresponde al examen final de Basketball desarrollado con React.  
Incluye uso de Hooks, componentes reutilizables, localStorage, búsqueda, paginación, ordenamiento, favoritos, historial y modal de detalles.

## Funcionalidades principales

- Búsqueda con debounce.
- Historial de búsquedas.
- Coloreo de filas pares e impares.
- Paginación dinámica.
- Ordenamiento de columnas.
- Modo oscuro y claro.
- Estadísticas en tiempo real.
- Modal de detalles.
- Sistema de favoritos.
- Componentes reutilizables.


## Requisito 12

Se implementó una búsqueda en tiempo real que filtra únicamente por el nombre del jugador. También se agregó debounce de 300ms usando useEffect.

## Requisito 13

Se agregaron botones para pintar filas pares, pintar filas impares y limpiar el resaltado de colores.

## Requisito 14

Se implementó paginación dinámica con selector de 5, 10 y 20 registros por página.

## Requisito 15

Se agregó ordenamiento en las columnas de la tabla usando estado para controlar columna activa y dirección.

## Requisito 16

Se implementó modo oscuro y claro con persistencia en localStorage.

## Requisito 17

Se creó un panel de estadísticas en tiempo real usando useMemo para optimizar los cálculos.

## Requisito 18

Se implementó un modal de detalles que se abre al hacer clic sobre cualquier fila de jugador.