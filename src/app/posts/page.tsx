// src/app/posts/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/types/post';

export default function PostsPage() {
 const [posts, setPosts] = useState<Post[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
   const fetchPosts = async () => {
     try {
       setLoading(true);
       setError(null);
       const response = await fetch('/api/posts');
       
       if (!response.ok) {
         throw new Error('게시글을 불러오는데 실패했습니다.');
       }

       const data = await response.json();
       setPosts(data);
     } catch (err) {
       setError(err instanceof Error ? err.message : '오류가 발생했습니다.');
     } finally {
       setLoading(false);
     }
   };

   fetchPosts();
 }, []);

 const handleDelete = async (id: number) => {
   if (!confirm('정말 삭제하시겠습니까?')) return;

   try {
     const response = await fetch(`/api/posts/${id}`, {
       method: 'DELETE',
     });

     if (!response.ok) {
       throw new Error('삭제에 실패했습니다.');
     }

     setPosts(posts.filter(post => post.id !== id));
   } catch (err) {
     alert(err instanceof Error ? err.message : '오류가 발생했습니다.');
   }
 };

 if (loading) return (
   <div className="flex justify-center items-center min-h-screen">
     <div className="text-xl">로딩 중...</div>
   </div>
 );

 if (error) return (
   <div className="flex justify-center items-center min-h-screen">
     <div className="text-red-500">{error}</div>
   </div>
 );

 return (
   <div className="max-w-4xl mx-auto p-4">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-2xl font-bold">게시글 목록</h1>
       <Link 
         href="/posts/write" 
         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
       >
         글쓰기
       </Link>
     </div>
     
     {posts.length === 0 ? (
       <div className="text-center text-gray-500 py-10">
         게시글이 없습니다.
       </div>
     ) : (
       <div className="space-y-4">
         {posts.map((post) => (
           <div key={post.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
             <Link href={`/posts/${post.id}`}>
               <div className="cursor-pointer">
                 <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                 <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
               </div>
             </Link>
             <div className="flex justify-between items-center text-sm text-gray-500">
               <span>{post.createdAt}</span>
               <div className="space-x-2">
                 <Link 
                   href={`/posts/${post.id}/edit`}
                   className="text-blue-500 hover:underline"
                 >
                   수정
                 </Link>
                 <button
                   onClick={() => handleDelete(post.id)}
                   className="text-red-500 hover:underline"
                 >
                   삭제
                 </button>
               </div>
             </div>
           </div>
         ))}
       </div>
     )}
   </div>
 );
}