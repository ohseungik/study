import Link from 'next/link';

export default function StorybookBasicsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Storybook 기초</h1>
                    <p className="text-gray-600 mb-4">
                        Storybook 설치부터 첫 Story 작성까지 기본기를 다집니다.
                    </p>
                    <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                        ← Storybook 가이드로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">📦 Storybook 설치</h2>
                    <div className="bg-white p-4 rounded font-mono text-sm mb-3">
                        <pre>{`# 자동 설치 (권장)
npx storybook@latest init

# 수동 설치
npm install --save-dev @storybook/react @storybook/react-vite
npm install --save-dev @storybook/addon-essentials
npm install --save-dev @storybook/addon-interactions
npm install --save-dev @storybook/addon-links
npm install --save-dev @storybook/blocks`}</pre>
                    </div>
                    <div className="text-sm text-blue-800">
                        <strong>💡 Tip:</strong> npx storybook@latest init 명령어가 
                        프로젝트를 자동으로 감지하고 최적의 설정을 생성합니다.
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📁 폴더 구조</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                            <pre>{`.storybook/
  main.ts          # Storybook 설정
  preview.ts       # 전역 데코레이터
src/
  components/
    Button/
      Button.tsx
      Button.stories.tsx  # Story 파일
    Card/
      Card.tsx
      Card.stories.tsx`}</pre>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">⚙️ main.ts 설정</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react-vite',
};

export default config;`}</pre>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">✍️ CSF 3.0으로 Story 작성하기</h3>
                    
                    <div className="mb-4">
                        <h4 className="font-medium mb-2">1️⃣ 기본 Button 컴포넌트</h4>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// src/components/Button/Button.tsx
import React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  children,
  onClick,
}) => {
  const baseStyles = 'rounded font-semibold transition-colors';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      className={\`\${baseStyles} \${variantStyles[variant]} \${sizeStyles[size]}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`}</pre>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">2️⃣ Story 파일 작성 (CSF 3.0)</h4>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Meta 정보 정의
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Story 정의
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};`}</pre>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded p-4">
                        <h4 className="font-semibold text-green-900 mb-2">✅ CSF 3.0 장점</h4>
                        <ul className="text-sm text-green-800 space-y-1">
                            <li>• 간결한 문법</li>
                            <li>• 타입 안정성</li>
                            <li>• 자동 완성</li>
                            <li>• 재사용성</li>
                            <li>• 성능 최적화</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">📋 주요 속성</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>title:</strong> 계층 구조</li>
                            <li>• <strong>component:</strong> 컴포넌트</li>
                            <li>• <strong>tags:</strong> 자동 문서화</li>
                            <li>• <strong>argTypes:</strong> 컨트롤</li>
                            <li>• <strong>args:</strong> 기본값</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">🎯 Story 작성 팁</h4>
                        <ul className="text-sm text-purple-800 space-y-1">
                            <li>• 상태별로 분리</li>
                            <li>• 명확한 이름</li>
                            <li>• 실제 사용 예시</li>
                            <li>• 엣지 케이스</li>
                            <li>• 접근성 고려</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-3">🚀 Storybook 실행</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <div className="bg-gray-50 p-3 rounded font-mono text-sm mb-2">
                                <pre>{`# 개발 모드
npm run storybook

# 빌드
npm run build-storybook`}</pre>
                            </div>
                            <div className="text-xs text-gray-600">
                                기본 포트: http://localhost:6006
                            </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded text-sm">
                            <strong className="text-blue-900">package.json 스크립트:</strong>
                            <div className="bg-white p-2 rounded font-mono text-xs mt-2">
                                <pre>{`"scripts": {
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <h3 className="font-semibold text-yellow-900 mb-3">💡 Best Practices</h3>
                        <ul className="space-y-2 text-sm text-yellow-800">
                            <li>• Story 파일은 컴포넌트와 같은 폴더에</li>
                            <li>• 명명 규칙: ComponentName.stories.tsx</li>
                            <li>• 모든 주요 상태를 Story로 작성</li>
                            <li>• argTypes로 문서화 강화</li>
                            <li>• actions로 이벤트 핸들러 테스트</li>
                        </ul>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <h3 className="font-semibold text-orange-900 mb-3">⚠️ 주의사항</h3>
                        <ul className="space-y-2 text-sm text-orange-800">
                            <li>• Story는 독립적으로 동작해야 함</li>
                            <li>• 외부 상태에 의존하지 않기</li>
                            <li>• API 호출은 Mock 사용</li>
                            <li>• 복잡한 로직은 컴포넌트에서 분리</li>
                            <li>• 파일 크기 주의 (이미지 등)</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
