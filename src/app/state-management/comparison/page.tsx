'use client';

import Link from 'next/link';

export default function ComparisonPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/state-management"
                    className="inline-flex items-center text-gray-600 hover:text-gray-700 mb-6"
                >
                    ← 상태 관리 비교로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    🔍 라이브러리 상세 비교
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    동일한 기능을 3가지 라이브러리로 구현한 코드 비교
                </p>

                {/* 1. 기본 상태 정의 비교 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        1️⃣ 기본 상태 정의
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Zustand */}
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                            <h3 className="font-bold text-purple-900 mb-2">🐻 Zustand</h3>
                            <pre className="bg-purple-900 text-purple-100 p-3 rounded text-xs overflow-x-auto">
{`import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => 
    set((state) => ({ 
      count: state.count + 1 
    })),
}));

// 사용
const count = useStore(
  (state) => state.count
);`}
                            </pre>
                        </div>

                        {/* Recoil */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-900 mb-2">⚛️ Recoil</h3>
                            <pre className="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto">
{`import { atom } from 'recoil';

const countState = atom({
  key: 'countState',
  default: 0,
});

// 사용
const [count, setCount] = 
  useRecoilState(countState);
  
setCount(count + 1);`}
                            </pre>
                        </div>

                        {/* Jotai */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
                            <h3 className="font-bold text-emerald-900 mb-2">👻 Jotai</h3>
                            <pre className="bg-emerald-900 text-emerald-100 p-3 rounded text-xs overflow-x-auto">
{`import { atom } from 'jotai';

const countAtom = atom(0);

// 사용
const [count, setCount] = 
  useAtom(countAtom);
  
setCount(count + 1);`}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* 2. 파생 상태 비교 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        2️⃣ 파생 상태 (Derived State)
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Zustand */}
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                            <h3 className="font-bold text-purple-900 mb-2">🐻 Zustand</h3>
                            <pre className="bg-purple-900 text-purple-100 p-3 rounded text-xs overflow-x-auto">
{`const useStore = create((set) => ({
  todos: [],
  // 수동으로 계산
}));

// 컴포넌트에서 계산
const completedCount = 
  useStore(state => 
    state.todos.filter(
      t => t.completed
    ).length
  );`}
                            </pre>
                            <p className="text-xs text-purple-800 mt-2">
                                ⚠️ 수동 계산 필요 (useMemo 권장)
                            </p>
                        </div>

                        {/* Recoil */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-900 mb-2">⚛️ Recoil</h3>
                            <pre className="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto">
{`const completedCountState = 
  selector({
    key: 'completedCount',
    get: ({ get }) => {
      const todos = 
        get(todosState);
      return todos.filter(
        t => t.completed
      ).length;
    },
  });

// 자동 메모이제이션
const count = useRecoilValue(
  completedCountState
);`}
                            </pre>
                            <p className="text-xs text-blue-800 mt-2">
                                ✅ Selector로 자동 계산
                            </p>
                        </div>

                        {/* Jotai */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
                            <h3 className="font-bold text-emerald-900 mb-2">👻 Jotai</h3>
                            <pre className="bg-emerald-900 text-emerald-100 p-3 rounded text-xs overflow-x-auto">
{`const completedCountAtom = 
  atom((get) => {
    const todos = 
      get(todosAtom);
    return todos.filter(
      t => t.completed
    ).length;
  });

// 자동 메모이제이션
const count = useAtomValue(
  completedCountAtom
);`}
                            </pre>
                            <p className="text-xs text-emerald-800 mt-2">
                                ✅ 파생 Atom으로 자동 계산
                            </p>
                        </div>
                    </div>
                </section>

                {/* 3. 비동기 처리 비교 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        3️⃣ 비동기 데이터 로딩
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Zustand */}
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                            <h3 className="font-bold text-purple-900 mb-2">🐻 Zustand</h3>
                            <pre className="bg-purple-900 text-purple-100 p-3 rounded text-xs overflow-x-auto">
{`const useStore = create((set) => ({
  user: null,
  loading: false,
  fetchUser: async (id) => {
    set({ loading: true });
    const res = await fetch(
      \`/api/users/\${id}\`
    );
    const user = await res.json();
    set({ 
      user, 
      loading: false 
    });
  },
}));`}
                            </pre>
                            <p className="text-xs text-purple-800 mt-2">
                                ⚠️ 로딩/에러 상태 수동 관리
                            </p>
                        </div>

                        {/* Recoil */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-900 mb-2">⚛️ Recoil</h3>
                            <pre className="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto">
{`const userQuery = selector({
  key: 'userQuery',
  get: async ({ get }) => {
    const userId = 
      get(userIdState);
    const res = await fetch(
      \`/api/users/\${userId}\`
    );
    return res.json();
  },
});

// Suspense와 함께
<Suspense fallback="Loading">
  <UserComponent />
</Suspense>`}
                            </pre>
                            <p className="text-xs text-blue-800 mt-2">
                                ✅ Suspense 완벽 지원
                            </p>
                        </div>

                        {/* Jotai */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
                            <h3 className="font-bold text-emerald-900 mb-2">👻 Jotai</h3>
                            <pre className="bg-emerald-900 text-emerald-100 p-3 rounded text-xs overflow-x-auto">
{`const userAtom = atom(
  async (get) => {
    const userId = 
      get(userIdAtom);
    const res = await fetch(
      \`/api/users/\${userId}\`
    );
    return res.json();
  }
);

// Suspense와 함께
<Suspense fallback="Loading">
  <UserComponent />
</Suspense>`}
                            </pre>
                            <p className="text-xs text-emerald-800 mt-2">
                                ✅ Suspense 완벽 지원
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. 미들웨어/유틸리티 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        4️⃣ 미들웨어 & 유틸리티
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Zustand */}
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                            <h3 className="font-bold text-purple-900 mb-2">🐻 Zustand</h3>
                            <pre className="bg-purple-900 text-purple-100 p-3 rounded text-xs overflow-x-auto">
{`import { 
  devtools, 
  persist 
} from 'zustand/middleware';

const useStore = create()(
  devtools(
    persist(
      (set) => ({
        todos: [],
      }),
      { name: 'todos' }
    )
  )
);`}
                            </pre>
                            <ul className="text-xs text-purple-800 mt-2 space-y-1">
                                <li>✅ devtools</li>
                                <li>✅ persist</li>
                                <li>✅ immer</li>
                                <li>✅ subscribeWithSelector</li>
                            </ul>
                        </div>

                        {/* Recoil */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-900 mb-2">⚛️ Recoil</h3>
                            <pre className="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto">
{`const todosState = atom({
  key: 'todos',
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      // localStorage 동기화
      const saved = 
        localStorage.getItem('todos');
      if (saved) {
        setSelf(JSON.parse(saved));
      }
      onSet((newValue) => {
        localStorage.setItem(
          'todos', 
          JSON.stringify(newValue)
        );
      });
    },
  ],
});`}
                            </pre>
                            <ul className="text-xs text-blue-800 mt-2 space-y-1">
                                <li>✅ Atom Effects</li>
                                <li>✅ DevTools</li>
                                <li>✅ Time Travel</li>
                            </ul>
                        </div>

                        {/* Jotai */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
                            <h3 className="font-bold text-emerald-900 mb-2">👻 Jotai</h3>
                            <pre className="bg-emerald-900 text-emerald-100 p-3 rounded text-xs overflow-x-auto">
{`import { 
  atomWithStorage,
  atomFamily,
  selectAtom,
} from 'jotai/utils';

const todosAtom = 
  atomWithStorage(
    'todos', 
    []
  );

const userFamily = 
  atomFamily((id) =>
    atom(async () => {
      const res = await fetch(
        \`/api/users/\${id}\`
      );
      return res.json();
    })
  );`}
                            </pre>
                            <ul className="text-xs text-emerald-800 mt-2 space-y-1">
                                <li>✅ atomWithStorage</li>
                                <li>✅ atomFamily</li>
                                <li>✅ selectAtom</li>
                                <li>✅ atomWithDefault</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 5. TypeScript 지원 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        5️⃣ TypeScript 지원
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {/* Zustand */}
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                            <h3 className="font-bold text-purple-900 mb-2">🐻 Zustand</h3>
                            <pre className="bg-purple-900 text-purple-100 p-3 rounded text-xs overflow-x-auto">
{`interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) 
    => void;
}

const useStore = 
  create<TodoStore>()(
    (set) => ({
      todos: [],
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            { id: 1, text }
          ],
        })),
    })
  );`}
                            </pre>
                            <p className="text-xs text-purple-800 mt-2">
                                ✅ 명시적 타입 정의 필요
                            </p>
                        </div>

                        {/* Recoil */}
                        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                            <h3 className="font-bold text-blue-900 mb-2">⚛️ Recoil</h3>
                            <pre className="bg-blue-900 text-blue-100 p-3 rounded text-xs overflow-x-auto">
{`const todosState = 
  atom<Todo[]>({
    key: 'todos',
    default: [],
  });

const completedCount = 
  selector<number>({
    key: 'completedCount',
    get: ({ get }) => {
      // 타입 자동 추론
      const todos = 
        get(todosState);
      return todos.length;
    },
  });`}
                            </pre>
                            <p className="text-xs text-blue-800 mt-2">
                                ✅ 제네릭으로 타입 지정
                            </p>
                        </div>

                        {/* Jotai */}
                        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
                            <h3 className="font-bold text-emerald-900 mb-2">👻 Jotai</h3>
                            <pre className="bg-emerald-900 text-emerald-100 p-3 rounded text-xs overflow-x-auto">
{`// 타입 자동 추론 우수
const todosAtom = 
  atom<Todo[]>([]);

const completedAtom = 
  atom((get) => {
    const todos = 
      get(todosAtom);
    // number로 자동 추론
    return todos.filter(
      t => t.completed
    ).length;
  });

// 타입 자동 추론
const [count] = 
  useAtom(completedAtom);`}
                            </pre>
                            <p className="text-xs text-emerald-800 mt-2">
                                ✅ 타입 추론 가장 우수
                            </p>
                        </div>
                    </div>
                </section>

                {/* 종합 비교 표 */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 종합 비교</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white rounded-lg shadow-lg">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700">
                                        항목
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-purple-700">
                                        🐻 Zustand
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-blue-700">
                                        ⚛️ Recoil
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-bold text-emerald-700">
                                        👻 Jotai
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        번들 사이즈
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">
                                        ~3KB ✅
                                    </td>
                                    <td className="px-6 py-4 text-sm text-blue-700">~21KB ⚠️</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">
                                        ~3KB ✅
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        러닝 커브
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">낮음 ✅</td>
                                    <td className="px-6 py-4 text-sm text-blue-700">중간 ⚠️</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">중간 ⚠️</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        파생 상태
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">
                                        수동 계산 ⚠️
                                    </td>
                                    <td className="px-6 py-4 text-sm text-blue-700">
                                        Selector ✅
                                    </td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">
                                        파생 Atom ✅
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        비동기 처리
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">수동 ⚠️</td>
                                    <td className="px-6 py-4 text-sm text-blue-700">내장 ✅</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">내장 ✅</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        Provider 필요
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">불필요 ✅</td>
                                    <td className="px-6 py-4 text-sm text-blue-700">필요 ⚠️</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">
                                        선택적 ✅
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        DevTools
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">
                                        Redux DevTools ✅
                                    </td>
                                    <td className="px-6 py-4 text-sm text-blue-700">전용 ✅</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">제한적 ⚠️</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        TypeScript
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">우수 ✅</td>
                                    <td className="px-6 py-4 text-sm text-blue-700">우수 ✅</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">
                                        최고 ✅✅
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        React 외부 사용
                                    </td>
                                    <td className="px-6 py-4 text-sm text-purple-700">가능 ✅</td>
                                    <td className="px-6 py-4 text-sm text-blue-700">불가 ❌</td>
                                    <td className="px-6 py-4 text-sm text-emerald-700">불가 ❌</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 선택 가이드 */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 선택 가이드</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-purple-900 mb-3">
                                🐻 Zustand 추천
                            </h3>
                            <ul className="space-y-2 text-purple-800 text-sm">
                                <li>✅ 간단한 전역 상태 관리</li>
                                <li>✅ Redux 패턴에 익숙한 경우</li>
                                <li>✅ Provider 래핑 싫은 경우</li>
                                <li>✅ React 외부에서도 사용</li>
                                <li>✅ 작은 번들 사이즈 중요</li>
                            </ul>
                        </div>

                        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-blue-900 mb-3">
                                ⚛️ Recoil 추천
                            </h3>
                            <ul className="space-y-2 text-blue-800 text-sm">
                                <li>✅ 복잡한 파생 상태 많음</li>
                                <li>✅ 비동기 데이터 의존성</li>
                                <li>✅ Suspense 적극 활용</li>
                                <li>✅ Facebook 생태계</li>
                                <li>✅ Time Travel Debugging</li>
                            </ul>
                        </div>

                        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-emerald-900 mb-3">
                                👻 Jotai 추천
                            </h3>
                            <ul className="space-y-2 text-emerald-800 text-sm">
                                <li>✅ TypeScript 프로젝트</li>
                                <li>✅ Bottom-up 설계 선호</li>
                                <li>✅ 세밀한 리렌더링 최적화</li>
                                <li>✅ 작은 번들 + Atom 패턴</li>
                                <li>✅ Recoil보다 가벼운 대안</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
