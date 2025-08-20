import { movieApi } from '../../api/movie-api';
import { MovieDBCastResponse } from 'infrastucture/interfaces/moviedb-cast.response';
import { Cast } from 'infrastucture/interfaces/cast.interface';
import { CastMapper } from 'infrastucture/mappers/cast.mapper';

export const getMovieCastAction = async (id: number | string): Promise<Cast[]> => {
  try {
    const { data } = await movieApi.get<MovieDBCastResponse>(`/${id}/credits`);

    return data.cast.map((actor) => CastMapper.fromMovieDBCastResponseToCast(actor));
  } catch (error) {
    console.error(error);
    throw 'Cannot load movie cast';
  }
};

export default getMovieCastAction;
