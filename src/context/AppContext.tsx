import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react';

import { getPopularMovies } from '../services/movieService';
import { Movie } from '../types/movie';

interface AppContextValue {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  loadMovies: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: PropsWithChildren) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'No se pudieron cargar las peliculas.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ movies, loading, error, loadMovies }),
    [movies, loading, error, loadMovies],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider');
  }

  return context;
}
