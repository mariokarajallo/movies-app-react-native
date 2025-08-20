import { MovieMapper } from 'infrastucture/mappers/movie.mapper';
import { movieApi } from '../api/movie-api';
import { MovieDBMoviesResponse } from 'infrastucture/interfaces/moviedb-response';

export const nowPlayingMoviesAction = async () => {
  
  try {
    const {data} = await movieApi.get<MovieDBMoviesResponse>('/now_playing');
    // console.log(JSON.stringify(data, null, 2));
    const movies = data.results.map(MovieMapper.fromMovieDBToMovie);
    
    return movies;
  } catch (error) {
    console.error(error);
    throw 'Cannot load now playing movies';
  }
};