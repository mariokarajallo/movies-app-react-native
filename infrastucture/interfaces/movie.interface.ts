export interface Movie {
  id: number;
  title: string;
  description: string;
  release_date: Date;
  rating: number;
  poster: string;
  backdrop_path: string;
}

export interface MovieDetails extends Movie {
  genres: string[];
  duration: number;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  production_companies: string[];

}
