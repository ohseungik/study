import Link from 'next/link';

export default function ControlsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Controls & Args</h1>
                    <p className="text-gray-600 mb-4">
                        Storybook Controls로 컴포넌트 Props를 인터랙티브하게 테스트합니다.
                    </p>
                    <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                        ← Storybook 가이드로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">🎮 Controls란?</h2>
                    <p className="text-blue-800 mb-3">
                        Controls 애드온은 Storybook UI에서 컴포넌트의 args(props)를 
                        동적으로 조작할 수 있게 해주는 강력한 도구입니다.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">실시간 편집</strong>
                            <p className="text-gray-600">브라우저에서 props 변경</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">자동 타입 감지</strong>
                            <p className="text-gray-600">TypeScript 기반</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">다양한 컨트롤</strong>
                            <p className="text-gray-600">10+ 컨트롤 타입</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">📋 ArgTypes 정의하기</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto mb-4">
                        <pre>{`import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    // 텍스트 입력
    label: {
      control: 'text',
      description: '입력 필드 레이블',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    
    // Select 드롭다운
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: '입력 필드 스타일',
    },
    
    // Radio 버튼
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: '입력 필드 크기',
    },
    
    // 범위 슬라이더
    maxLength: {
      control: { type: 'range', min: 10, max: 200, step: 10 },
      description: '최대 문자 길이',
    },
    
    // 색상 선택
    borderColor: {
      control: 'color',
      description: '테두리 색상',
    },
    
    // 불린 체크박스
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    
    // 날짜 선택
    defaultDate: {
      control: 'date',
      description: '기본 날짜',
    },
    
    // 배열 입력
    tags: {
      control: 'object',
      description: '태그 배열',
    },
    
    // 함수 액션
    onChange: { 
      action: 'changed',
      description: '값 변경 이벤트',
    },
    
    // 컨트롤 비활성화
    internalState: {
      control: false,
      description: '내부 상태 (편집 불가)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;`}</pre>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-3 rounded text-sm text-yellow-800">
                        <strong>💡 Tip:</strong> argTypes는 자동으로 TypeScript 타입에서 추론되지만, 
                        명시적으로 정의하면 더 나은 문서화와 컨트롤을 제공합니다.
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🎛️ Control 타입 목록</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">text</code>
                                <span className="text-gray-600">텍스트 입력</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">boolean</code>
                                <span className="text-gray-600">체크박스</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">number</code>
                                <span className="text-gray-600">숫자 입력</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">range</code>
                                <span className="text-gray-600">슬라이더</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">color</code>
                                <span className="text-gray-600">색상 선택기</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">date</code>
                                <span className="text-gray-600">날짜 선택기</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">select</code>
                                <span className="text-gray-600">드롭다운</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">radio</code>
                                <span className="text-gray-600">라디오 버튼</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">check</code>
                                <span className="text-gray-600">체크박스 그룹</span>
                            </div>
                            <div className="flex justify-between p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">object</code>
                                <span className="text-gray-600">JSON 편집기</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">⚙️ 고급 설정</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// 조건부 컨트롤
