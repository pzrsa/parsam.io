export interface Post {
  slug: string;
  title: string;
  author: string;
  description: string;
  date: string;
  image: string;
  contentHtml: string;
}

export interface Album {
  title: string;
  image: string;
  url: string;
}
