export type Notes = [
  {
    slug: string;
    title: string;
    date: string;
    author: string;
    description: string;
    image: string;
  }
];

export interface Post {
  title: string;
  author: string;
  description: string;
  date: string;
  image: string;
  contentHtml: string;
}
