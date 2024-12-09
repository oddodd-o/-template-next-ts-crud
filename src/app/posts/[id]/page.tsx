'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const resolvedParams = use(params);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/posts/${resolvedParams.id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        alert('게시글을 불러올 수 없습니다.');
        router.push('/posts');
      }
    };
    fetchPost();
  }, [resolvedParams.id, router]);

  const handleDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const response = await fetch(`/api/posts/${resolvedParams.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/posts');
      } else {
        alert('삭제에 실패했습니다.');
      }
    }
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-4">
          작성일: {post.createdAt}
        </div>
        <div className="prose max-w-none mb-6">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Link 
            href="/posts" 
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
            목록
          </Link>
          <Link
            href={`/posts/${post.id}/edit`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}