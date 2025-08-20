import { movieApi } from '../../api/movie-api';
import { MovieDBMovieResponse } from 'infrastucture/interfaces/moviedb-movie.response';
import { MovieDetails } from 'infrastucture/interfaces/movie.interface';
import { MovieMapper } from 'infrastucture/mappers/movie.mapper';

export const getMovieByIdAction = async (id: number | string): Promise<MovieDetails> => {
  try {
    const { data } = await movieApi.get<MovieDBMovieResponse>(`/${id}`);

    return MovieMapper.fromMovieDBToMovieDetails(data);
  } catch (error) {
    console.error(error);
    throw 'Cannot load movie by id';
  }
};
