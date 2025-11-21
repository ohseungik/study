import Link from 'next/link';

export default function AutoDocsPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">자동 문서 생성 (Auto-Docs)</h1>
                    <p className="text-gray-600 mb-4">
                        TypeScript와 JSDoc을 활용하여 컴포넌트 문서를 자동으로 생성합니다.
                    </p>
                    <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                        ← Storybook 가이드로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">📚 Auto-Docs란?</h2>
                    <p className="text-blue-800 mb-3">
                        Storybook은 TypeScript 타입과 JSDoc 주석을 분석하여 
                        Props 테이블, 설명, 예제를 포함한 문서를 자동으로 생성합니다.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">자동 생성</strong>
                            <p className="text-gray-600">타입 정보 기반</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">항상 최신</strong>
                            <p className="text-gray-600">코드와 동기화</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">노력 최소</strong>
                            <p className="text-gray-600">한 번 설정으로 완료</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">⚡ Auto-Docs 활성화</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-2 text-gray-700">Story에 태그 추가</h4>
                            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                                <pre>{`const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'], // 👈 이것만 추가!
};

export default meta;`}</pre>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2 text-gray-700">전역 설정 (.storybook/preview.ts)</h4>
                            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                                <pre>{`export const parameters = {
  docs: {
    autodocs: 'tag', // 또는 true
  },
};`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🎯 TypeScript로 완벽한 문서 생성</h3>
                    <div className="mb-4">
                        <h4 className="font-medium mb-2 text-gray-700">1단계: 타입 정의</h4>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// Button.tsx
export interface ButtonProps {
  /**
   * 버튼에 표시될 텍스트
   */
  children: React.ReactNode;
  
  /**
   * 버튼의 시각적 스타일
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  
  /**
   * 버튼의 크기
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  
  /**
   * 비활성화 상태 여부
   * 비활성화되면 클릭할 수 없고 시각적으로 구분됩니다.
   * @default false
   */
  disabled?: boolean;
  
  /**
   * 전체 너비를 차지할지 여부
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * 로딩 중 표시 여부
   * 로딩 중에는 자동으로 disabled 상태가 됩니다.
   * @default false
   */
  loading?: boolean;
  
  /**
   * 아이콘 (왼쪽)
   * @example <Icon name="plus" />
   */
  leftIcon?: React.ReactNode;
  
  /**
   * 아이콘 (오른쪽)
   */
  rightIcon?: React.ReactNode;
  
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * 버튼 타입
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * ARIA 레이블
   * 접근성을 위해 명확한 설명 제공
   */
  'aria-label'?: string;
  
  /**
   * 테스트 ID
   * @internal
   */
  testId?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
  testId,
}) => {
  // 구현...
};`}</pre>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2 text-gray-700">2단계: Story 작성</h4>
                        <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Button 컴포넌트는 사용자 액션을 트리거하는 기본 UI 요소입니다.
 * 
 * ## 사용 가이드
 * - Primary: 주요 액션 (저장, 제출 등)
 * - Secondary: 보조 액션 (취소, 뒤로 등)
 * - Danger: 위험한 액션 (삭제, 초기화 등)
 * - Ghost: 최소한의 시각적 강조
 * 
 * ## 접근성
 * - 키보드 탐색 지원 (Tab, Enter, Space)
 * - ARIA 레이블 지원
 * - 색상 대비 WCAG AA 준수
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'], // 자동 문서화 활성화
  parameters: {
    docs: {
      description: {
        component: '이 컴포넌트는 모든 플랫폼에서 일관된 버튼 경험을 제공합니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      description: '버튼 스타일 변형',
      table: {
        type: { summary: "'primary' | 'secondary' | 'danger' | 'ghost'" },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
      description: '로딩 상태일 때 spinner가 표시됩니다.',
    },
    onClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 기본 Primary 버튼입니다.
 * 가장 중요한 액션에 사용하세요.
 */
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

/**
 * Secondary 버튼은 보조 액션에 적합합니다.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

/**
 * 삭제나 초기화 같은 위험한 액션에 사용합니다.
 */
export const Danger: Story = {
  args: {
    children: 'Delete',
    variant: 'danger',
  },
  parameters: {
    docs: {
      description: {
        story: '사용자에게 경고 메시지를 먼저 표시하는 것이 좋습니다.',
      },
    },
  },
};

/**
 * 아이콘과 함께 사용하는 예제
 */
export const WithIcons: Story = {
  args: {
    children: 'Add Item',
    leftIcon: <span>➕</span>,
  },
};

/**
 * 비동기 작업 중 로딩 상태
 */
export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};`}</pre>
                        </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-800">
                        <strong>✅ 결과:</strong> Storybook이 자동으로 다음을 생성합니다:
                        <ul className="mt-2 space-y-1 ml-4">
                            <li>• Props 테이블 (타입, 기본값, 설명)</li>
                            <li>• 컴포넌트 설명</li>
                            <li>• Story별 설명</li>
                            <li>• 코드 예제</li>
                            <li>• Controls 패널</li>
                        </ul>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📝 JSDoc 태그 활용</h3>
                        <div className="space-y-3 text-sm">
                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600">@default</code>
                                <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                    @default &apos;primary&apos;
                                </div>
                                <p className="text-gray-600 mt-1">기본값 명시</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600">@deprecated</code>
                                <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                    @deprecated Use newProp instead
                                </div>
                                <p className="text-gray-600 mt-1">더 이상 사용 안 함</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600">@example</code>
                                <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                    {`@example <Icon name="check" />`}
                                </div>
                                <p className="text-gray-600 mt-1">사용 예제</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600">@internal</code>
                                <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                    @internal
                                </div>
                                <p className="text-gray-600 mt-1">내부 전용 (문서 제외)</p>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600">@see</code>
                                <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                    @see https://example.com
                                </div>
                                <p className="text-gray-600 mt-1">참고 링크</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">⚙️ Docs 커스터마이징</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// .storybook/preview.ts
