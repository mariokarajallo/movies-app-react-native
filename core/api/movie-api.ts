import axios from 'axios';

export const movieApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_MOVIE_DB_URL,
  params: {
    language: 'es-MX',
    api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
  },
});

// Nueva configuración específica para búsqueda
export const searchApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    language: 'es-MX',
    api_key: process.env.EXPO_PUBLIC_MOVIE_DB_KEY,
  },
});

export const getPopularMovies = async () => {
  const response = await movieApi.get('/movie/popular');
  return response.data;
};