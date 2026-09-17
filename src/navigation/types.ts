import { Movie } from '../types/movie';

export type RootStackParamList = {
  Explore: undefined;
  Favorites: undefined;
  MovieDetail: {
    movie: Movie;
  };
};
