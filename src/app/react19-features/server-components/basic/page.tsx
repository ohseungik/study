/**
 * 기본 Server Component 예제 - 서버에서 데이터를 페칭하고 렌더링
 */

import Link from 'next/link';

// 서버에서만 실행되는 데이터 페칭 함수들
async function fetchUserData(id: number) {
    // 실제 환경에서는 데이터베이스나 API 호출
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = [
        { id: 1, name: '김철수', email: 'kim@example.com', role: 'admin', posts: 15, followers: 120 },
        { id: 2, name: '이영희', email: 'lee@example.com', role: 'user', posts: 8, followers: 45 },
        { id: 3, name: '박민수', email: 'park@example.com', role: 'editor', posts: 23, followers: 89 },
    ];
    
    return users.find(user => user.id === id) || users[0];
}

async function fetchWeatherData() {
    // 실제로는 날씨 API 호출
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
        city: '서울',
        temperature: 22,
        condition: '맑음',
        humidity: 65,
        windSpeed: 5,
    };
}

async function fetchRecentPosts() {
    // 실제로는 데이터베이스에서 포스트 조회
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return [
        {
            id: 1,
            title: 'React 19 Server Components 완벽 가이드',
            content: 'Server Components는 서버에서 렌더링되어 성능을 크게 향상시킵니다...',
            author: '김철수',
            createdAt: new Date('2024-01-15'),
            views: 1250,
            likes: 89,
        },
        {
            id: 2,
            title: 'Next.js 15 새로운 기능들',
            content: 'Next.js 15에서 추가된 혁신적인 기능들을 살펴보겠습니다...',
            author: '이영희',
            createdAt: new Date('2024-01-12'),
            views: 890,
            likes: 67,
        },
        {
            id: 3,
            title: 'TypeScript와 함께하는 모던 개발',
            content: 'TypeScript를 활용한 안전하고 효율적인 개발 방법론...',
            author: '박민수',
            createdAt: new Date('2024-01-10'),
            views: 2100,
            likes: 156,
        },
    ];
}

async function fetchServerStats() {
    // 서버 통계 정보 (실제로는 시스템 메트릭 조회)
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
        serverTime: new Date().toISOString(),
        buildTime: '2024-01-16T09:30:00.000Z',
        nextVersion: '15.0.0',
        nodeVersion: process.version,
        uptime: Math.floor(Math.random() * 86400), // 초 단위
    };
}

// Server Component: 사용자 프로필 카드
async function UserProfileCard({ userId }: { userId: number }) {
    const user = await fetchUserData(userId);
    
    return (
        <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {user.name[0]}
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : user.role === 'editor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                    }`}>
                        {user.role.toUpperCase()}
                    </span>
                </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-lg">{user.posts}</div>
                    <div className="text-gray-600">게시물</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded">
                    <div className="font-semibold text-lg">{user.followers}</div>
                    <div className="text-gray-600">팔로워</div>
                </div>
            </div>
        </div>
    );
}

// Server Component: 날씨 위젯
async function WeatherWidget() {
    const weather = await fetchWeatherData();
    
    return (
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">🌤️ 현재 날씨</h3>
            <div className="flex justify-between items-center">
                <div>
                    <div className="text-2xl font-bold">{weather.temperature}°C</div>
                    <div className="text-blue-100">{weather.city}</div>
                </div>
                <div className="text-right">
                    <div className="text-lg">{weather.condition}</div>
                    <div className="text-sm text-blue-100">
                        습도 {weather.humidity}% · 바람 {weather.windSpeed}m/s
                    </div>
                </div>
            </div>
        </div>
    );
}

