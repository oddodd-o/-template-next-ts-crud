// src/lib/postService.ts
import { Post, CreatePostInput, UpdatePostInput } from '@/types/post';
import { posts } from '@/data/posts';

export const postService = {
  // 모든 게시글 조회
  getAllPosts(): Post[] {
    return posts;
  },

  // 특정 게시글 조회
  getPostById(id: number): Post | undefined {
    return posts.find(p => p.id === id);
  },

  // 게시글 생성
  createPost({ title, content }: CreatePostInput): Post {
    const newPost: Post = {
      id: posts.length + 1,
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    posts.push(newPost);
    return newPost;
  },

  // 게시글 수정
  updatePost(id: number, { title, content }: UpdatePostInput): Post | null {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      title: title?.trim() ?? posts[index].title,
      content: content?.trim() ?? posts[index].content
    };
    return posts[index];
  },

  // 게시글 삭제
  deletePost(id: number): boolean {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    posts.splice(index, 1);
    return true;
  }
};