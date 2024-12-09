// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { postService } from '@/lib/postService';
import { validatePost } from '@/lib/utils';

export async function GET() {
  try {
    const posts = postService.getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: '게시글을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const validationError = validatePost(data);
    if (validationError) {
      return NextResponse.json(validationError, { status: 400 });
    }

    const newPost = postService.createPost(data);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: '게시글 작성에 실패했습니다.' },
      { status: 500 }
    );
  }
}