import { MovieMapper } from 'infrastucture/mappers/movie.mapper';
import { searchApi } from '../../api/movie-api';
import { MovieDBMoviesResponse } from 'infrastucture/interfaces/moviedb-response';

interface SearchParams {
  query: string;
  page?: number;
  include_adult?: boolean;
  year?: string;
}

export const searchMoviesAction = async ({ 
  query, 
  page = 1, 
  include_adult = false,
  year 
}: SearchParams) => {
  
  try {
    const params: any = {
      query,
      page,
      include_adult,
    };

    // Agregar filtro de año si se especifica
    if (year && year.trim() !== '') {
      params.primary_release_year = year;
    }

    console.log('Search params:', params); // Debug log

    const { data } = await searchApi.get<MovieDBMoviesResponse>('/search/movie', {
      params
    });
    
    const movies = data.results.map(MovieMapper.fromMovieDBToMovie);
    
    return {
      movies,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      currentPage: data.page
    };
  } catch (error) {
    console.error(error);
    throw 'No se pudieron cargar los resultados de búsqueda';
  }
};
