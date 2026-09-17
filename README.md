# Proyecto Programado 2 - Movie Explorer

Curso: Programacion para Dispositivos Moviles (TPA-4001)

Estudiante: Oscar Marin

Tecnologia principal: React Native + Expo + TypeScript

## Estado

Fase 1A: corte vertical para consultar y mostrar peliculas populares de TMDB.

## Alcance de esta fase

- Proyecto Expo con TypeScript.
- Servicio para la API REST de TMDB con mapeo a un modelo propio.
- Context API con peliculas, carga, error y reintento.
- Pantalla de exploracion construida con `FlatList`.
- Tarjeta reutilizable para mostrar cada pelicula.
- Sin almacenamiento local implementado todavia.
- Enunciado del proyecto disponible en `docs/public_Tarea_2.pdf`.

## Estructura actual

```text
src/
├── components/
│   └── MovieCard.tsx
├── context/
│   └── AppContext.tsx
├── screens/
│   └── ExploreScreen.tsx
├── services/
│   └── movieService.ts
└── types/
    └── movie.ts
```

Las capas de detalle, favoritos, navegacion y persistencia se agregaran en fases posteriores.

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
