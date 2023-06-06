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

export interface Film {
  title: string;
  imageID: string;
  imdbID: string;
}

export interface Show {
  title: string;
  imageID: string;
  imdbID: string;
}
