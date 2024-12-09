import { NextResponse } from 'next/server';

// GET /api/hello 주소로 요청이 오면 실행
export async function GET() {
  // 클라이언트에게 JSON 응답
  return NextResponse.json({ message: '안녕하세요!' });
}