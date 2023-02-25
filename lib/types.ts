export interface Post {
  slug: string;
  contentHtml: string;
  date: string;
  title: string;

  // specific to book notes
  subtitle?: string;
  author?: string;
  description?: string;
  genre?: string;
  isbn?: string;
  rating?: string;
}

export interface Album {
  title: string;
  image: string;
  url: string;
}
