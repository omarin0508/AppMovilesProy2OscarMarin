# Proyecto Programado 2 - Movie Explorer

Curso: Programacion para Dispositivos Moviles (TPA-4001)

Estudiante: Oscar Marin

Tecnologia principal: React Native + Expo + TypeScript

## Estado

Fase 2A: capa local de persistencia de favoritos con SQLite.

## Alcance de esta fase

- Proyecto Expo con TypeScript.
- Servicio para la API REST de TMDB con mapeo a un modelo propio.
- Context API con peliculas, carga, error y reintento.
- Pantalla de exploracion construida con `FlatList`.
- Tarjeta reutilizable para mostrar cada pelicula.
- Navegacion tipada entre exploracion y detalle.
- Detalle con poster, fecha de estreno, calificacion y sinopsis.
- Persistencia local de favoritos con `expo-sqlite`, aislada de la UI y del estado global.
- Enunciado del proyecto disponible en `docs/public_Tarea_2.pdf`.

## Estructura actual

```text
src/
├── components/
│   └── MovieCard.tsx
├── context/
│   └── AppContext.tsx
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

`src/storage/` concentra la inicializacion de SQLite y las operaciones para guardar, leer,
eliminar y consultar favoritos. La interfaz de favoritos y su integracion con Context se
agregaran en fases posteriores; la persistencia aun no se ha validado en runtime.

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
