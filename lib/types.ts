export interface Post {
  id: string;
  contentHtml: string;
  date: string;
  title: string;

  // book note
  book?: boolean;
  subtitle?: string;
  author?: string;
  description?: string;
}
