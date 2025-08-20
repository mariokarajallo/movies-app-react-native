import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { nowPlayingMoviesAction } from 'core/actions/movies/now-playing.action';
import { popularMoviesAction } from 'core/actions/movies/popular.action';
import { topRatedMoviesAction } from 'core/actions/movies/top-rated.action';
import { upComingMoviesAction } from 'core/actions/movies/up-coming.action';

export const useMovies = () => {
  const nowPlayingQuery = useQuery({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: nowPlayingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const popularQuery = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: popularMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const topRatedQuery = useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ['movies', 'topRated'],
    queryFn: ({ pageParam }) => {
      console.log('PageParam', pageParam);
      return topRatedMoviesAction({ page: pageParam });
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  const upComingQuery = useQuery({
    queryKey: ['movies', 'upComing'],
    queryFn: upComingMoviesAction,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  return { nowPlayingQuery, popularQuery, topRatedQuery, upComingQuery };
};
