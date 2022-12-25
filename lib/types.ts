export interface Post {
  slug: string;
  contentHtml: string;
  date: string;
  title: string;
  subtitle?: string;
  author?: string;
  description?: string;
  genre?: string;
}

export interface Album {
  title: string;
  image: string;
  url: string;
}
