// src/lib/posts.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

let posts: Post[] = [
  { 
    id: 1, 
    title: '첫 번째 글', 
    content: '안녕하세요!',
    createdAt: new Date().toISOString()
  }
];

export function getPosts() {
  return posts;
}

export function findPost(id: number) {
  return posts.find(p => p.id === id);
}

export function addPost(post: Omit<Post, 'id' | 'createdAt'>) {
  const newPost = {
    id: posts.length + 1,
    ...post,
    createdAt: new Date().toISOString()
  };
  posts.push(newPost);
  return newPost;
}

export function deletePost(id: number) {
  const found = posts.find(p => p.id === id);
  if (!found) return false;
  
  posts = posts.filter(p => p.id !== id);
  return true;
}