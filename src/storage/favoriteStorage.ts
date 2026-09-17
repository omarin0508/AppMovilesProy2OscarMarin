import * as SQLite from 'expo-sqlite';

import { Movie } from '../types/movie';

const DATABASE_NAME = 'movie-explorer.db';

interface FavoriteRow {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function openFavoritesDatabase(): Promise<SQLite.SQLiteDatabase> {
  const database = await SQLite.openDatabaseAsync(DATABASE_NAME);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      overview TEXT NOT NULL,
      poster_path TEXT,
      release_date TEXT NOT NULL,
      vote_average REAL NOT NULL
    );
  `);

  return database;
}

async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = openFavoritesDatabase().catch((error: unknown) => {
      databasePromise = null;
      throw new Error(`No fue posible inicializar la base de datos de favoritos: ${describeError(error)}`);
    });
  }

  return databasePromise;
}

function mapFavoriteRow(row: FavoriteRow): Movie {
  return {
    id: row.id,
    title: row.title,
    overview: row.overview,
    posterPath: row.poster_path,
    releaseDate: row.release_date,
    voteAverage: row.vote_average,
  };
}

export async function initializeFavoritesDatabase(): Promise<void> {
  await getDatabase();
}

export async function saveFavorite(movie: Movie): Promise<void> {
  try {
    const database = await getDatabase();

    await database.runAsync(
      `INSERT INTO favorites (id, title, overview, poster_path, release_date, vote_average)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
         title = excluded.title,
         overview = excluded.overview,
         poster_path = excluded.poster_path,
         release_date = excluded.release_date,
         vote_average = excluded.vote_average`,
      movie.id,
      movie.title,
      movie.overview,
      movie.posterPath,
      movie.releaseDate,
      movie.voteAverage,
    );
  } catch (error: unknown) {
    throw new Error(`No fue posible guardar la pelicula favorita: ${describeError(error)}`);
  }
}

export async function getFavorites(): Promise<Movie[]> {
  try {
    const database = await getDatabase();
    const rows = await database.getAllAsync<FavoriteRow>(
      `SELECT id, title, overview, poster_path, release_date, vote_average
       FROM favorites
       ORDER BY title COLLATE NOCASE, id`,
    );

    return rows.map(mapFavoriteRow);
  } catch (error: unknown) {
    throw new Error(`No fue posible leer las peliculas favoritas: ${describeError(error)}`);
  }
}

export async function deleteFavorite(movieId: number): Promise<void> {
  try {
    const database = await getDatabase();
    await database.runAsync('DELETE FROM favorites WHERE id = ?', movieId);
  } catch (error: unknown) {
    throw new Error(`No fue posible eliminar la pelicula favorita: ${describeError(error)}`);
  }
}