// Server Component: 최근 포스트 목록
async function RecentPostsList() {
    const posts = await fetchRecentPosts();
    
    return (
        <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">📝 최근 포스트</h3>
            </div>
            <div className="divide-y">
                {posts.map((post) => (
                    <div key={post.id} className="p-6">
                        <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.content}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>👤 {post.author}</span>
                                <span>👀 {post.views.toLocaleString()}</span>
                                <span>❤️ {post.likes}</span>
                            </div>
                            <span>{post.createdAt.toLocaleDateString('ko-KR')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Server Component: 서버 정보
async function ServerInfo() {
    const stats = await fetchServerStats();
    
    const formatUptime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}시간 ${minutes}분`;
    };
    
    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">🖥️ 서버 정보</h3>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">서버 시간:</span>
                    <span className="font-mono">{new Date(stats.serverTime).toLocaleString('ko-KR')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">빌드 시간:</span>
                    <span className="font-mono">{new Date(stats.buildTime).toLocaleString('ko-KR')}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Next.js 버전:</span>
                    <span className="font-mono">{stats.nextVersion}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Node.js 버전:</span>
                    <span className="font-mono">{stats.nodeVersion}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">서버 가동 시간:</span>
                    <span className="font-mono">{formatUptime(stats.uptime)}</span>
                </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-50 rounded border border-green-200">
                <p className="text-green-800 text-xs">
                    ✅ 이 정보는 서버에서 생성되어 클라이언트로 전송된 HTML에 포함되어 있습니다.
                    페이지 소스 보기를 통해 확인할 수 있습니다!
                </p>
            </div>
        </div>
    );
}

export default async function BasicServerComponentPage() {
    // 여러 데이터를 병렬로 페칭 (서버에서만 가능)
    const [userPromise, weatherPromise, postsPromise, statsPromise] = await Promise.allSettled([
        fetchUserData(1),
        fetchWeatherData(),
        fetchRecentPosts(),
        fetchServerStats(),
    ]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">기본 Server Component 예제</h1>
                <Link href="/react19-features/server-components" className="text-blue-600 hover:text-blue-800">
                    ← Server Components 예제로 돌아가기
                </Link>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🎯 핵심 포인트</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>• <strong>서버 실행:</strong> 모든 데이터 페칭과 렌더링이 서버에서 완료</li>
                    <li>• <strong>0KB 번들:</strong> 서버 컴포넌트 코드는 클라이언트로 전송되지 않음</li>
                    <li>• <strong>직접 접근:</strong> 데이터베이스, 파일 시스템, 환경 변수 등 서버 리소스 사용</li>
                    <li>• <strong>SEO 친화적:</strong> 완전한 HTML이 검색 엔진에 제공됨</li>
                </ul>
            </div>

            {/* 대시보드 레이아웃 */}
            <div className="grid gap-6 lg:grid-cols-12">
                {/* 왼쪽 사이드바 */}
                <div className="lg:col-span-4 space-y-6">
                    <UserProfileCard userId={1} />
                    <WeatherWidget />
                    <ServerInfo />
                </div>
                
                {/* 메인 콘텐츠 */}
                <div className="lg:col-span-8">
                    <RecentPostsList />
                </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">⚡ 성능 장점</h3>
                    <ul className="text-blue-800 text-sm space-y-2">
                        <li>• <strong>번들 크기 감소:</strong> 서버 컴포넌트는 클라이언트 번들에 포함되지 않음</li>
                        <li>• <strong>빠른 초기 로드:</strong> HTML이 서버에서 완성되어 전송</li>
                        <li>• <strong>캐싱 효율성:</strong> 서버에서 렌더링된 결과를 캐시 가능</li>
                        <li>• <strong>네트워크 최적화:</strong> 클라이언트에서 추가 API 요청 불필요</li>
                    </ul>
                </div>
                
                <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-semibold text-green-900 mb-3">🔒 보안 장점</h3>
                    <ul className="text-green-800 text-sm space-y-2">
                        <li>• <strong>API 키 보호:</strong> 서버에서만 사용, 클라이언트에 노출되지 않음</li>
                        <li>• <strong>데이터베이스 직접 접근:</strong> 중간 API 레이어 불필요</li>
                        <li>• <strong>민감한 로직:</strong> 비즈니스 로직이 서버에서만 실행</li>
                        <li>• <strong>환경 변수:</strong> 서버 환경 변수 안전하게 사용</li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 Server Component 특징</h4>
                <pre className="text-sm text-yellow-800 overflow-x-auto">
{`// ✅ Server Component에서 가능한 것들
export default async function ServerComponent() {
    // 1. async/await 직접 사용
    const data = await fetchFromDatabase();
    
    // 2. 서버 전용 라이브러리 사용
    const fs = require('fs');
    const file = fs.readFileSync('server-file.txt');
    
    // 3. 환경 변수 직접 접근
    const apiKey = process.env.SECRET_API_KEY;
    
    // 4. 병렬 데이터 페칭
    const [users, posts] = await Promise.all([
        fetchUsers(),
        fetchPosts()
    ]);
    
    return <div>{data.title}</div>;
}

// ❌ Server Component에서 불가능한 것들
// - useState, useEffect 등 React Hook 사용
// - onClick 등 이벤트 핸들러
// - 브라우저 전용 API (localStorage, window 등)
// - 클라이언트 상태 관리`}
                </pre>
            </div>
        </div>
    );
}