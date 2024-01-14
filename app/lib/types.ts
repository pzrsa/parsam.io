export interface Post {
  id: string;
  contentHtml: string;
  date: string;
  title: string;

  // book note
  subtitle?: string;
  author?: string;
  description?: string;
}

interface Media {
  title: string;
  tmdbImageID: string;
  imdbID: string;
}

export interface Film extends Media {}

export interface Show extends Media {}

export interface Album {
  title: string;
  spotifyImageID: string;
  spotifyID: string;
}
