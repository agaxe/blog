export interface PostSeries {
  title: string | null;
  posts: { id: string; title: PostSeries['title'] }[] | null;
}
