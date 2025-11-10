'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RouteHandlersPage() {
    const [getResult, setGetResult] = useState('');
    const [postResult, setPostResult] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleGetRequest = async () => {
        const res = await fetch('/api/hello');
        const data = await res.json();
        setGetResult(JSON.stringify(data, null, 2));
    };

    const handlePostRequest = async () => {
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        setPostResult(JSON.stringify(data, null, 2));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Route Handlers (API Routes)</h1>
                    <p className="text-gray-600 mb-4">
                        App Router의 새로운 API Routes 패턴을 학습합니다.
                    </p>
                    <Link href="/app-router" className="text-blue-600 hover:text-blue-800">
                        ← App Router 예제로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">🛣️ Route Handlers란?</h2>
                    <p className="text-sm text-blue-800 mb-3">
                        Pages Router의 API Routes를 대체하는 새로운 방식입니다.
                        <code className="bg-blue-100 px-2 py-1 rounded mx-1">route.ts</code> 파일로 정의합니다.
                    </p>
                    <div className="bg-white p-4 rounded font-mono text-sm">
                        <pre>{`// app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello!' });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ data: body });
}`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-4">📡 GET 요청 테스트</h3>
                        <button
                            onClick={handleGetRequest}
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-3"
                        >
                            GET /api/hello
                        </button>
                        {getResult && (
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-xs font-semibold mb-1">응답:</div>
                                <pre className="text-xs overflow-x-auto">{getResult}</pre>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-4">📮 POST 요청 테스트</h3>
                        <div className="space-y-2 mb-3">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={handlePostRequest}
                            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mb-3"
                        >
                            POST /api/users
                        </button>
                        {postResult && (
                            <div className="bg-gray-50 p-3 rounded">
                                <div className="text-xs font-semibold mb-1">응답:</div>
                                <pre className="text-xs overflow-x-auto">{postResult}</pre>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🔧 지원하는 HTTP 메서드</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        {['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'].map(method => (
                            <div key={method} className="p-3 bg-gray-50 rounded border">
                                <div className="font-mono font-bold text-blue-600">{method}</div>
                                <div className="text-xs text-gray-600 mt-1">
                                    {method === 'GET' && '데이터 조회'}
                                    {method === 'POST' && '데이터 생성'}
                                    {method === 'PUT' && '데이터 전체 수정'}
                                    {method === 'PATCH' && '데이터 일부 수정'}
                                    {method === 'DELETE' && '데이터 삭제'}
                                    {method === 'HEAD' && '헤더만 조회'}
                                    {method === 'OPTIONS' && 'CORS preflight'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📝 동적 라우트</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  return Response.json({ postId: id });
}`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            URL: <code>/api/posts/123</code><br />
                            params.id: <code>123</code>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🔍 Query Parameters</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  return Response.json({ query });
}`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            URL: <code>/api/search?q=nextjs</code><br />
                            query: <code>nextjs</code>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">💡 Route Handlers vs Server Actions</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left p-3">특성</th>
                                    <th className="text-left p-3">Route Handlers</th>
                                    <th className="text-left p-3">Server Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">용도</td>
                                    <td className="p-3">RESTful API 엔드포인트</td>
                                    <td className="p-3">폼 처리 및 mutation</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">호출 방법</td>
                                    <td className="p-3">fetch(), axios 등</td>
                                    <td className="p-3">직접 함수 호출</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="p-3 font-medium">파일 위치</td>
                                    <td className="p-3">app/api/*/route.ts</td>
                                    <td className="p-3">어디서나 (use server)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
