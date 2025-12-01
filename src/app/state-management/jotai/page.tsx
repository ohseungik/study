'use client';

import Link from 'next/link';
import { useState } from 'react';

// Jotai Atoms 정의 (패키지 설치 후 사용)
// import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
// import { atomWithStorage } from 'jotai/utils';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// 패키지 설치 후 주석 해제
// const todosAtom = atomWithStorage<Todo[]>('jotai-todos', []);

// const filterAtom = atom<'all' | 'active' | 'completed'>('all');

// const filteredTodosAtom = atom((get) => {
//   const todos = get(todosAtom);
//   const filter = get(filterAtom);

//   if (filter === 'active') return todos.filter(t => !t.completed);
//   if (filter === 'completed') return todos.filter(t => t.completed);
//   return todos;
// });

// const todoStatsAtom = atom((get) => {
//   const todos = get(todosAtom);
//   return {
//     total: todos.length,
//     completed: todos.filter(t => t.completed).length,
//     active: todos.filter(t => !t.completed).length,
//   };
// });

// 임시 로컬 상태로 데모 구현
function TodoApp() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    const stats = {
        total: todos.length,
        completed: todos.filter((t) => t.completed).length,
        active: todos.filter((t) => !t.completed).length,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
            setInputValue('');
        }
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const removeTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 Todo App 데모</h2>

            {/* 입력 폼 */}
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="새로운 할 일을 입력하세요..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        추가
                    </button>
                </div>
            </form>

            {/* 필터 */}
            <div className="flex gap-2 mb-6">
                {(['all', 'active', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                            filter === f
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {f === 'all' ? '전체' : f === 'active' ? '진행 중' : '완료'}
                    </button>
                ))}
            </div>

            {/* Todo 리스트 */}
            <div className="space-y-2">
                {filteredTodos.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">할 일이 없습니다</p>
                ) : (
                    filteredTodos.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className="w-5 h-5 text-emerald-600 rounded focus:ring-2 focus:ring-emerald-500"
                            />
                            <span
                                className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => removeTodo(todo.id)}
                                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                                삭제
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* 통계 (파생 atom) */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    📊 통계 (파생 Atom으로 계산됨)
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-emerald-600">
                            {stats.total}
                        </div>
                        <div className="text-sm text-gray-600">전체</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.active}
                        </div>
                        <div className="text-sm text-gray-600">진행 중</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.completed}
                        </div>
                        <div className="text-sm text-gray-600">완료</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JotaiExample() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/state-management"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
                >
                    ← 상태 관리 비교로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">👻 Jotai 예제</h1>
                <p className="text-xl text-gray-600 mb-8">
                    원시적이고 유연한 React 상태 관리
                </p>

                {/* 설치 안내 */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                        📦 패키지 설치 필요
                    </h2>
                    <pre className="bg-yellow-100 p-3 rounded text-sm text-yellow-900 mb-2">
                        npm install jotai
                    </pre>
                    <p className="text-yellow-800 text-sm">
                        현재는 로컬 상태로 구현되어 있습니다. 패키지 설치 후 코드 주석을 해제하세요.
                    </p>
                </div>

                {/* 특징 */}
                <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-emerald-900 mb-3">
                        ✨ Jotai의 핵심 특징
                    </h2>
                    <ul className="space-y-2 text-emerald-800">
                        <li>
                            • <strong>원시적 Atom</strong>: 최소 단위의 상태 관리
                        </li>
                        <li>
                            • <strong>Bottom-up 접근</strong>: 필요한 곳에서 Atom 조합
                        </li>
                        <li>
                            • <strong>TypeScript 최적화</strong>: 타입 추론 자동화
                        </li>
                        <li>
                            • <strong>작은 번들</strong>: ~3KB (Zustand와 유사)
                        </li>
                        <li>
                            • <strong>유틸리티 풍부</strong>: atomWithStorage, atomFamily 등
                        </li>
                        <li>
                            • <strong>React Suspense</strong>: 비동기 처리 완벽 지원
                        </li>
                    </ul>
                </div>

                {/* Todo App */}
                <TodoApp />

                {/* 코드 예제 - 기본 Atom */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                        💻 기본 Atom 정의
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { atom, useAtom } from 'jotai';

// 원시 atom (primitive)
const todosAtom = atom<Todo[]>([]);
const filterAtom = atom<'all' | 'active' | 'completed'>('all');

// 파생 atom (derived) - 읽기 전용
const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom);
  const filter = get(filterAtom);

  if (filter === 'active') return todos.filter(t => !t.completed);
  if (filter === 'completed') return todos.filter(t => t.completed);
  return todos;
});

