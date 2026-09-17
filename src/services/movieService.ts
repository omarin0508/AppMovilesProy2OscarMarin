import { Movie } from '../types/movie';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_READ_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN;

interface TmdbMovieResult {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  release_date?: string;
  vote_average?: number;
}

interface TmdbPopularMoviesResponse {
  results: TmdbMovieResult[];
}

interface TmdbErrorResponse {
  status_message?: string;
}

function mapMovie(result: TmdbMovieResult): Movie {
  return {
    id: result.id,
    title: result.title,
    overview: result.overview ?? '',
    posterPath: result.poster_path ?? null,
    releaseDate: result.release_date ?? '',
    voteAverage: result.vote_average ?? 0,
  };
}

export async function getPopularMovies(): Promise<Movie[]> {
  if (!TMDB_READ_ACCESS_TOKEN) {
    throw new Error('Falta configurar EXPO_PUBLIC_TMDB_READ_ACCESS_TOKEN en el archivo .env.');
  }

  let response: Response;

  try {
    response = await fetch(`${TMDB_API_BASE_URL}/movie/popular?language=es-CR&page=1`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
      },
    });
  } catch {
    throw new Error('No fue posible conectar con TMDB. Revisa tu conexion e intenta de nuevo.');
  }

  if (!response.ok) {
    let detail = '';

    try {
      const errorBody = (await response.json()) as TmdbErrorResponse;
      detail = errorBody.status_message ? ` ${errorBody.status_message}` : '';
    } catch {
      // Some failed responses may not include a JSON body.
    }

    throw new Error(`TMDB respondio con el estado ${response.status}.${detail}`);
  }

  const data = (await response.json()) as TmdbPopularMoviesResponse;

  if (!Array.isArray(data.results)) {
    throw new Error('TMDB devolvio una respuesta con un formato inesperado.');
  }

  return data.results.map(mapMovie);
}
