"use client";

/**
 * use() Hook으로 Context 조건부 읽기
 */

import { use, createContext, useState, useContext } from "react";
import Link from "next/link";

// 테마 Context 생성
const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
} | null>(null);

// 사용자 설정 Context
const UserSettingsContext = createContext<{
  fontSize: "small" | "medium" | "large";
  language: "ko" | "en";
  notifications: boolean;
} | null>(null);

// 기존 방식: useContext 사용
function OldWayComponent() {
  const themeContext = useContext(ThemeContext);
  const settingsContext = useContext(UserSettingsContext);

  // 기존 방식은 항상 호출되어야 함
  if (!themeContext || !settingsContext) {
    return <div>Context를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      className={`p-4 rounded-lg ${
        themeContext.theme === "dark"
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-gray-900 border-gray-200"
      } border`}
    >
      <h3 className="font-semibold mb-2">🔄 기존 방식 (useContext)</h3>
      <div className="space-y-1 text-sm">
        <p>테마: {themeContext.theme}</p>
        <p>폰트 크기: {settingsContext.fontSize}</p>
        <p>언어: {settingsContext.language}</p>
        <p>알림: {settingsContext.notifications ? "켜짐" : "꺼짐"}</p>
      </div>
    </div>
  );
}

// 새로운 방식: use() Hook 사용 (조건부 호출 가능)
function NewWayComponent({ showAdvanced }: { showAdvanced: boolean }) {
  // use()는 조건부로 호출할 수 있음! (기존 Hook 규칙의 예외)
  const themeContext = use(ThemeContext);

  let advancedSettings = null;
  if (showAdvanced) {
    // 조건부로 Context 읽기 - 기존 Hook에서는 불가능!
    advancedSettings = use(UserSettingsContext);
  }

  if (!themeContext) {
    return <div>테마 Context를 찾을 수 없습니다.</div>;
  }

  return (
    <div
      className={`p-4 rounded-lg ${
        themeContext.theme === "dark"
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-white text-gray-900 border-gray-200"
      } border`}
    >
      <h3 className="font-semibold mb-2">✨ 새로운 방식 (use Hook)</h3>
      <div className="space-y-1 text-sm">
        <p>테마: {themeContext.theme}</p>

        {showAdvanced && advancedSettings && (
          <>
            <p>폰트 크기: {advancedSettings.fontSize}</p>
            <p>언어: {advancedSettings.language}</p>
            <p>알림: {advancedSettings.notifications ? "켜짐" : "꺼짐"}</p>
          </>
        )}

        {!showAdvanced && (
          <p className="text-gray-500 italic">고급 설정이 숨겨져 있습니다</p>
        )}
      </div>
    </div>
  );
}

// Provider 컴포넌트
function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userSettings] = useState({
    fontSize: "medium" as const,
    language: "ko" as const,
    notifications: true,
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <UserSettingsContext.Provider value={userSettings}>
        {children}
      </UserSettingsContext.Provider>
    </ThemeContext.Provider>
  );
}

export default function ContextExamplePage() {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Context + use() 예제</h1>
        <Link
          href="/react19-features/use-hook"
          className="text-blue-600 hover:text-blue-800"
        >
          ← use() Hook 예제로 돌아가기
        </Link>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">🎯 핵심 포인트</h2>
        <ul className="space-y-2 text-gray-700">
          <li>
            • <code className="bg-white px-2 py-1 rounded">use(Context)</code>로
            조건부 Context 읽기 가능
          </li>
          <li>• 기존 Hook 규칙의 예외: 조건문, 루프 내부에서도 사용 가능</li>
          <li>• Context가 null인 경우 자동으로 에러 발생 (더 안전함)</li>
          <li>• 성능 최적화: 필요할 때만 Context를 구독</li>
        </ul>
      </div>

      <Providers>
        <ContextExampleContent
          showAdvanced={showAdvanced}
          setShowAdvanced={setShowAdvanced}
        />
      </Providers>
    </div>
  );
}

function ContextExampleContent({
  showAdvanced,
  setShowAdvanced,
}: {
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
}) {
  const themeContext = use(ThemeContext);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">컨트롤</h3>
        <div className="flex gap-4">
          <button
            onClick={themeContext?.toggleTheme}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            테마 토글
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`px-4 py-2 rounded ${
              showAdvanced
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            고급 설정 {showAdvanced ? "숨기기" : "보기"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <OldWayComponent />
        <NewWayComponent showAdvanced={showAdvanced} />
      </div>

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-900 mb-2">💡 코드 비교</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h5 className="font-medium text-yellow-900 mb-2">
              기존 방식 (useContext)
            </h5>
            <pre className="text-sm text-yellow-800 overflow-x-auto bg-yellow-100 p-2 rounded">
              {`function Component() {
    // 항상 호출되어야 함
    const ctx1 = useContext(Ctx1);
    const ctx2 = useContext(Ctx2);
    
    if (condition) {
        // ctx2 사용
    }
    // ctx2를 안 써도 항상 구독됨
}`}
            </pre>
          </div>

          <div>
            <h5 className="font-medium text-yellow-900 mb-2">
              새로운 방식 (use)
            </h5>
            <pre className="text-sm text-yellow-800 overflow-x-auto bg-yellow-100 p-2 rounded">
              {`function Component() {
    const ctx1 = use(Ctx1);
    
    if (condition) {
        // 조건부로 호출 가능! ✨
        const ctx2 = use(Ctx2);
    }
    // 필요할 때만 구독
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
