import { VideoResult } from '../interfaces/moviedb-video.response';
import { Video } from '../interfaces/video.interface';

export class VideoMapper {
  static fromMovieDBToVideo(videoFromAPI: VideoResult): Video {
    return {
      id: videoFromAPI.id,
      name: videoFromAPI.name,
      key: videoFromAPI.key,
      site: videoFromAPI.site,
      type: videoFromAPI.type,
      official: videoFromAPI.official,
      published_at: new Date(videoFromAPI.published_at),
      youtube_url: `https://www.youtube.com/watch?v=${videoFromAPI.key}`,
    };
  }

  static fromMovieDBToVideos(videosFromAPI: VideoResult[]): Video[] {
    return videosFromAPI
      .filter(video => video.site === 'YouTube' && video.type === 'Trailer')
      .map(video => this.fromMovieDBToVideo(video));
  }
}
