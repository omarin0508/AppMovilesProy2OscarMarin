import { Movie } from '../types/movie';

export type RootStackParamList = {
  Explore: undefined;
  MovieDetail: {
    movie: Movie;
  };
};
