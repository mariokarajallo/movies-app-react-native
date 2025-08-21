import { movieApi } from '../../api/movie-api';
import { MovieDBVideoResponse } from '../../../infrastucture/interfaces/moviedb-video.response';
import { VideoMapper } from '../../../infrastucture/mappers/video.mapper';
import { Video } from '../../../infrastucture/interfaces/video.interface';

export const getVideosByMovieId = async (movieId: number): Promise<Video[]> => {
  try {
    const response = await movieApi.get<MovieDBVideoResponse>(`/${movieId}/videos`);
    return VideoMapper.fromMovieDBToVideos(response.data.results);
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Error al obtener los videos de la película');
  }
};
