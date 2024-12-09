// src/app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server';
import { postService } from '@/lib/postService';

export async function GET(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const post = postService.getPostById(parseInt(params.id));
   
   if (!post) {
     return NextResponse.json(
       { error: '게시글을 찾을 수 없습니다.' },
       { status: 404 }
     );
   }
   
   return NextResponse.json(post);
 } catch (error) {
   return NextResponse.json(
     { error: '게시글을 불러오는데 실패했습니다.' },
     { status: 500 }
   );
 }
}

export async function PUT(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const data = await request.json();
   const post = postService.updatePost(parseInt(params.id), data);
   
   if (!post) {
     return NextResponse.json(
       { error: '게시글을 찾을 수 없습니다.' },
       { status: 404 }
     );
   }

   // 제목 길이 검사
   if (data.title && data.title.length > 100) {
     return NextResponse.json(
       { error: '제목은 100자를 초과할 수 없습니다.' },
       { status: 400 }
     );
   }
   
   return NextResponse.json(post);
 } catch (error) {
   return NextResponse.json(
     { error: '게시글 수정에 실패했습니다.' },
     { status: 500 }
   );
 }
}

export async function DELETE(
 request: Request,
 { params }: { params: { id: string } }
) {
 try {
   const success = postService.deletePost(parseInt(params.id));
   
   if (!success) {
     return NextResponse.json(
       { error: '게시글을 찾을 수 없습니다.' },
       { status: 404 }
     );
   }
   
   return NextResponse.json(
     { message: '게시글이 삭제되었습니다.' }
   );
 } catch (error) {
   return NextResponse.json(
     { error: '게시글 삭제에 실패했습니다.' },
     { status: 500 }
   );
 }
}