import Link from 'next/link';

export default function StorybookGuidePage() {
    const examples = [
        {
            title: 'Storybook 기초',
            description: 'Storybook 설정과 첫 Story 작성하기',
            href: '/storybook-guide/basics',
            status: '완료',
            highlights: ['설치 및 설정', 'Story 작성법', 'CSF 3.0'],
        },
        {
            title: 'Controls & Args',
            description: '인터랙티브한 컨트롤로 컴포넌트 테스트하기',
            href: '/storybook-guide/controls',
            status: '완료',
            highlights: ['ArgTypes', 'Controls 활용', '동적 Props'],
        },
        {
            title: 'MDX 문서화',
            description: 'MDX를 활용한 고급 문서 작성',
            href: '/storybook-guide/mdx',
            status: '완료',
            highlights: ['MDX 문법', 'Canvas', 'Meta 태그'],
        },
        {
            title: 'Addon 활용',
            description: 'Essentials와 커스텀 Addon 사용법',
            href: '/storybook-guide/addons',
            status: '완료',
            highlights: ['Actions', 'Docs', 'Viewport'],
        },
        {
            title: '자동 문서 생성',
            description: 'TypeScript와 JSDoc으로 자동 문서화',
            href: '/storybook-guide/auto-docs',
            status: '완료',
            highlights: ['TypeScript Props', 'JSDoc', 'autodocs'],
        },
        {
            title: 'Design Tokens 연동',
            description: 'Design System과 Storybook 통합',
            href: '/storybook-guide/design-tokens',
            status: '완료',
            highlights: ['Token 시각화', 'Theme Provider', 'CSS Variables'],
        },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">Storybook 완벽 가이드</h1>
                <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                    ← 메인으로 돌아가기
                </Link>
                <p className="text-gray-600 text-lg">
                    <code className="bg-gray-100 px-2 py-1 rounded">Storybook</code>으로 
                    컴포넌트를 문서화하고 개발 생산성을 극대화하세요.
                </p>
            </div>

            <div className="mb-8 p-6 bg-linear-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                <h2 className="text-xl font-semibold mb-4 text-orange-900">📚 Storybook이란?</h2>
                <div className="space-y-3 text-gray-700">
                    <p>
                        <strong>Storybook</strong>은 UI 컴포넌트를 독립적으로 개발하고 문서화하는 
                        오픈소스 도구입니다. 컴포넌트를 격리된 환경에서 개발하고 테스트할 수 있습니다.
                    </p>
                    <div className="grid gap-3 md:grid-cols-2 mt-4">
                        <div className="p-4 bg-white rounded border border-orange-100">
                            <h4 className="font-medium text-orange-900 mb-2">핵심 기능</h4>
                            <ul className="text-orange-800 text-sm space-y-1">
                                <li>• 컴포넌트 독립 개발</li>
                                <li>• 인터랙티브 문서화</li>
                                <li>• 시각적 테스트</li>
                                <li>• 디자인 시스템 구축</li>
                                <li>• 팀 협업 강화</li>
                            </ul>
                        </div>
                        <div className="p-4 bg-white rounded border border-green-100">
                            <h4 className="font-medium text-green-900 mb-2">주요 장점</h4>
                            <ul className="text-green-800 text-sm space-y-1">
                                <li>• 빠른 개발 사이클</li>
                                <li>• 버그 조기 발견</li>
                                <li>• 재사용성 향상</li>
                                <li>• 일관된 UI/UX</li>
                                <li>• 자동 문서 생성</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 mb-8">
                {examples.map((example, index) => (
                    <Link
                        key={index}
                        href={example.href}
                        className="block p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:shadow-lg transition-all"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                                example.status === '완료'
                                    ? 'bg-green-100 text-green-800'
                                    : example.status === '진행중'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}>
                                {example.status}
                            </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{example.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                            {example.highlights.map((highlight, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 text-xs bg-orange-50 text-orange-700 rounded"
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                        
                        <div className="text-orange-600 text-sm font-medium mt-4">
                            예제 보기 →
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <h3 className="font-semibold text-purple-900 mb-3">🎯 Storybook 핵심 개념</h3>
                    <div className="text-purple-800 text-sm space-y-2">
                        <div>
                            <strong>Story:</strong> 컴포넌트의 특정 상태를 표현하는 단위
                        </div>
                        <div>
                            <strong>Args:</strong> 컴포넌트에 전달되는 props 값
                        </div>
                        <div>
                            <strong>Controls:</strong> Args를 동적으로 조작하는 UI
                        </div>
                        <div>
                            <strong>Docs:</strong> 자동 생성되는 문서 페이지
                        </div>
                        <div>
                            <strong>Addons:</strong> 기능을 확장하는 플러그인
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3">📦 CSF 3.0 형식</h3>
                    <div className="bg-white p-3 rounded text-xs font-mono overflow-x-auto">
                        <pre>{`// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};`}</pre>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3">💡 학습 로드맵</h3>
                <div className="text-yellow-800 text-sm space-y-2">
                    <p>
                        <strong>1. 기초 → 고급:</strong> Storybook 설치부터 MDX 문서 작성까지 단계별로 학습
                    </p>
                    <p>
                        <strong>2. 실습 중심:</strong> 실제 컴포넌트를 만들면서 Storybook 활용법 체득
                    </p>
                    <p>
                        <strong>3. 자동화:</strong> TypeScript와 JSDoc으로 문서 자동 생성 구현
                    </p>
                    <p>
                        <strong>4. 통합:</strong> Design Tokens와 연동하여 완전한 Design System 구축
                    </p>
                </div>
            </div>
        </div>
    );
}
