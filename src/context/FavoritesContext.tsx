import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  deleteFavorite,
  getFavorites,
  initializeFavoritesDatabase,
  saveFavorite,
} from '../storage/favoriteStorage';
import { Movie } from '../types/movie';

interface FavoritesContextValue {
  favorites: Movie[];
  favoritesLoading: boolean;
  favoritesError: string | null;
  loadFavorites: () => Promise<void>;
  addFavorite: (movie: Movie) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
  isMovieFavorite: (movieId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

async function readPersistedFavorites(): Promise<Movie[]> {
  await initializeFavoritesDatabase();
  return getFavorites();
}

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);

  const refreshFavorites = useCallback(
    async (
      operation: () => Promise<Movie[]>,
      fallbackError: string,
      isActive: () => boolean = () => true,
    ) => {
      if (!isActive()) {
        return;
      }

      setFavoritesLoading(true);
      setFavoritesError(null);

      try {
        const storedFavorites = await operation();

        if (isActive()) {
          setFavorites(storedFavorites);
        }
      } catch (error: unknown) {
        if (isActive()) {
          setFavoritesError(getErrorMessage(error, fallbackError));
        }
      } finally {
        if (isActive()) {
          setFavoritesLoading(false);
        }
      }
    },
    [],
  );

  const loadPersistedFavorites = useCallback(
    (isActive?: () => boolean) =>
      refreshFavorites(
        readPersistedFavorites,
        'No se pudieron cargar las peliculas favoritas.',
        isActive,
      ),
    [refreshFavorites],
  );

  const loadFavorites = useCallback(() => loadPersistedFavorites(), [loadPersistedFavorites]);

  useEffect(() => {
    let isMounted = true;

    async function initializeFavorites() {
      await Promise.resolve();

      if (isMounted) {
        await loadPersistedFavorites(() => isMounted);
      }
    }

    void initializeFavorites();

    return () => {
      isMounted = false;
    };
  }, [loadPersistedFavorites]);

  const addFavorite = useCallback(
    (movie: Movie) =>
      refreshFavorites(async () => {
        await saveFavorite(movie);
        return getFavorites();
      }, 'No se pudo guardar la pelicula favorita.'),
    [refreshFavorites],
  );

  const removeFavorite = useCallback(
    (movieId: number) =>
      refreshFavorites(async () => {
        await deleteFavorite(movieId);
        return getFavorites();
      }, 'No se pudo eliminar la pelicula favorita.'),
    [refreshFavorites],
  );

  const isMovieFavorite = useCallback(
    (movieId: number) => favorites.some((movie) => movie.id === movieId),
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      favoritesLoading,
      favoritesError,
      loadFavorites,
      addFavorite,
      removeFavorite,
      isMovieFavorite,
    }),
    [
      favorites,
      favoritesLoading,
      favoritesError,
      loadFavorites,
      addFavorite,
      removeFavorite,
      isMovieFavorite,
    ],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavoritesContext must be used inside FavoritesProvider');
  }

  return context;
}
