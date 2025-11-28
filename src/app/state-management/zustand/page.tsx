'use client';

import Link from 'next/link';
import { useState } from 'react';

// Zustand Store 정의 (패키지 설치 후 사용)
// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// 패키지 설치 후 주석 해제
// interface TodoStore {
//     todos: Todo[];
//     addTodo: (text: string) => void;
//     toggleTodo: (id: number) => void;
//     removeTodo: (id: number) => void;
//     filter: 'all' | 'active' | 'completed';
//     setFilter: (filter: 'all' | 'active' | 'completed') => void;
// }

// const useTodoStore = create<TodoStore>()(
//     devtools(
//         persist(
//             (set) => ({
//                 todos: [],
//                 filter: 'all',
//                 addTodo: (text) =>
//                     set((state) => ({
//                         todos: [...state.todos, { id: Date.now(), text, completed: false }],
//                     })),
//                 toggleTodo: (id) =>
//                     set((state) => ({
//                         todos: state.todos.map((todo) =>
//                             todo.id === id ? { ...todo, completed: !todo.completed } : todo
//                         ),
//                     })),
//                 removeTodo: (id) =>
//                     set((state) => ({
//                         todos: state.todos.filter((todo) => todo.id !== id),
//                     })),
//                 setFilter: (filter) => set({ filter }),
//             }),
//             { name: 'zustand-todos' }
//         )
//     )
// );

// 임시 로컬 상태로 데모 구현
export default function ZustandExample() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

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
        <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/state-management"
                    className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6"
                >
                    ← 상태 관리 비교로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🐻 Zustand 예제
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    간단하고 직관적인 상태 관리 라이브러리
                </p>

                {/* 설치 안내 */}
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-yellow-900 mb-2">
                        📦 패키지 설치 필요
                    </h2>
                    <pre className="bg-yellow-100 p-3 rounded text-sm text-yellow-900 mb-2">
                        npm install zustand
                    </pre>
                    <p className="text-yellow-800 text-sm">
                        현재는 로컬 상태로 구현되어 있습니다. 패키지 설치 후 코드 주석을 해제하세요.
                    </p>
                </div>

                {/* 특징 */}
                <div className="bg-purple-50 border-l-4 border-purple-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-purple-900 mb-3">
                        ✨ Zustand의 핵심 특징
                    </h2>
                    <ul className="space-y-2 text-purple-800">
                        <li>• <strong>Provider 불필요</strong>: 별도의 Provider 래핑 없이 바로 사용</li>
                        <li>• <strong>간단한 API</strong>: create 함수로 스토어 생성</li>
                        <li>• <strong>미들웨어 지원</strong>: devtools, persist 등 내장</li>
                        <li>• <strong>작은 번들</strong>: ~3KB (gzipped)</li>
                        <li>• <strong>React 외부 사용</strong>: 컴포넌트 밖에서도 스토어 접근 가능</li>
                    </ul>
                </div>

                {/* Todo App */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        📝 Todo App 데모
                    </h2>

                    {/* 입력 폼 */}
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="새로운 할 일을 입력하세요..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                                        ? 'bg-purple-600 text-white'
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
                            <p className="text-gray-500 text-center py-8">
                                할 일이 없습니다
                            </p>
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
                                        className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
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

                    {/* 통계 */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-purple-600">
                                    {todos.length}
                                </div>
                                <div className="text-sm text-gray-600">전체</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {todos.filter((t) => !t.completed).length}
                                </div>
                                <div className="text-sm text-gray-600">진행 중</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {todos.filter((t) => t.completed).length}
                                </div>
                                <div className="text-sm text-gray-600">완료</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 코드 예제 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">💻 코드 예제</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// Zustand Store 정의
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set) => ({
        todos: [],
        addTodo: (text) =>
          set((state) => ({
            todos: [...state.todos, 
              { id: Date.now(), text, completed: false }
            ],
          })),
        toggleTodo: (id) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id 
                ? { ...todo, completed: !todo.completed } 
                : todo
            ),
          })),
        removeTodo: (id) =>
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          })),
      }),
      { name: 'zustand-todos' }
    )
  )
);

// 컴포넌트에서 사용
function TodoList() {
  const { todos, addTodo, toggleTodo } = useTodoStore();
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </div>
      ))}
    </div>
  );
}`}
                    </pre>
                </div>

                {/* 장단점 */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-green-900 mb-3">✅ 장점</h3>
                        <ul className="space-y-2 text-green-800">
                            <li>• 매우 간단한 API와 러닝 커브</li>
                            <li>• Provider 래핑 불필요</li>
                            <li>• 작은 번들 사이즈 (~3KB)</li>
                            <li>• TypeScript 완벽 지원</li>
                            <li>• 미들웨어 시스템 (devtools, persist)</li>
                            <li>• React 외부에서도 사용 가능</li>
                        </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ 단점</h3>
                        <ul className="space-y-2 text-red-800">
                            <li>• 비동기 처리는 수동으로 구현</li>
                            <li>• 파생 상태는 수동으로 계산</li>
                            <li>• Recoil/Jotai보다 React 통합이 덜 긴밀함</li>
                            <li>• 큰 프로젝트에서는 구조화 필요</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
