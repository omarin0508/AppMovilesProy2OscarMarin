# Proyecto Programado 2 - Movie Explorer

Curso: Programacion para Dispositivos Moviles (TPA-4001)

Estudiante: Oscar Marin

Tecnologia principal: React Native + Expo + TypeScript

## Estado del proyecto

Aplicacion completa con consulta de peliculas en TMDB y favoritos persistentes en SQLite.

## Funcionalidad implementada

- Proyecto Expo con TypeScript.
- Servicio para la API REST de TMDB con mapeo a un modelo propio.
- Context API con peliculas, carga, error y reintento.
- Pantalla de exploracion construida con `FlatList`.
- Tarjeta reutilizable para mostrar cada pelicula.
- Navegacion tipada entre exploracion y detalle.
- Detalle con poster, fecha de estreno, calificacion y sinopsis.
- Persistencia local de favoritos con `expo-sqlite`, encapsulada en `src/storage/`.
- `FavoritesContext` para cargar y mantener el estado global de favoritos.
- Accion para agregar o quitar favoritos desde el detalle.
- Pantalla de favoritos con estados de carga, error y lista vacia.
- Pantalla de explicacion del flujo funcional y tecnico del proyecto.
- Enunciado del proyecto disponible en `docs/public_Tarea_2.pdf`.

## Estructura actual

```text
src/
├── components/
│   └── MovieCard.tsx
├── context/
│   ├── AppContext.tsx
│   └── FavoritesContext.tsx
├── navigation/
│   ├── AppNavigator.tsx
│   └── types.ts
├── screens/
│   ├── ExploreScreen.tsx
│   ├── FavoritesScreen.tsx
│   ├── MovieDetailScreen.tsx
│   └── ProjectHelpScreen.tsx
├── services/
│   └── movieService.ts
├── storage/
│   └── favoriteStorage.ts
└── types/
    └── movie.ts
```

`FavoritesContext` coordina el estado global de favoritos y delega la persistencia a
`src/storage/`. La interfaz permite agregar, quitar y consultar favoritos. La persistencia
SQLite se valido en Android al cerrar y volver a abrir la aplicacion.

## Arquitectura

El flujo de datos remotos implementado es:

```text
TMDB REST API
    -> movieService
    -> AppContext
    -> ExploreScreen / MovieDetailScreen
```

El flujo de datos locales implementado es:

```text
SQLite
    -> favoriteStorage
    -> FavoritesContext
    -> MovieDetailScreen / FavoritesScreen
```

- `movieService` realiza las solicitudes REST, maneja respuestas HTTP y errores, y transforma
  el JSON de TMDB al modelo `Movie` del proyecto.
- `AppContext` mantiene el estado remoto de peliculas, sus estados de carga y error, y coordina
  la carga de datos.
- `favoriteStorage` inicializa SQLite y encapsula el guardado, lectura y eliminacion de favoritos.
- `FavoritesContext` mantiene el estado de favoritos y coordina las operaciones de persistencia
  con la interfaz.
- Las pantallas y componentes presentan datos y procesan la interaccion del usuario, sin SQL ni
  implementaciones directas de red.
- La navegacion define transiciones tipadas entre Explore, MovieDetail, Favorites y ProjectHelp.

## Trazabilidad de requisitos

- API REST: TMDB.
- JSON: las respuestas se transforman al modelo `Movie` del proyecto.
- Estado global: React Context API mediante `AppContext` y `FavoritesContext`.
- Persistencia local: SQLite mediante `expo-sqlite`.
- Operaciones locales: guardar, leer y eliminar favoritos.
- Separacion de responsabilidades: red, base de datos, estado, vistas, navegacion y tipos se
  mantienen en modulos distintos.
- La persistencia SQLite fue validada en tiempo de ejecucion entre reinicios del proceso de la
  aplicacion.

## Configuracion de TMDB

1. Copiar `.env.example` como `.env`.
2. Reemplazar el valor de ejemplo con un API Read Access Token de TMDB.

```text
EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN=token_personal
```

El archivo `.env` es local y esta excluido de Git.

## Ejecucion

```bash
npm install
npm start
```

## Validacion

```bash
npm run lint
npm run typecheck
```

## Autor

Proyecto academico desarrollado para el curso Programacion para Dispositivos Moviles (TPA-4001).
