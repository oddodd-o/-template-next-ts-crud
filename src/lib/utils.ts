// src/lib/utils.ts
import { CreatePostInput } from '@/types/post';

export function validatePost({ title, content }: CreatePostInput) {
  if (!title) {
    return { error: '제목은 필수입니다.' };
  }
  if (!content) {
    return { error: '내용은 필수입니다.' };
  }
  if (title.length > 100) {
    return { error: '제목은 100자를 초과할 수 없습니다.' };
  }
  return null;
}