import { DocsContainer } from '@storybook/blocks';

export const parameters = {
  docs: {
    // 테마
    theme: themes.dark,
    
    // 커스텀 컨테이너
    container: DocsContainer,
    
    // Props 테이블 설정
    extractArgTypes: (component) => {
      // 커스텀 로직
    },
    
    // 소스 코드 포맷
    source: {
      language: 'tsx',
      format: true,
    },
    
    // 캔버스 설정
    canvas: {
      sourceState: 'shown', // 기본으로 표시
    },
  },
};

// Story별 커스터마이징
export const Advanced: Story = {
  parameters: {
    docs: {
      description: {
        story: '고급 사용 예제',
      },
      source: {
        code: \`
<Button
  variant="primary"
  size="large"
  onClick={handleClick}
>
  Custom Code
</Button>
        \`,
      },
    },
  },
};`}</pre>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🔧 복잡한 타입 문서화</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                        <pre>{`// 유니온 타입
export type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'danger' 
  | 'ghost';

// 제네릭 타입
export interface SelectProps<T = string> {
  /**
   * 선택 가능한 옵션들
   */
  options: Array<{
    /** 옵션 값 */
    value: T;
    /** 표시될 레이블 */
    label: string;
    /** 비활성화 여부 */
    disabled?: boolean;
  }>;
  
  /**
   * 현재 선택된 값
   */
  value?: T;
  
  /**
   * 값 변경 핸들러
   */
  onChange?: (value: T) => void;
}

// 객체 타입
export interface Theme {
  /**
   * 색상 팔레트
   */
  colors: {
    /** 주요 색상 */
    primary: string;
    /** 보조 색상 */
    secondary: string;
    /** 배경색 */
    background: {
      /** 기본 배경 */
      default: string;
      /** 강조 배경 */
      paper: string;
    };
  };
  
  /**
   * 타이포그래피 설정
   */
  typography: {
    fontFamily: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

// 함수 타입
export type OnSubmitHandler = (
  /** 폼 데이터 */
  data: FormData,
  /** 이벤트 객체 */
  event: React.FormEvent
) => void | Promise<void>;`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>✓ 모든 Props에 JSDoc 추가</li>
                            <li>✓ 기본값 명시 (@default)</li>
                            <li>✓ 예제 코드 제공 (@example)</li>
                            <li>✓ TypeScript로 타입 정의</li>
                            <li>✓ 컴포넌트 설명 작성</li>
                            <li>✓ Story별 설명 추가</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-semibold text-blue-900 mb-3">🎯 문서화 레벨</h3>
                        <div className="space-y-2 text-sm text-blue-800">
                            <div className="bg-white p-2 rounded">
                                <strong>Level 1: 최소</strong>
                                <p className="text-xs">타입만 정의</p>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <strong>Level 2: 기본</strong>
                                <p className="text-xs">+ JSDoc 주석</p>
                            </div>
                            <div className="bg-white p-2 rounded">
                                <strong>Level 3: 완전</strong>
                                <p className="text-xs">+ 예제 + 가이드</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="font-semibold text-purple-900 mb-3">⚡ 자동화 팁</h3>
                        <ul className="space-y-2 text-sm text-purple-800">
                            <li>• ESLint로 JSDoc 강제</li>
                            <li>• Prettier로 형식 통일</li>
                            <li>• CI에서 문서 빌드</li>
                            <li>• PR에 문서 링크 추가</li>
                            <li>• 버전별 아카이브</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <h3 className="font-semibold text-orange-900 mb-3">🚀 Pro Tips</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-800">
                        <div>
                            <strong>문서와 코드 한곳에서</strong>
                            <p className="mt-1">JSDoc 주석은 IDE에서도 표시되어 개발 경험 향상</p>
                        </div>
                        <div>
                            <strong>타입 안정성 + 문서화</strong>
                            <p className="mt-1">TypeScript로 타입 안정성과 자동 문서화 동시 달성</p>
                        </div>
                        <div>
                            <strong>항상 최신 상태</strong>
                            <p className="mt-1">코드 변경 시 문서도 자동 업데이트</p>
                        </div>
                        <div>
                            <strong>팀 협업 강화</strong>
                            <p className="mt-1">디자이너, PM도 쉽게 이해할 수 있는 문서</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
