'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';

export default function StorybookDemoPage() {
    const [buttonClicks, setButtonClicks] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary' | 'danger' | 'outline'>('primary');
    const [selectedSize, setSelectedSize] = useState<'small' | 'medium' | 'large'>('medium');

    const handleEmailBlur = () => {
        if (email && !email.includes('@')) {
            setEmailError('올바른 이메일 형식이 아닙니다.');
        } else {
            setEmailError('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Storybook 컴포넌트 데모</h1>
                    <p className="text-gray-600 mb-4">
                        실제로 동작하는 UI 컴포넌트들을 확인하세요.
                    </p>
                    <div className="flex gap-3">
                        <Link href="/" className="text-blue-600 hover:text-blue-800">
                            ← 홈으로
                        </Link>
                        <span className="text-gray-400">|</span>
                        <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                            Storybook 가이드
                        </Link>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-bold mb-2 text-blue-900">💡 이 페이지는?</h2>
                    <p className="text-blue-800">
                        Storybook에서 작성한 UI 컴포넌트들을 실제 애플리케이션에서 
                        어떻게 사용하는지 보여주는 라이브 데모입니다.
                    </p>
                </div>

                {/* Button 데모 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">🔘 Button 컴포넌트</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card title="기본 버튼 변형" variant="default">
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    <Button 
                                        label="Primary" 
                                        variant="primary"
                                        onClick={() => setButtonClicks(prev => prev + 1)}
                                    />
                                    <Button 
                                        label="Secondary" 
                                        variant="secondary"
                                        onClick={() => setButtonClicks(prev => prev + 1)}
                                    />
                                    <Button 
                                        label="Danger" 
                                        variant="danger"
                                        onClick={() => setButtonClicks(prev => prev + 1)}
                                    />
                                    <Button 
                                        label="Outline" 
                                        variant="outline"
                                        onClick={() => setButtonClicks(prev => prev + 1)}
                                    />
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <p className="text-sm text-gray-700">
                                        총 클릭 수: <strong className="text-blue-600">{buttonClicks}회</strong>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card title="크기 변형" variant="default">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-3 items-start">
                                    <Button label="Small Button" variant="primary" size="small" />
                                    <Button label="Medium Button" variant="primary" size="medium" />
                                    <Button label="Large Button" variant="primary" size="large" />
                                </div>
                            </div>
                        </Card>

                        <Card title="인터랙티브 버튼 생성기" variant="primary">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">변형 선택</label>
                                    <div className="flex gap-2">
                                        {(['primary', 'secondary', 'danger', 'outline'] as const).map((variant) => (
                                            <button
                                                key={variant}
                                                onClick={() => setSelectedVariant(variant)}
                                                className={`px-3 py-1 rounded text-sm ${
                                                    selectedVariant === variant
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white border border-gray-300'
                                                }`}
                                            >
                                                {variant}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">크기 선택</label>
                                    <div className="flex gap-2">
                                        {(['small', 'medium', 'large'] as const).map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-3 py-1 rounded text-sm ${
                                                    selectedSize === size
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white border border-gray-300'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <p className="text-sm text-gray-700 mb-3">미리보기:</p>
                                    <Button 
                                        label="Custom Button" 
                                        variant={selectedVariant}
                                        size={selectedSize}
                                    />
                                </div>
                            </div>
                        </Card>

                        <Card title="버튼 상태" variant="default">
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">활성화 상태</p>
                                    <Button label="Active Button" variant="primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">비활성화 상태</p>
                                    <Button label="Disabled Button" variant="primary" disabled />
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-6 bg-gray-100 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">📝 코드 예제</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-xs">
{`import { Button } from '@/components/ui/Button';

// 기본 사용
<Button label="Click me" variant="primary" size="medium" />

// 이벤트 핸들러와 함께
<Button 
  label="Submit" 
  variant="primary"
  onClick={() => console.log('Clicked!')}
/>

// 비활성화 상태
<Button label="Disabled" variant="primary" disabled />`}
                        </pre>
                    </div>
                </div>

                {/* Input 데모 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">📝 Input 컴포넌트</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card title="기본 Input" variant="default">
                            <div className="space-y-4">
                                <Input 
                                    label="이름"
                                    placeholder="이름을 입력하세요"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                />
                                <div className="bg-gray-100 p-3 rounded">
                                    <p className="text-sm text-gray-700">
                                        입력값: <strong className="text-blue-600">{inputValue || '(없음)'}</strong>
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card title="이메일 검증" variant="default">
                            <div className="space-y-4">
                                <Input 
                                    type="email"
                                    label="이메일"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                    }}
                                    onBlur={handleEmailBlur}
                                    error={emailError}
                                />
                                <p className="text-xs text-gray-500">
                                    💡 포커스를 벗어나면 이메일 형식을 검증합니다.
                                </p>
                            </div>
                        </Card>

                        <Card title="다양한 Input 타입" variant="default">
                            <div className="space-y-4">
                                <Input 
                                    type="text"
                                    label="텍스트"
                                    placeholder="일반 텍스트"
                                />
                                <Input 
                                    type="password"
                                    label="비밀번호"
                                    placeholder="••••••••"
                                />
                                <Input 
                                    type="number"
                                    label="숫자"
                                    placeholder="0"
                                />
                            </div>
                        </Card>

                        <Card title="Input 상태" variant="default">
                            <div className="space-y-4">
                                <Input 
                                    label="활성화"
                                    placeholder="입력 가능"
                                />
                                <Input 
                                    label="비활성화"
                                    placeholder="입력 불가"
                                    disabled
                                />
                                <Input 
                                    label="에러 상태"
                                    placeholder="에러 발생"
                                    error="필수 입력 항목입니다."
                                />
                            </div>
                        </Card>
                    </div>

                    <div className="mt-6 bg-gray-100 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">📝 코드 예제</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-xs">
{`import { Input } from '@/components/ui/Input';
import { useState } from 'react';

const [value, setValue] = useState('');
const [error, setError] = useState('');

// 기본 사용
<Input 
  label="이름"
  placeholder="이름을 입력하세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// 검증 로직과 함께
<Input 
  type="email"
  label="이메일"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onBlur={() => {
    if (!value.includes('@')) {
      setError('올바른 이메일 형식이 아닙니다.');
    }
  }}
  error={error}
/>`}
                        </pre>
                    </div>
                </div>

                {/* Card 데모 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">🎴 Card 컴포넌트</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card 
                            title="기본 카드" 
                            variant="default"
                        >
                            <p className="text-gray-700">
                                이것은 기본 카드입니다. 컨텐츠를 자유롭게 배치할 수 있습니다.
                            </p>
                        </Card>

                        <Card 
                            title="Primary 카드" 
                            variant="primary"
                        >
                            <p className="text-gray-700">
                                중요한 정보를 강조하는 파란색 배경의 카드입니다.
                            </p>
                        </Card>

                        <Card 
                            title="Success 카드" 
                            variant="success"
                        >
                            <p className="text-gray-700">
                                성공 메시지나 긍정적인 정보를 표시하는 녹색 카드입니다.
                            </p>
                        </Card>

                        <Card 
                            title="Warning 카드" 
                            variant="warning"
                        >
                            <p className="text-gray-700">
                                주의가 필요한 정보를 표시하는 노란색 카드입니다.
                            </p>
                        </Card>

                        <Card 
                            title="Footer가 있는 카드"
                            variant="default"
                            footer={
                                <div className="flex justify-end gap-2">
                                    <Button label="취소" variant="outline" size="small" />
                                    <Button label="확인" variant="primary" size="small" />
                                </div>
                            }
                        >
                            <p className="text-gray-700">
                                이 카드는 하단에 액션 버튼을 포함하고 있습니다.
                            </p>
                        </Card>

                        <Card 
                            title="Hoverable 카드"
                            variant="default"
                            hoverable
                        >
                            <p className="text-gray-700">
                                마우스를 올리면 hover 효과가 나타납니다. 클릭 가능한 카드에 유용합니다.
                            </p>
                        </Card>

                        <Card title="폼이 포함된 카드" variant="primary">
                            <div className="space-y-4">
                                <Input 
                                    label="사용자 이름"
                                    placeholder="username"
                                />
                                <Input 
                                    type="password"
                                    label="비밀번호"
                                    placeholder="••••••••"
                                />
                                <Button label="로그인" variant="primary" className="w-full" />
                            </div>
                        </Card>

                        <Card title="복잡한 컨텐츠" variant="default">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                        A
                                    </div>
                                    <div>
                                        <p className="font-semibold">John Doe</p>
                                        <p className="text-sm text-gray-500">john@example.com</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700">
                                    카드 안에는 어떤 복잡한 레이아웃도 넣을 수 있습니다.
                                </p>
                                <div className="flex gap-2">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">React</span>
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">TypeScript</span>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-6 bg-gray-100 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">📝 코드 예제</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-xs">
{`import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

// 기본 카드
<Card title="제목" variant="default">
  <p>카드 내용</p>
</Card>

// Footer가 있는 카드
<Card 
  title="확인 필요"
  variant="primary"
  footer={
    <div className="flex gap-2">
      <Button label="취소" variant="outline" />
      <Button label="확인" variant="primary" />
    </div>
  }
>
  <p>이 작업을 계속하시겠습니까?</p>
</Card>

// Hoverable 카드
<Card title="클릭 가능" hoverable>
  <p>이 카드는 클릭할 수 있습니다.</p>
</Card>`}
                        </pre>
                    </div>
                </div>

                {/* Alert 데모 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">🔔 Alert 컴포넌트</h2>
                    
                    <div className="space-y-4 mb-6">
                        <Alert variant="info" title="정보">
                            새로운 기능이 추가되었습니다. 설정에서 확인하세요.
                        </Alert>
                        
                        <Alert variant="success" title="성공" closable onClose={() => alert('Alert closed!')}>
                            데이터가 성공적으로 저장되었습니다.
                        </Alert>
                        
                        <Alert variant="warning" title="경고">
                            이 작업은 되돌릴 수 없습니다. 신중하게 진행하세요.
                        </Alert>
                        
                        <Alert variant="error" title="오류" closable onClose={() => alert('Error dismissed')}>
                            네트워크 연결을 확인해주세요.
                        </Alert>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card title="제목 없는 Alert" variant="default">
                            <div className="space-y-3">
                                <Alert variant="info">
                                    제목 없이 간단한 정보만 표시할 수 있습니다.
                                </Alert>
                                <Alert variant="success">
                                    작업이 완료되었습니다!
                                </Alert>
                            </div>
                        </Card>

                        <Card title="커스텀 아이콘" variant="default">
                            <div className="space-y-3">
                                <Alert variant="info" title="새 메시지" icon="📧">
                                    받은편지함에 새 메시지가 도착했습니다.
                                </Alert>
                                <Alert variant="success" title="업로드 완료" icon="📁">
                                    파일이 성공적으로 업로드되었습니다.
                                </Alert>
                            </div>
                        </Card>
                    </div>

                    <div className="mt-6 bg-gray-100 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">📝 코드 예제</h4>
                        <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-x-auto text-xs">
{`import { Alert } from '@/components/ui/Alert';

// 기본 사용
<Alert variant="info" title="알림">
  메시지 내용
</Alert>

// 닫기 버튼 포함
<Alert 
  variant="success" 
  title="성공"
  closable
  onClose={() => console.log('Closed')}
>
  작업이 완료되었습니다.
</Alert>

// 커스텀 아이콘
<Alert variant="info" title="새 메시지" icon="📧">
  메일함을 확인하세요.
</Alert>`}
                        </pre>
                    </div>
                </div>

                {/* 통합 예제 */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">🎯 통합 예제: 연락처 폼</h2>
                    
                    <div className="max-w-2xl mx-auto space-y-4">
                        <Alert variant="info" title="안내">
                            모든 필드를 정확히 입력해주세요. 영업일 기준 2-3일 이내에 답변드립니다.
                        </Alert>
                        
                        <Card 
                            title="문의하기" 
                            variant="default"
                            footer={
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-500">모든 필드는 필수입니다.</p>
                                    <div className="flex gap-2">
                                        <Button label="초기화" variant="outline" size="medium" />
                                        <Button label="제출" variant="primary" size="medium" />
                                    </div>
                                </div>
                            }
                        >
                            <div className="space-y-4">
                                <Input 
                                    label="이름"
                                    placeholder="홍길동"
                                />
                                <Input 
                                    type="email"
                                    label="이메일"
                                    placeholder="your@email.com"
                                />
                                <Input 
                                    label="제목"
                                    placeholder="문의 제목"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        메시지
                                    </label>
                                    <textarea 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                                        rows={4}
                                        placeholder="문의 내용을 입력하세요"
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Storybook 링크 */}
                <div className="bg-linear-to-r from-purple-50 to-blue-50 rounded-lg p-8 text-center">
                    <h3 className="text-2xl font-bold mb-3">📚 더 많은 예제를 보고 싶으신가요?</h3>
                    <p className="text-gray-700 mb-6">
                        Storybook을 실행하면 각 컴포넌트의 모든 변형과 상태를 인터랙티브하게 테스트할 수 있습니다.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/storybook-guide/basics">
                            <Button label="Storybook 시작하기" variant="primary" size="large" />
                        </Link>
                        <a 
                            href="https://storybook.js.org/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <Button label="공식 문서 보기" variant="outline" size="large" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