// 통계 atom (읽기 전용)
const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom);
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  };
});

// 컴포넌트에서 사용
function TodoList() {
  const [todos, setTodos] = useAtom(todosAtom);
  const filteredTodos = useAtomValue(filteredTodosAtom);
  
  return <div>...</div>;
}`}
                    </pre>
                </div>

                {/* 코드 예제 - Write Atom */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                        ✍️ Write Atom (액션 패턴)
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { atom, useSetAtom } from 'jotai';

// 읽기/쓰기 atom
const addTodoAtom = atom(
  null, // 읽기는 사용 안 함
  (get, set, text: string) => {
    const todos = get(todosAtom);
    set(todosAtom, [
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  }
);

const toggleTodoAtom = atom(
  null,
  (get, set, id: number) => {
    const todos = get(todosAtom);
    set(
      todosAtom,
      todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  }
);

// 컴포넌트에서 사용 (리렌더링 없음)
function TodoInput() {
  const addTodo = useSetAtom(addTodoAtom);
  
  const handleSubmit = (text: string) => {
    addTodo(text);
  };
  
  return <form onSubmit={...}>...</form>;
}`}
                    </pre>
                </div>

                {/* 코드 예제 - 유틸리티 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                        🛠️ 유틸리티 Atom
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { atomWithStorage, atomFamily, selectAtom } from 'jotai/utils';

// localStorage 동기화
const todosAtom = atomWithStorage<Todo[]>('jotai-todos', []);

// 동적 atom 생성 (ID별 캐싱)
const userAtomFamily = atomFamily((userId: number) =>
  atom(async () => {
    const res = await fetch(\`/api/users/\${userId}\`);
    return res.json();
  })
);

// 특정 필드만 구독
const userNameAtom = selectAtom(
  userAtom,
  (user) => user.name
);

// 컴포넌트에서 사용
function UserProfile({ userId }: { userId: number }) {
  const [user] = useAtom(userAtomFamily(userId));
  return <div>{user.name}</div>;
}`}
                    </pre>
                </div>

                {/* 비동기 Atom */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                        🌐 비동기 Atom (Suspense)
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { atom, useAtomValue } from 'jotai';
import { Suspense } from 'react';

// 비동기 atom
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// 의존적인 비동기 atom
const userPostsAtom = atom(async (get) => {
  const user = await get(userAtom);
  const response = await fetch(\`/api/users/\${user.id}/posts\`);
  return response.json();
});

// Suspense와 함께 사용
function UserPosts() {
  const posts = useAtomValue(userPostsAtom);
  
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPosts />
    </Suspense>
  );
}`}
                    </pre>
                </div>

                {/* Zustand vs Jotai 비교 */}
                <div className="bg-gradient-to-r from-purple-50 to-emerald-50 border-2 border-emerald-200 rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                        🤔 Zustand vs Jotai
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-semibold text-purple-900 mb-2">Zustand</h4>
                            <ul className="space-y-1 text-purple-800">
                                <li>• Redux 스타일 (중앙 스토어)</li>
                                <li>• 액션 함수 내장</li>
                                <li>• Provider 불필요</li>
                                <li>• React 외부에서도 사용</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-900 mb-2">Jotai</h4>
                            <ul className="space-y-1 text-emerald-800">
                                <li>• Recoil 스타일 (Atom)</li>
                                <li>• Write Atom으로 액션 정의</li>
                                <li>• Provider 선택적</li>
                                <li>• React에 최적화</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 장단점 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">✅ 장점</h3>
                        <ul className="space-y-2 text-green-800">
                            <li>• 매우 작은 번들 사이즈 (~3KB)</li>
                            <li>• TypeScript 타입 추론 우수</li>
                            <li>• 원시적이고 유연한 API</li>
                            <li>• React Suspense 완벽 지원</li>
                            <li>• 풍부한 유틸리티 (atomWithStorage 등)</li>
                            <li>• 세밀한 리렌더링 최적화</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ 단점</h3>
                        <ul className="space-y-2 text-red-800">
                            <li>• 러닝 커브 (Atom 패턴 이해 필요)</li>
                            <li>• 액션 패턴이 Zustand보다 복잡</li>
                            <li>• DevTools 제한적</li>
                            <li>• 커뮤니티가 Recoil보다 작음</li>
                            <li>• React에만 사용 가능</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
