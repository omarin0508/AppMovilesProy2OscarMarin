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

  const loadFavorites = useCallback(async () => {
    setFavoritesLoading(true);
    setFavoritesError(null);

    try {
      setFavorites(await readPersistedFavorites());
    } catch (error: unknown) {
      setFavoritesError(getErrorMessage(error, 'No se pudieron cargar las peliculas favoritas.'));
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    void readPersistedFavorites()
      .then((storedFavorites) => {
        if (isMounted) {
          setFavorites(storedFavorites);
        }
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setFavoritesError(getErrorMessage(error, 'No se pudieron cargar las peliculas favoritas.'));
        }
      })
      .finally(() => {
        if (isMounted) {
          setFavoritesLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const addFavorite = useCallback(async (movie: Movie) => {
    setFavoritesLoading(true);
    setFavoritesError(null);

    try {
      await saveFavorite(movie);
      setFavorites(await getFavorites());
    } catch (error: unknown) {
      setFavoritesError(getErrorMessage(error, 'No se pudo guardar la pelicula favorita.'));
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

  const removeFavorite = useCallback(async (movieId: number) => {
    setFavoritesLoading(true);
    setFavoritesError(null);

    try {
      await deleteFavorite(movieId);
      setFavorites(await getFavorites());
    } catch (error: unknown) {
      setFavoritesError(getErrorMessage(error, 'No se pudo eliminar la pelicula favorita.'));
    } finally {
      setFavoritesLoading(false);
    }
  }, []);

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
