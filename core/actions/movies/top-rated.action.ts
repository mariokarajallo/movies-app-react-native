import { MovieMapper } from 'infrastucture/mappers/movie.mapper';
import { movieApi } from '../api/movie-api';
import { MovieDBMoviesResponse } from 'infrastucture/interfaces/moviedb-response';

export const topRatedMoviesAction = async () => {
  
  try {
    const {data} = await movieApi.get<MovieDBMoviesResponse>('/top_rated');
    // console.log(JSON.stringify(data, null, 2));
    const movies = data.results.map(MovieMapper.fromMovieDBToMovie);
    
    return movies;
  } catch (error) {
    console.error(error);
    throw 'Cannot load top rated movies';
  }
};