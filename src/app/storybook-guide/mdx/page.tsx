import Link from 'next/link';

export default function MDXPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">MDX 문서화</h1>
                    <p className="text-gray-600 mb-4">
                        MDX로 Story와 문서를 하나의 파일에서 작성하고 풍부한 콘텐츠를 제공합니다.
                    </p>
                    <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                        ← Storybook 가이드로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">📝 MDX란?</h2>
                    <p className="text-blue-800 mb-3">
                        MDX는 Markdown에 JSX를 결합한 형식으로, 문서 안에 
                        React 컴포넌트를 직접 임베드할 수 있습니다.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">Markdown</strong>
                            <p className="text-gray-600">간편한 텍스트 작성</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">+ JSX</strong>
                            <p className="text-gray-600">컴포넌트 임베드</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">= 풍부한 문서</strong>
                            <p className="text-gray-600">인터랙티브 가이드</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🏗️ MDX 파일 구조</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                        <pre>{`{/* Button.stories.mdx */}
import { Canvas, Meta, Story, ArgsTable, Source } from '@storybook/blocks';
import { Button } from './Button';

{/* Meta 정보 */}
<Meta 
  title="Components/Button" 
  component={Button}
/>

# Button 컴포넌트

재사용 가능한 버튼 컴포넌트로 다양한 스타일과 크기를 지원합니다.

## 설치

\`\`\`bash
npm install @mycompany/button
\`\`\`

## 기본 사용법

<Canvas>
  <Story name="Default">
    <Button>Click me</Button>
  </Story>
</Canvas>

## Props

<ArgsTable of={Button} />

## 예제

### Primary Button
<Canvas>
  <Story name="Primary">
    <Button variant="primary">Primary</Button>
  </Story>
</Canvas>

### Secondary Button
<Canvas>
  <Story name="Secondary">
    <Button variant="secondary">Secondary</Button>
  </Story>
</Canvas>

## 디자인 가이드라인

버튼은 사용자 액션을 명확하게 전달해야 합니다:

- ✅ **Do**: 짧고 명확한 텍스트 사용
- ❌ **Don't**: 모호한 문구 사용

## 접근성

- 키보드 탐색 지원 (Tab, Enter)
- 스크린 리더 호환
- 충분한 색상 대비 (WCAG AA)

## 코드 예제

<Source
  language="tsx"
  code={\`
<Button 
  variant="primary" 
  size="large"
  onClick={() => console.log('Clicked!')}
>
  Submit Form
</Button>
\`}
/>`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📦 주요 MDX 컴포넌트</h3>
                        <div className="space-y-3 text-sm">
                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600 font-semibold">{'<Meta>'}</code>
                                <p className="text-gray-600 mt-1">Story 메타데이터 정의</p>
                                <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                                    {'<Meta title="UI/Button" component={Button} />'}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600 font-semibold">{'<Canvas>'}</code>
                                <p className="text-gray-600 mt-1">Story를 시각적으로 표시</p>
                                <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                                    {'<Canvas><Story>...</Story></Canvas>'}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600 font-semibold">{'<Story>'}</code>
                                <p className="text-gray-600 mt-1">개별 Story 정의</p>
                                <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                                    {'<Story name="Primary">...</Story>'}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600 font-semibold">{'<ArgsTable>'}</code>
                                <p className="text-gray-600 mt-1">Props 테이블 자동 생성</p>
                                <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                                    {'<ArgsTable of={Button} />'}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-3 rounded">
                                <code className="text-blue-600 font-semibold">{'<Source>'}</code>
                                <p className="text-gray-600 mt-1">코드 스니펫 표시</p>
                                <div className="bg-white p-2 rounded mt-2 font-mono text-xs">
                                    {'<Source code="const a = 1;" />'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🎨 Markdown 문법</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600"># 제목</code>
                                <span className="text-gray-600">→ H1 헤딩</span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">## 소제목</code>
                                <span className="text-gray-600">→ H2 헤딩</span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">**굵게**</code>
                                <span className="text-gray-600">→ <strong>굵게</strong></span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">*기울임*</code>
                                <span className="text-gray-600">→ <em>기울임</em></span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">`코드`</code>
                                <span className="text-gray-600">→ 인라인 코드</span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">- 항목</code>
                                <span className="text-gray-600">→ 리스트</span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">[링크](url)</code>
                                <span className="text-gray-600">→ 하이퍼링크</span>
                            </div>
                            <div className="flex gap-3 p-2 bg-gray-50 rounded">
                                <code className="text-blue-600">![alt](img)</code>
                                <span className="text-gray-600">→ 이미지</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🚀 실전 예제: Alert 컴포넌트 문서</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                        <pre>{`{/* Alert.stories.mdx */}
import { Canvas, Meta, Story, ArgsTable, ColorPalette, ColorItem } from '@storybook/blocks';
import { Alert } from './Alert';

<Meta title="Feedback/Alert" component={Alert} />

# Alert 알림 컴포넌트

사용자에게 중요한 정보를 전달하는 알림 컴포넌트입니다.

<Canvas>
  <Story name="Overview">
    <div className="space-y-4">
      <Alert variant="info">정보 메시지입니다.</Alert>
      <Alert variant="success">성공적으로 완료되었습니다.</Alert>
      <Alert variant="warning">주의가 필요합니다.</Alert>
      <Alert variant="error">오류가 발생했습니다.</Alert>
    </div>
  </Story>
</Canvas>

## 언제 사용하나요?

| 상황 | 사용 예시 |
|------|-----------|
| 📘 Info | 일반 정보, 도움말 |
| ✅ Success | 작업 완료, 저장 성공 |
| ⚠️ Warning | 주의사항, 경고 |
| ❌ Error | 오류, 실패 메시지 |

## Props

<ArgsTable of={Alert} />

## 변형 (Variants)

### Info
<Canvas>
  <Story name="Info">
    <Alert variant="info" title="알림">
      새로운 기능이 추가되었습니다. 설정에서 확인하세요.
    </Alert>
  </Story>
</Canvas>

### Success
<Canvas>
  <Story name="Success">
    <Alert variant="success" title="완료" closable>
      데이터가 성공적으로 저장되었습니다.
    </Alert>
  </Story>
</Canvas>

### Warning
<Canvas>
  <Story name="Warning">
    <Alert variant="warning" title="경고" icon="⚠️">
      이 작업은 되돌릴 수 없습니다.
    </Alert>
  </Story>
</Canvas>

### Error
<Canvas>
  <Story name="Error">
    <Alert variant="error" title="오류" closable>
      네트워크 연결을 확인해주세요.
    </Alert>
  </Story>
</Canvas>

## 색상 팔레트

<ColorPalette>
  <ColorItem
    title="Info"
    subtitle="정보 알림"
    colors={{ Background: '#EFF6FF', Border: '#3B82F6', Text: '#1E40AF' }}
  />
  <ColorItem
    title="Success"
    subtitle="성공 알림"
    colors={{ Background: '#F0FDF4', Border: '#22C55E', Text: '#15803D' }}
  />
  <ColorItem
    title="Warning"
    subtitle="경고 알림"
    colors={{ Background: '#FFFBEB', Border: '#F59E0B', Text: '#92400E' }}
  />
  <ColorItem
    title="Error"
    subtitle="오류 알림"
    colors={{ Background: '#FEF2F2', Border: '#EF4444', Text: '#991B1B' }}
  />
</ColorPalette>

## 사용 예제

### 기본 사용
<Source
  language="tsx"
  code={Alert \`
<Alert variant="info">
  일반 정보 메시지
</Alert>
\`}
/>

### 제목 포함
<Source
  language="tsx"
  code={\`
<Alert variant="success" title="성공">
  작업이 완료되었습니다.
</Alert>
\`}
/>

### 닫기 버튼
<Source
  language="tsx"
  code={\`
<Alert 
  variant="warning" 
  closable 
  onClose={() => console.log('Closed')}
>
  이 알림을 닫을 수 있습니다.
</Alert>
\`}
/>

## 접근성 (A11y)

- ✅ ARIA role="alert" 적용
- ✅ 스크린 리더 지원
- ✅ 키보드 네비게이션
- ✅ 색상 대비 WCAG AA 준수

<Canvas>
  <Story name="Accessibility">
    <Alert 
      variant="info"
      role="alert"
      aria-live="polite"
    >
      접근성이 고려된 알림입니다.
    </Alert>
  </Story>
</Canvas>

## 디자인 토큰

| Token | Value |
|-------|-------|
| --alert-padding | 16px |
| --alert-border-radius | 8px |
| --alert-border-width | 1px |
| --alert-font-size | 14px |

## 관련 컴포넌트

- [Toast](/docs/feedback-toast--docs) - 일시적 알림
- [Modal](/docs/overlay-modal--docs) - 중요한 메시지
- [Notification](/docs/feedback-notification--docs) - 시스템 알림`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ MDX Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>✓ 명확한 제목 계층 구조</li>
                            <li>✓ 실용적인 코드 예제 제공</li>
                            <li>✓ Do/Don&apos;t 가이드 추가</li>
                            <li>✓ 접근성 정보 포함</li>
                            <li>✓ 관련 컴포넌트 링크</li>
                            <li>✓ 시각적 요소 (표, 아이콘)</li>
                            <li>✓ 사용 시나리오 설명</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="font-semibold text-purple-900 mb-3">📚 문서 구조 템플릿</h3>
                        <ul className="space-y-2 text-sm text-purple-800">
                            <li>1. 개요 및 설명</li>
                            <li>2. 시각적 예제 (Canvas)</li>
                            <li>3. Props 테이블</li>
                            <li>4. 사용 예제</li>
                            <li>5. 변형 (Variants)</li>
                            <li>6. 접근성 가이드</li>
                            <li>7. 디자인 토큰</li>
                            <li>8. 관련 리소스</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🎯 MDX vs TSX Story</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                            <h4 className="font-semibold text-blue-900 mb-2">MDX 사용 시기</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>✅ 풍부한 문서화 필요</li>
                                <li>✅ 디자인 가이드라인</li>
                                <li>✅ 사용 예제 많음</li>
                                <li>✅ 마케팅/랜딩 페이지</li>
                                <li>✅ 팀 온보딩 가이드</li>
                            </ul>
                        </div>

                        <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                            <h4 className="font-semibold text-green-900 mb-2">TSX 사용 시기</h4>
                            <ul className="text-sm text-green-800 space-y-1">
                                <li>✅ 복잡한 로직</li>
                                <li>✅ 동적 Story 생성</li>
                                <li>✅ TypeScript 타입 안정성</li>
                                <li>✅ 테스트 중심</li>
                                <li>✅ 빠른 프로토타입</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">💡 고급 팁</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                        <div>
                            <strong>커스텀 컴포넌트 임포트</strong>
                            <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                {`import { CustomBadge } from '../Badge';`}
                            </div>
                            <p className="mt-1">MDX 안에서 어떤 React 컴포넌트든 사용 가능</p>
                        </div>
                        <div>
                            <strong>다국어 문서</strong>
                            <div className="bg-white p-2 rounded mt-1 font-mono text-xs">
                                Button.stories.ko.mdx<br />
                                Button.stories.en.mdx
                            </div>
                            <p className="mt-1">언어별 문서 파일 분리</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
