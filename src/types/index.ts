import { ReactNode } from "react";

export interface containerChildrenProps {
  children: ReactNode;
}
export interface RouterProps {
  name?: string;
  path: string;
  className?: string;
}

export interface MoviesData {
  adult?: boolean;
  backdrop_path?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  id?: number | string;
}

export interface FilterMovieData {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number | string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  uploadedBy?: string;
}
