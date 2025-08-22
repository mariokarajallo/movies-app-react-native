import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMoviesAction } from '../../core/actions/movies/search.action';

interface SearchParams {
  query: string;
  year?: string;
}

export const useMovieSearch = (searchParams: SearchParams, enabled: boolean = false) => {
  const { query, year } = searchParams;

  return useInfiniteQuery({
    queryKey: ['search', query, year],
    queryFn: ({ pageParam = 1 }) =>
      searchMoviesAction({
        query,
        page: pageParam,
        include_adult: false,
        year,
      }),
    enabled: enabled && query.length > 2, // Solo buscar si hay más de 2 caracteres
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
