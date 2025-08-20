import { Movie } from '../interfaces/movie.interface';
import { Result } from '../interfaces/moviedb-response';

export class MovieMapper {
  static fromMovieDBToMovie(movieFromAPI: Result): Movie {
    return {
      id: movieFromAPI.id,
      title: movieFromAPI.title,
      description: movieFromAPI.overview,
      release_date: new Date(movieFromAPI.release_date),
      rating: movieFromAPI.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movieFromAPI.poster_path}`,
      backdrop_path: `https://image.tmdb.org/t/p/w500${movieFromAPI.backdrop_path}`,
    };
  }
}