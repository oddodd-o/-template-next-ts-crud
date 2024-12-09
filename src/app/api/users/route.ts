// src/app/api/users/route.ts
import { NextResponse } from 'next/server';

// 임시 데이터 저장소
const users = [
  { id: 1, name: '김철수' },
  { id: 2, name: '이영희' }
];

// GET - 전체 사용자 조회
export async function GET() {
  return NextResponse.json(users);
}

// POST - 새 사용자 추가
export async function POST(request: Request) {
  const data = await request.json();
  
  const newUser = {
    id: users.length + 1,
    name: data.name
  };
  
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}