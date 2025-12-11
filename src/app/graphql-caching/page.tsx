'use client';

import Link from 'next/link';
import { useState } from 'react';

// GraphQL 쿼리 타입 정의
interface User {
    id: string;
    name: string;
    email: string;
    posts: Post[];
}

interface Post {
    id: string;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
}

interface Comment {
    id: string;
    text: string;
    author: User;
}

// Mock GraphQL 데이터
const mockUsers: User[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        posts: [],
    },
    {
        id: '2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        posts: [],
    },
];

const mockPosts: Post[] = [
    {
        id: '1',
        title: 'GraphQL Best Practices',
        content: 'Learn how to optimize GraphQL queries...',
        author: mockUsers[0],
        comments: [],
    },
    {
        id: '2',
        title: 'React Query Integration',
        content: 'Integrate React Query with GraphQL...',
        author: mockUsers[0],
        comments: [],
    },
];

// 캐싱 전략 시각화 컴포넌트
function CachingStrategyDemo() {
    const [activeStrategy, setActiveStrategy] = useState<'network-only' | 'cache-first' | 'cache-and-network'>('cache-first');
    const [requestLog, setRequestLog] = useState<string[]>([]);

    const simulateRequest = () => {
        const timestamp = new Date().toLocaleTimeString();
        let logMessage = '';

        switch (activeStrategy) {
            case 'network-only':
                logMessage = `[${timestamp}] 🌐 Network-only: 항상 서버에서 새 데이터 가져옴`;
                break;
            case 'cache-first':
                logMessage = `[${timestamp}] 💾 Cache-first: 캐시 확인 → 없으면 서버 요청`;
                break;
            case 'cache-and-network':
                logMessage = `[${timestamp}] 🔄 Cache-and-network: 캐시 즉시 반환 + 백그라운드 업데이트`;
                break;
        }

        setRequestLog((prev) => [logMessage, ...prev].slice(0, 10));
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                캐싱 전략 시뮬레이터
            </h2>

            {/* 전략 선택 */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    캐싱 전략 선택
                </label>
                <div className="grid grid-cols-3 gap-2">
                    <button
                        onClick={() => setActiveStrategy('network-only')}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            activeStrategy === 'network-only'
                                ? 'bg-red-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Network Only
                    </button>
                    <button
                        onClick={() => setActiveStrategy('cache-first')}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            activeStrategy === 'cache-first'
                                ? 'bg-green-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Cache First
                    </button>
                    <button
                        onClick={() => setActiveStrategy('cache-and-network')}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                            activeStrategy === 'cache-and-network'
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Cache & Network
                    </button>
                </div>
            </div>

            {/* 전략 설명 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                {activeStrategy === 'network-only' && (
                    <div>
                        <h3 className="font-semibold text-red-900 mb-2">🌐 Network Only</h3>
                        <p className="text-sm text-gray-700">
                            항상 서버에서 최신 데이터를 가져옵니다. 캐시를 사용하지 않으므로 항상 최신 데이터를 보장하지만, 네트워크 요청이 많아집니다.
                        </p>
                        <code className="block mt-2 text-xs bg-red-100 text-red-900 p-2 rounded">
                            fetchPolicy: "network-only"
                        </code>
                    </div>
                )}
                {activeStrategy === 'cache-first' && (
                    <div>
                        <h3 className="font-semibold text-green-900 mb-2">💾 Cache First</h3>
                        <p className="text-sm text-gray-700">
                            먼저 캐시를 확인하고, 없을 때만 서버에 요청합니다. 빠른 응답 속도를 제공하지만 오래된 데이터를 표시할 수 있습니다.
                        </p>
                        <code className="block mt-2 text-xs bg-green-100 text-green-900 p-2 rounded">
                            fetchPolicy: "cache-first"
                        </code>
                    </div>
                )}
                {activeStrategy === 'cache-and-network' && (
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-2">🔄 Cache & Network</h3>
                        <p className="text-sm text-gray-700">
                            캐시된 데이터를 즉시 반환한 후, 백그라운드에서 서버 데이터를 가져와 업데이트합니다. 빠른 초기 로딩과 최신 데이터를 모두 제공합니다.
                        </p>
                        <code className="block mt-2 text-xs bg-blue-100 text-blue-900 p-2 rounded">
                            fetchPolicy: "cache-and-network"
                        </code>
                    </div>
                )}
            </div>

            {/* 요청 시뮬레이션 */}
            <button
                onClick={simulateRequest}
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium mb-4"
            >
                📡 쿼리 요청 시뮬레이션
            </button>

            {/* 요청 로그 */}
            <div className="bg-gray-900 rounded-lg p-4 h-64 overflow-y-auto">
                <div className="text-green-400 font-mono text-xs space-y-1">
                    {requestLog.length === 0 ? (
                        <div className="text-gray-500">요청 로그가 여기에 표시됩니다...</div>
                    ) : (
                        requestLog.map((log, index) => (
                            <div key={index} className="opacity-${100 - index * 10}">
                                {log}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

// GraphQL 정규화 예제
function NormalizationDemo() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                데이터 정규화 (Normalization)
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* 정규화 전 */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-red-600">❌</span> 정규화 전 (중복 데이터)
                    </h3>
                    <pre className="bg-red-50 border-2 border-red-200 rounded p-4 text-xs overflow-x-auto">
{`{
  "post1": {
    "id": "1",
    "title": "GraphQL Basics",
    "author": {
      "id": "user1",
      "name": "Alice",
      "email": "alice@example.com"
    }
  },
  "post2": {
    "id": "2",
    "title": "Advanced GraphQL",
    "author": {
      "id": "user1",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
}`}
                    </pre>
                    <div className="mt-3 text-sm text-red-700">
                        ⚠️ 문제점:
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>동일한 사용자 데이터 중복 저장</li>
                            <li>메모리 낭비</li>
                            <li>데이터 일관성 문제</li>
                        </ul>
                    </div>
                </div>

                {/* 정규화 후 */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-green-600">✅</span> 정규화 후 (참조 구조)
                    </h3>
                    <pre className="bg-green-50 border-2 border-green-200 rounded p-4 text-xs overflow-x-auto">
{`{
  "User:user1": {
    "id": "user1",
    "name": "Alice",
    "email": "alice@example.com"
  },
  "Post:1": {
    "id": "1",
    "title": "GraphQL Basics",
    "author": { "__ref": "User:user1" }
  },
  "Post:2": {
    "id": "2",
    "title": "Advanced GraphQL",
    "author": { "__ref": "User:user1" }
  }
}`}
                    </pre>
                    <div className="mt-3 text-sm text-green-700">
                        ✅ 장점:
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li>사용자 데이터 1회만 저장</li>
                            <li>메모리 효율적</li>
                            <li>자동 업데이트 전파</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function GraphQLCachingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
                >
                    ← 홈으로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🔮 GraphQL + Codegen + 캐싱 전략
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    타입 안전성과 효율적인 데이터 캐싱을 위한 GraphQL 아키텍처
                </p>

                {/* 설치 안내 */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                        📦 필요한 패키지
                    </h2>
                    <pre className="bg-yellow-100 p-3 rounded text-sm text-yellow-900 mb-2 overflow-x-auto">
{`npm install @apollo/client graphql
npm install -D @graphql-codegen/cli @graphql-codegen/typescript
npm install -D @graphql-codegen/typescript-operations
npm install -D @graphql-codegen/typescript-react-apollo`}
                    </pre>
                </div>

                {/* 특징 */}
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-purple-900 mb-3">
                        ✨ GraphQL 스택의 핵심 특징
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4 text-purple-800">
                        <div>
                            <h3 className="font-semibold mb-2">GraphQL</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 필요한 데이터만 요청</li>
                                <li>• 단일 엔드포인트</li>
                                <li>• 타입 시스템 내장</li>
                                <li>• 실시간 구독</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Codegen</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• TypeScript 자동 생성</li>
                                <li>• Hook 자동 생성</li>
                                <li>• 타입 안전성 보장</li>
                                <li>• 개발자 경험 향상</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Apollo Client</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 지능형 캐싱</li>
                                <li>• 정규화된 저장소</li>
                                <li>• Optimistic UI</li>
                                <li>• DevTools 지원</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 캐싱 전략 데모 */}
                <CachingStrategyDemo />

                {/* 정규화 데모 */}
                <NormalizationDemo />

                {/* 코드 예제 1: Schema 정의 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">1️⃣ GraphQL Schema 정의</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`# schema.graphql
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  comments: [Comment!]!
  createdAt: DateTime!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
  createdAt: DateTime!
}

type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
  posts(limit: Int, offset: Int): [Post!]!
}

type Mutation {
  createPost(title: String!, content: String!): Post!
  updatePost(id: ID!, title: String, content: String): Post!
  deletePost(id: ID!): Boolean!
}

type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
}`}
                    </pre>
                </div>

                {/* 코드 예제 2: Codegen 설정 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">2️⃣ GraphQL Codegen 설정</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql', // GraphQL 서버 URL
  documents: ['src/**/*.graphql', 'src/**/*.tsx'], // 쿼리가 있는 파일
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    },
    './src/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
      config: {
        withHooks: true, // useQuery, useMutation Hook 자동 생성
        withComponent: false,
        withHOC: false,
      }
    }
  },
};

export default config;`}
                    </pre>
                    <div className="mt-4 p-3 bg-blue-900 rounded">
                        <p className="text-blue-200 text-sm mb-2">실행 명령어:</p>
                        <code className="text-white text-xs">npm run codegen</code>
                    </div>
                </div>

                {/* 코드 예제 3: Apollo Client 설정 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">3️⃣ Apollo Client 설정</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP 연결 설정
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

// 인증 헤더 추가
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? \`Bearer \${token}\` : "",
    }
  };
});

// Apollo Client 생성
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            // 페이지네이션 병합 전략
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
      Post: {
        fields: {
          comments: {
            // 댓글 병합 전략
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

// App에서 사용
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <YourApp />
    </ApolloProvider>
  );
}`}
                    </pre>
                </div>

                {/* 코드 예제 4: Query 작성 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">4️⃣ GraphQL Query 작성</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// queries/posts.graphql
query GetPosts($limit: Int, $offset: Int) {
  posts(limit: $limit, offset: $offset) {
    id
    title
    content
    createdAt
    author {
      id
      name
      email
    }
    comments {
      id
      text
      author {
        id
        name
      }
    }
  }
}

query GetPost($id: ID!) {
  post(id: $id) {
    id
    title
    content
    createdAt
    author {
      id
      name
      email
    }
  }
}

mutation CreatePost($title: String!, $content: String!) {
  createPost(title: $title, content: $content) {
    id
    title
    content
    createdAt
  }
}

// ✅ Codegen이 자동으로 생성하는 Hook:
// - useGetPostsQuery
// - useGetPostQuery
// - useCreatePostMutation`}
                    </pre>
                </div>

                {/* 코드 예제 5: Component에서 사용 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">5️⃣ 컴포넌트에서 사용</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { useGetPostsQuery, useCreatePostMutation } from './__generated__/graphql';

function PostList() {
  // ✅ 자동 생성된 Hook 사용 (타입 안전)
  const { data, loading, error, refetch } = useGetPostsQuery({
    variables: { limit: 10, offset: 0 },
    fetchPolicy: 'cache-and-network',
  });

  const [createPost, { loading: creating }] = useCreatePostMutation({
    // 캐시 업데이트 전략
    update(cache, { data: newPost }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: newPost?.createPost,
              fragment: gql\`
                fragment NewPost on Post {
                  id
                  title
                  content
                }
              \`,
            });
            return [newPostRef, ...existingPosts];
          },
        },
      });
    },
    // Optimistic Response (즉시 UI 업데이트)
    optimisticResponse: {
      createPost: {
        __typename: 'Post',
        id: 'temp-id',
        title: newTitle,
        content: newContent,
        createdAt: new Date().toISOString(),
        author: {
          __typename: 'User',
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
        },
      },
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <span>by {post.author.name}</span>
        </div>
      ))}
    </div>
  );
}`}
                    </pre>
                </div>

                {/* 코드 예제 6: 캐시 직접 조작 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">6️⃣ 캐시 직접 조작</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { useApolloClient } from '@apollo/client';

function PostActions({ postId }: { postId: string }) {
  const client = useApolloClient();

  // 1. 캐시에서 읽기
  const readCache = () => {
    const post = client.readFragment({
      id: \`Post:\${postId}\`,
      fragment: gql\`
        fragment PostData on Post {
          id
          title
          content
        }
      \`,
    });
    console.log('Cached post:', post);
  };

  // 2. 캐시에 쓰기
  const updateCache = () => {
    client.writeFragment({
      id: \`Post:\${postId}\`,
      fragment: gql\`
        fragment UpdatePost on Post {
          title
        }
      \`,
      data: {
        title: 'Updated Title',
      },
    });
  };

  // 3. 특정 쿼리 무효화
  const invalidateQuery = () => {
    client.refetchQueries({
      include: ['GetPosts'],
    });
  };

  // 4. 캐시 초기화
  const clearCache = () => {
    client.cache.reset();
  };

  // 5. 특정 필드 업데이트
  const updateField = () => {
    client.cache.modify({
      id: \`Post:\${postId}\`,
      fields: {
        title(cachedTitle) {
          return cachedTitle + ' (Updated)';
        },
      },
    });
  };

  return <div>...</div>;
}`}
                    </pre>
                </div>

                {/* 캐싱 전략 가이드 */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        📋 캐싱 전략 선택 가이드
                    </h3>
                    <div className="space-y-4">
                        <div className="border-l-4 border-green-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                cache-first (기본값)
                            </h4>
                            <p className="text-sm text-gray-700 mb-2">
                                캐시를 먼저 확인하고 없을 때만 서버 요청
                            </p>
                            <div className="text-xs text-gray-600">
                                <strong>사용 사례:</strong> 자주 변경되지 않는 데이터 (사용자 프로필, 설정)
                            </div>
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                cache-and-network
                            </h4>
                            <p className="text-sm text-gray-700 mb-2">
                                캐시 데이터 즉시 반환 + 백그라운드 서버 요청
                            </p>
                            <div className="text-xs text-gray-600">
                                <strong>사용 사례:</strong> 빠른 초기 로딩이 중요한 데이터 (피드, 게시글 목록)
                            </div>
                        </div>

                        <div className="border-l-4 border-red-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                network-only
                            </h4>
                            <p className="text-sm text-gray-700 mb-2">
                                항상 서버에서 최신 데이터 가져옴
                            </p>
                            <div className="text-xs text-gray-600">
                                <strong>사용 사례:</strong> 실시간 데이터, 금융 정보, 재고 현황
                            </div>
                        </div>

                        <div className="border-l-4 border-purple-500 pl-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                                no-cache
                            </h4>
                            <p className="text-sm text-gray-700 mb-2">
                                서버에서 가져오고 캐시에 저장하지 않음
                            </p>
                            <div className="text-xs text-gray-600">
                                <strong>사용 사례:</strong> 일회성 데이터, 민감한 정보
                            </div>
                        </div>
                    </div>
                </div>

                {/* 장단점 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">✅ 장점</h3>
                        <ul className="space-y-2 text-green-800">
                            <li>• <strong>타입 안전성</strong>: Codegen으로 완벽한 타입 추론</li>
                            <li>• <strong>효율적 캐싱</strong>: 정규화된 캐시로 중복 제거</li>
                            <li>• <strong>개발자 경험</strong>: Hook 자동 생성</li>
                            <li>• <strong>Optimistic UI</strong>: 즉각적인 사용자 피드백</li>
                            <li>• <strong>단일 엔드포인트</strong>: 복잡도 감소</li>
                            <li>• <strong>Over-fetching 방지</strong>: 필요한 데이터만 요청</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-red-800">
                            <li>• <strong>초기 설정</strong>: 러닝 커브 존재</li>
                            <li>• <strong>번들 크기</strong>: Apollo Client ~130KB</li>
                            <li>• <strong>캐시 복잡도</strong>: 정규화 이해 필요</li>
                            <li>• <strong>N+1 문제</strong>: 서버 측 DataLoader 필요</li>
                            <li>• <strong>파일 업로드</strong>: 별도 처리 필요</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
