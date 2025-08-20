import { MovieDBMovieResponse } from 'infrastucture/interfaces/moviedb-movie.response';
import { Movie, MovieDetails } from '../interfaces/movie.interface';
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

  static fromMovieDBToMovieDetails = (movieFromAPI: MovieDBMovieResponse): MovieDetails => {
    return {
      id: movieFromAPI.id,
      title: movieFromAPI.title,
      description: movieFromAPI.overview,
      release_date: new Date(movieFromAPI.release_date),
      rating: movieFromAPI.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${movieFromAPI.poster_path}`,
      backdrop_path: `https://image.tmdb.org/t/p/w500${movieFromAPI.backdrop_path}`,
      genres: movieFromAPI.genres.map((genre) => genre.name),
      duration: movieFromAPI.runtime,
      budget: movieFromAPI.budget,
      revenue: movieFromAPI.revenue,
      homepage: movieFromAPI.homepage,
      imdb_id: movieFromAPI.imdb_id,
      original_language: movieFromAPI.original_language,
      original_title: movieFromAPI.original_title,
      overview: movieFromAPI.overview,
      popularity: movieFromAPI.popularity,
      production_companies: movieFromAPI.production_companies.map((company) => company.name),
    };
  }
}