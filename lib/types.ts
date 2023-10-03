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
  imageID: string;
  imdbID: string;
}

export interface Film extends Media {}

export interface Show extends Media {}
