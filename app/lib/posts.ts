import { unstable_cache } from 'next/cache';
import { db } from './db';

export const getCachedPosts = unstable_cache(
  async () => db.getPosts(),
  ['posts-list'],
  {
    tags: ['posts'],
    revalidate: 3600
  }
); 