argTypes: {
  theme: {
    control: 'select',
    options: ['light', 'dark'],
    if: { arg: 'advanced', truthy: true },
  },
  
  // 카테고리 그룹화
  backgroundColor: {
    control: 'color',
    table: { category: 'Style' },
  },
  borderRadius: {
    control: 'number',
    table: { category: 'Style' },
  },
  
  // 정렬 순서
  title: {
    control: 'text',
    table: { 
      category: 'Content',
      subcategory: 'Text',
    },
  },
  
  // Mapping (enum 변환)
  status: {
    control: 'select',
    options: ['Success', 'Error', 'Warning'],
    mapping: {
      Success: 'success',
      Error: 'error',
      Warning: 'warning',
    },
  },
}`}</pre>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">📦 실전 예제: Card 컴포넌트</h3>
                    
                    <div className="mb-4">
                        <h4 className="font-medium mb-2 text-gray-700">컴포넌트</h4>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// Card.tsx
export interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  variant: 'elevated' | 'outlined' | 'filled';
  padding: 'none' | 'small' | 'medium' | 'large';
  cornerRadius: number;
  clickable: boolean;
  badge?: string;
  onCardClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  variant = 'elevated',
  padding = 'medium',
  cornerRadius = 8,
  clickable = false,
  badge,
  onCardClick,
}) => {
  const variantStyles = {
    elevated: 'shadow-lg bg-white',
    outlined: 'border-2 border-gray-300 bg-white',
    filled: 'bg-gray-100',
  };
  
  const paddingStyles = {
    none: 'p-0',
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6',
  };
  
  return (
    <div
      className={\`\${variantStyles[variant]} \${paddingStyles[padding]} 
                 \${clickable ? 'cursor-pointer hover:scale-105' : ''} 
                 transition-transform\`}
      style={{ borderRadius: \`\${cornerRadius}px\` }}
      onClick={clickable ? onCardClick : undefined}
    >
      {badge && (
        <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded mb-2">
          {badge}
        </span>
      )}
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover mb-4" />
      )}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};`}</pre>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2 text-gray-700">Story</h4>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// Card.stories.tsx
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    // 기본 콘텐츠
    title: {
      control: 'text',
      description: '카드 제목',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: '카드 설명',
      table: { category: 'Content' },
    },
    imageUrl: {
      control: 'text',
      description: '이미지 URL',
      table: { category: 'Content' },
    },
    badge: {
      control: 'text',
      description: '뱃지 텍스트',
      table: { category: 'Content' },
    },
    
    // 스타일링
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: '카드 스타일 변형',
      table: { category: 'Style' },
    },
    padding: {
      control: 'radio',
      options: ['none', 'small', 'medium', 'large'],
      description: '내부 여백',
      table: { category: 'Style' },
    },
    cornerRadius: {
      control: { type: 'range', min: 0, max: 32, step: 4 },
      description: '모서리 둥글기',
      table: { category: 'Style' },
    },
    
    // 인터랙션
    clickable: {
      control: 'boolean',
      description: '클릭 가능 여부',
      table: { category: 'Interaction' },
    },
    onCardClick: {
      action: 'card clicked',
      description: '카드 클릭 핸들러',
      table: { category: 'Interaction' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 기본 Story
export const Default: Story = {
  args: {
    title: 'Beautiful Card',
    description: 'This is a customizable card component with various options.',
    variant: 'elevated',
    padding: 'medium',
    cornerRadius: 8,
    clickable: false,
  },
};

// 이미지 포함
export const WithImage: Story = {
  args: {
    ...Default.args,
    imageUrl: 'https://picsum.photos/400/300',
    badge: 'New',
  },
};

// 인터랙티브
export const Interactive: Story = {
  args: {
    ...Default.args,
    clickable: true,
    variant: 'outlined',
  },
};

// Playground (모든 컨트롤 활성화)
export const Playground: Story = {
  args: {
    title: 'Playground Card',
    description: 'Try changing the controls!',
    imageUrl: 'https://picsum.photos/400/300',
    variant: 'elevated',
    padding: 'medium',
    cornerRadius: 16,
    clickable: true,
    badge: 'Featured',
  },
};`}</pre>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>✓ 의미 있는 description 작성</li>
                            <li>✓ 카테고리로 그룹화</li>
                            <li>✓ 적절한 컨트롤 타입 선택</li>
                            <li>✓ 기본값 제공</li>
                            <li>✓ Playground Story 생성</li>
                            <li>✓ Action으로 이벤트 추적</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="font-semibold text-purple-900 mb-3">🎯 활용 시나리오</h3>
                        <ul className="space-y-2 text-sm text-purple-800">
                            <li>• 디자이너와 협업 시 실시간 피드백</li>
                            <li>• QA 팀의 엣지 케이스 테스트</li>
                            <li>• Props 조합 실험</li>
                            <li>• 접근성 테스트 (색상, 크기)</li>
                            <li>• 반응형 레이아웃 확인</li>
                            <li>• 다국어 텍스트 길이 테스트</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="font-semibold text-orange-900 mb-3">⚡ 성능 최적화 팁</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-800">
                        <div>
                            <strong>불필요한 컨트롤 제거</strong>
                            <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                <code>control: false</code>
                            </div>
                            <p className="mt-1">내부 상태나 자동 계산 값은 컨트롤 비활성화</p>
                        </div>
                        <div>
                            <strong>복잡한 객체는 Docs만</strong>
                            <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                <code>{`table: { disable: false }`}</code>
                            </div>
                            <p className="mt-1">문서화만 하고 컨트롤 제외</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
