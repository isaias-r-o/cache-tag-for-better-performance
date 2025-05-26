import { getCachedPosts } from '../lib/posts';
import PostList from './PostList';

export default async function Posts() {
  const initialPosts = await getCachedPosts();
  return <PostList initialPosts={initialPosts} />;
} 