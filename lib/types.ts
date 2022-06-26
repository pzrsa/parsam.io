export interface Post {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
  author?: string;
  description?: string;
  image?: string;
}

export interface Album {
  title: string;
  image: string;
  url: string;
}
