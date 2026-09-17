# Proyecto Programado 2 - Movie Explorer

Curso: Programacion para Dispositivos Moviles (TPA-4001)

Estudiante: Oscar Marin

Tecnologia principal: React Native + Expo + TypeScript

## Estado

Fase 2B: estado global de favoritos conectado a la persistencia SQLite.

## Alcance de esta fase

- Proyecto Expo con TypeScript.
- Servicio para la API REST de TMDB con mapeo a un modelo propio.
- Context API con peliculas, carga, error y reintento.
- Pantalla de exploracion construida con `FlatList`.
- Tarjeta reutilizable para mostrar cada pelicula.
- Navegacion tipada entre exploracion y detalle.
- Detalle con poster, fecha de estreno, calificacion y sinopsis.
- Persistencia local de favoritos con `expo-sqlite`, encapsulada en `src/storage/`.
- `FavoritesContext` para cargar y mantener el estado global de favoritos.
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
│   └── MovieDetailScreen.tsx
├── services/
│   └── movieService.ts
├── storage/
│   └── favoriteStorage.ts
└── types/
    └── movie.ts
```

`FavoritesContext` coordina el estado global de favoritos y delega la persistencia a
`src/storage/`. La interfaz de favoritos aun no esta implementada y la integracion no se ha
validado en runtime.

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
