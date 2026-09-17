import { Movie } from '../types/movie';

export type RootStackParamList = {
  Explore: undefined;
  Favorites: undefined;
  ProjectHelp: undefined;
  MovieDetail: {
    movie: Movie;
  };
};
