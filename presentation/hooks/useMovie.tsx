import { useQuery } from '@tanstack/react-query';
import { getMovieCastAction } from 'core/actions/movie/get-cast-by-id.action';
import { getMovieByIdAction } from 'core/actions/movie/get-movie-by-id.action';
import { getVideosByMovieId } from 'core/actions/movie/get-videos-by-id.action';

const useMovie = (id: number | string) => {
  const movieQuery = useQuery({
    queryKey: ['movie', id],
    queryFn: () => getMovieByIdAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const castQuery = useQuery({
    queryKey: ['movie', id, 'cast'],
    queryFn: () => getMovieCastAction(id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const videosQuery = useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => getVideosByMovieId(+id),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return {
    movieQuery,
    castQuery,
    videosQuery,
  };
};

export default useMovie;
