# Proyecto Programado 2 - Explorador de Datos y Consumo de APIs

Curso: Programacion para Dispositivos Moviles (TPA-4001)

Estudiante: Oscar Marin

Tecnologia principal: React Native + Expo + TypeScript

## Estado

Linea base inicial del proyecto. Esta fase prepara el repositorio, la configuracion de Expo y una estructura minima para continuar con la seleccion de API publica, manejo de estado global y persistencia local.

## Alcance de esta fase

- Proyecto Expo con TypeScript.
- Aplicacion inicial funcional.
- Context API configurado de forma minima.
- Separacion inicial entre pantalla, componente reutilizable, contexto y tipos.
- Sin API publica seleccionada todavia.
- Sin almacenamiento local implementado todavia.
- Enunciado del proyecto disponible en `docs/public_Tarea_2.pdf`.

## Estructura inicial

```text
src/
├── components/
│   └── InfoItem.tsx
├── context/
│   └── AppContext.tsx
├── screens/
│   └── StarterScreen.tsx
└── types/
    └── app.ts
```

Las carpetas `services`, `storage` y `utils` se agregaran cuando exista una decision concreta de API, persistencia y utilidades reales.

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
