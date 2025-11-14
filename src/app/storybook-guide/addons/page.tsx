import Link from 'next/link';

export default function AddonsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Storybook Addons</h1>
                    <p className="text-gray-600 mb-4">
                        핵심 애드온을 활용하여 Storybook의 기능을 확장합니다.
                    </p>
                    <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                        ← Storybook 가이드로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">🔌 Addons란?</h2>
                    <p className="text-blue-800 mb-3">
                        Storybook Addons는 개발자 경험을 향상시키는 플러그인입니다. 
                        테스트, 문서화, 디버깅 등 다양한 기능을 제공합니다.
                    </p>
                    <div className="bg-white p-3 rounded text-sm">
                        <strong className="text-blue-900">Essentials 번들:</strong> 
                        <span className="text-gray-700 ml-2">
                            가장 많이 사용되는 6개 애드온이 기본 포함
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-2xl">📄</span>
                            Docs Addon
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            컴포넌트 문서를 자동 생성하고 MDX 지원
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`// .storybook/main.ts
addons: [
  '@storybook/addon-essentials', // Docs 포함
]

// Story에서 autodocs 활성화
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'], // 자동 문서화
};`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>기능:</strong> Props 테이블, Description, 코드 스니펫
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            Actions Addon
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            이벤트 핸들러 호출을 Actions 패널에 로깅
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`// Story 정의
export const Default: Story = {
  args: {
    onClick: action('button-clicked'),
    onHover: action('button-hovered'),
  },
};

// 자동 액션 (naming convention)
const meta: Meta = {
  argTypes: {
    onClick: { action: 'clicked' },
    onChange: { action: 'changed' },
  },
};`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>활용:</strong> 이벤트 디버깅, 콜백 테스트
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-2xl">📱</span>
                            Viewport Addon
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            다양한 디바이스 크기에서 컴포넌트 테스트
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`// .storybook/preview.ts
export const parameters = {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: { width: '375px', height: '667px' },
      },
      tablet: {
        name: 'Tablet',
        styles: { width: '768px', height: '1024px' },
      },
      desktop: {
        name: 'Desktop',
        styles: { width: '1920px', height: '1080px' },
      },
    },
  },
};`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>프리셋:</strong> iPhone, iPad, Galaxy 등
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-2xl">🎨</span>
                            Backgrounds Addon
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            다양한 배경색에서 컴포넌트 확인
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`// .storybook/preview.ts
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#1a1a1a' },
      { name: 'blue', value: '#3b82f6' },
    ],
  },
};

// Story별 설정
export const OnDark: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>용도:</strong> 다크모드 테스트, 대비 확인
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-2xl">🎭</span>
                            Interactions Addon
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            Testing Library로 사용자 인터랙션 시뮬레이션
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`import { userEvent, within } from '@storybook/test';

export const FilledForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 입력 필드 찾기
    const input = canvas.getByRole('textbox');
    const button = canvas.getByRole('button');
    
    // 사용자 인터랙션 시뮬레이션
    await userEvent.type(input, 'Hello World');
    await userEvent.click(button);
    
    // 결과 확인
    await expect(canvas.getByText('Success')).toBeInTheDocument();
  },
};`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>장점:</strong> 자동 E2E 테스트, 디버깅
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                            <span className="text-2xl">♿</span>
                            A11y Addon
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                            WCAG 접근성 기준 자동 검사
                        </p>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs mb-3">
                            <pre>{`// 설치
npm install --save-dev @storybook/addon-a11y

// .storybook/main.ts
addons: ['@storybook/addon-a11y']

// .storybook/preview.ts
export const parameters = {
  a11y: {
    config: {
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'label', enabled: true },
      ],
    },
  },
};`}</pre>
                        </div>
                        <div className="text-xs text-gray-600">
                            <strong>체크:</strong> 색상 대비, ARIA, 키보드 탐색
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🎯 실전 예제: Form 컴포넌트</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                        <pre>{`// LoginForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from '@storybook/test';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
  title: 'Forms/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    // Backgrounds 설정
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    // Viewport 설정
    viewport: {
      defaultViewport: 'mobile1',
    },
    // A11y 설정
    a11y: {
      config: {
        rules: [
          { id: 'label', enabled: true },
          { id: 'color-contrast', enabled: true },
        ],
      },
    },
  },
  argTypes: {
    // Actions 설정
    onSubmit: { action: 'form-submitted' },
    onError: { action: 'validation-error' },
  },
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

// 기본 Story
export const Default: Story = {};

// Interactions로 자동 입력
export const FilledForm: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // 필드 찾기
    const emailInput = canvas.getByLabelText('Email');
    const passwordInput = canvas.getByLabelText('Password');
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    
    // 입력 시뮬레이션
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'password123');
    
    // 제출
    await userEvent.click(submitButton);
    
    // 검증
    await expect(args.onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  },
};

// 에러 상태
export const WithErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // 빈 상태로 제출
    const submitButton = canvas.getByRole('button');
    await userEvent.click(submitButton);
    
    // 에러 메시지 확인
    await expect(canvas.getByText(/email is required/i)).toBeInTheDocument();
  },
};

// 다크모드
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// 모바일 뷰
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="font-semibold text-purple-900 mb-3">🔧 유용한 추가 Addons</h3>
                        <ul className="space-y-2 text-sm text-purple-800">
                            <li><strong>Pseudo States:</strong> hover, focus 상태</li>
                            <li><strong>Design Assets:</strong> Figma 연동</li>
                            <li><strong>Measure:</strong> 픽셀 측정</li>
                            <li><strong>Outline:</strong> 레이아웃 디버깅</li>
                            <li><strong>Links:</strong> Story 간 네비게이션</li>
                        </ul>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>✓ Essentials 번들 기본 사용</li>
                            <li>✓ 팀에 필요한 것만 추가</li>
                            <li>✓ Interactions로 핵심 시나리오 테스트</li>
                            <li>✓ A11y 체크 자동화</li>
                            <li>✓ Actions로 이벤트 검증</li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h3 className="font-semibold text-orange-900 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-sm text-orange-800">
                            <li>• 너무 많은 애드온 → 느려짐</li>
                            <li>• play 함수는 비동기 처리</li>
                            <li>• 버전 호환성 확인</li>
                            <li>• CI/CD에서 테스트 실행</li>
                            <li>• 커스텀 애드온은 신중히</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="font-semibold text-blue-900 mb-3">🚀 Addon 설치 & 설정</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-2">설치</h4>
                            <div className="bg-white p-2 rounded font-mono text-xs">
                                <pre>{`npm install --save-dev @storybook/addon-a11y
npx storybook add @storybook/addon-a11y`}</pre>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">등록</h4>
                            <div className="bg-white p-2 rounded font-mono text-xs">
                                <pre>{`// .storybook/main.ts
addons: [
  '@storybook/addon-a11y',
]`}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
