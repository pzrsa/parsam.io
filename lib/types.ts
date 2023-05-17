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
