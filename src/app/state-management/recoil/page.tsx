'use client';

import Link from 'next/link';
import { useState } from 'react';

// Recoil Atoms/Selectors 정의 (패키지 설치 후 사용)
// import { 
//   RecoilRoot,
//   atom,
//   selector,
//   useRecoilState,
//   useRecoilValue,
// } from 'recoil';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// 패키지 설치 후 주석 해제
// const todoListState = atom<Todo[]>({
//   key: 'todoListState',
//   default: [],
// });

// const todoListFilterState = atom<'all' | 'active' | 'completed'>({
//   key: 'todoListFilterState',
//   default: 'all',
// });

// const filteredTodoListState = selector({
//   key: 'filteredTodoListState',
//   get: ({ get }) => {
//     const filter = get(todoListFilterState);
//     const list = get(todoListState);

//     switch (filter) {
//       case 'completed':
//         return list.filter((item) => item.completed);
//       case 'active':
//         return list.filter((item) => !item.completed);
//       default:
//         return list;
//     }
//   },
// });

// const todoListStatsState = selector({
//   key: 'todoListStatsState',
//   get: ({ get }) => {
//     const todoList = get(todoListState);
//     const totalNum = todoList.length;
//     const completedNum = todoList.filter((item) => item.completed).length;
//     const activeNum = totalNum - completedNum;

//     return {
//       totalNum,
//       completedNum,
//       activeNum,
//     };
//   },
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
        totalNum: todos.length,
        completedNum: todos.filter((t) => t.completed).length,
        activeNum: todos.filter((t) => !t.completed).length,
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
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                                ? 'bg-blue-600 text-white'
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
                                className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
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

            {/* 통계 (Selector 데모) */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    📊 통계 (Selector로 계산됨)
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.totalNum}
                        </div>
                        <div className="text-sm text-gray-600">전체</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.activeNum}
                        </div>
                        <div className="text-sm text-gray-600">진행 중</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.completedNum}
                        </div>
                        <div className="text-sm text-gray-600">완료</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RecoilExample() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/state-management"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
                >
                    ← 상태 관리 비교로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">⚛️ Recoil 예제</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Facebook의 React 상태 관리 라이브러리
                </p>

                {/* 설치 안내 */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                        📦 패키지 설치 필요
                    </h2>
                    <pre className="bg-yellow-100 p-3 rounded text-sm text-yellow-900 mb-2">
                        npm install recoil
                    </pre>
                    <p className="text-yellow-800 text-sm">
                        현재는 로컬 상태로 구현되어 있습니다. 패키지 설치 후 코드 주석을 해제하세요.
                    </p>
                </div>

                {/* 특징 */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-blue-900 mb-3">
                        ✨ Recoil의 핵심 특징
                    </h2>
                    <ul className="space-y-2 text-blue-800">
                        <li>
                            • <strong>Atom 패턴</strong>: 독립적인 상태 단위로 세밀한 구독
                        </li>
                        <li>
                            • <strong>Selector</strong>: 파생 상태와 비동기 쿼리 지원
                        </li>
                        <li>
                            • <strong>React Concurrent 지원</strong>: Suspense와 완벽 통합
                        </li>
                        <li>
                            • <strong>Atom Effects</strong>: 상태 동기화와 부수 효과 처리
                        </li>
                        <li>
                            • <strong>Time Travel Debugging</strong>: 상태 히스토리 추적
                        </li>
                    </ul>
                </div>

                {/* Todo App */}
                <TodoApp />

                {/* 코드 예제 - Atom */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                        💻 Atom 정의 (기본 상태)
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { atom } from 'recoil';

// Todo 리스트 상태
const todoListState = atom<Todo[]>({
  key: 'todoListState', // 유니크한 ID
  default: [], // 기본값
});

// 필터 상태
const todoListFilterState = atom<'all' | 'active' | 'completed'>({
  key: 'todoListFilterState',
  default: 'all',
});

// 컴포넌트에서 사용
function TodoList() {
  const [todos, setTodos] = useRecoilState(todoListState);
  
  const addTodo = (text: string) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text, 
      completed: false 
    }]);
  };
  
  return <div>...</div>;
}`}
                    </pre>
                </div>

                {/* 코드 예제 - Selector */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">
                        🔄 Selector (파생 상태)
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { selector } from 'recoil';

// 필터링된 Todo 리스트 (파생 상태)
const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case 'completed':
        return list.filter((item) => item.completed);
      case 'active':
        return list.filter((item) => !item.completed);
      default:
        return list;
    }
  },
});

// 통계 (파생 상태)
const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const completedNum = todoList.filter((item) => item.completed).length;
    const activeNum = totalNum - completedNum;

    return { totalNum, completedNum, activeNum };
  },
});

// 컴포넌트에서 사용
function TodoStats() {
  const stats = useRecoilValue(todoListStatsState);
  
  return (
    <div>
      <div>전체: {stats.totalNum}</div>
      <div>완료: {stats.completedNum}</div>
      <div>진행 중: {stats.activeNum}</div>
    </div>
  );
}`}
                    </pre>
                </div>

                {/* 비동기 Selector */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">
                        🌐 비동기 Selector (API 호출)
                    </h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`import { selector, useRecoilValue } from 'recoil';

// 사용자 정보 비동기 조회
const userInfoQuery = selector({
  key: 'userInfoQuery',
  get: async ({ get }) => {
    const userId = get(currentUserIdState);
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.json();
  },
});

// Suspense와 함께 사용
function UserInfo() {
  const userInfo = useRecoilValue(userInfoQuery);
  
  return (
    <div>
      <h2>{userInfo.name}</h2>
      <p>{userInfo.email}</p>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <UserInfo />
      </Suspense>
    </RecoilRoot>
  );
}`}
                    </pre>
                </div>

                {/* 장단점 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">✅ 장점</h3>
                        <ul className="space-y-2 text-green-800">
                            <li>• Selector를 통한 파생 상태 자동 계산</li>
                            <li>• 비동기 처리 내장 (Suspense 지원)</li>
                            <li>• 세밀한 리렌더링 최적화</li>
                            <li>• React Concurrent Mode 완벽 지원</li>
                            <li>• Atom Effects로 부수 효과 관리</li>
                            <li>• Time Travel Debugging</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ 단점</h3>
                        <ul className="space-y-2 text-red-800">
                            <li>• 큰 번들 사이즈 (~21KB)</li>
                            <li>• RecoilRoot Provider 필요</li>
                            <li>• Key 관리 필요 (충돌 방지)</li>
                            <li>• 실험적인 API 일부 포함</li>
                            <li>• React에만 사용 가능</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
