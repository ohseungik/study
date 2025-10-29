'use client';

/**
 * Form Actions 예제 - 폼과 연동된 Actions
 */

import { useActionState } from 'react';
import Link from 'next/link';

// 폼 상태 타입 정의
type FormState = {
    success: boolean;
    message: string;
    errors?: {
        [key: string]: string[];
    };
    data?: {
        name?: string;
        email?: string;
        phone?: string;
        category?: string;
    };
};

// 사용자 등록 액션
async function registerUser(prevState: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // 유효성 검사
    const errors: { [key: string]: string[] } = {};

    if (!name || name.length < 2) {
        errors.name = ['이름은 2글자 이상이어야 합니다.'];
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = ['올바른 이메일 형식이 아닙니다.'];
    }

    if (!password || password.length < 6) {
        errors.password = ['비밀번호는 6글자 이상이어야 합니다.'];
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = ['비밀번호가 일치하지 않습니다.'];
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: '입력한 정보를 다시 확인해주세요.',
            errors,
        };
    }

    // 서버 작업 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 랜덤으로 실패 시뮬레이션 (20% 확률)
    if (Math.random() < 0.2) {
        return {
            success: false,
            message: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
            errors: { server: ['일시적인 서버 오류'] },
        };
    }

    return {
        success: true,
        message: `${name}님, 회원가입이 완료되었습니다!`,
        data: { name, email },
    };
}

// 연락처 저장 액션
async function saveContact(prevState: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const category = formData.get('category') as string;

    const errors: { [key: string]: string[] } = {};

    if (!name || name.length < 2) {
        errors.name = ['이름을 입력해주세요.'];
    }

    if (!phone || !/^[\d-+\s()]{10,}$/.test(phone.replace(/\s/g, ''))) {
        errors.phone = ['올바른 전화번호를 입력해주세요.'];
    }

    if (!category) {
        errors.category = ['카테고리를 선택해주세요.'];
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            message: '입력 정보를 확인해주세요.',
            errors,
        };
    }

    // 서버 작업 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        success: true,
        message: '연락처가 저장되었습니다.',
        data: { name, phone, category },
    };
}

// 회원가입 폼 컴포넌트
function RegisterForm() {
    const [state, formAction, pending] = useActionState(registerUser, {
        success: false,
        message: '',
    });

    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">👤 회원가입</h3>
            
            {state.message && (
                <div className={`p-4 rounded-lg mb-4 ${
                    state.success 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                    <p className="font-medium">{state.message}</p>
                    {state.success && state.data && (
                        <div className="mt-2 text-sm">
                            <p>등록된 정보:</p>
                            <ul className="list-disc list-inside">
                                <li>이름: {state.data.name}</li>
                                <li>이메일: {state.data.email}</li>
                            </ul>
                        </div>
                    )}
                </div>
            )}

            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="홍길동"
                        disabled={pending}
                    />
                    {state.errors?.name && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="email"
                        type="email"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="hong@example.com"
                        disabled={pending}
                    />
                    {state.errors?.email && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        비밀번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="password"
                        type="password"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="6글자 이상"
                        disabled={pending}
                    />
                    {state.errors?.password && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.password[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        비밀번호 확인 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="비밀번호 재입력"
                        disabled={pending}
                    />
                    {state.errors?.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.confirmPassword[0]}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className={`w-full px-4 py-3 rounded-lg font-medium ${
                        pending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {pending ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            가입 처리 중...
                        </span>
                    ) : (
                        '회원가입'
                    )}
                </button>
            </form>
        </div>
    );
}

// 연락처 저장 폼 컴포넌트
function ContactForm() {
    const [state, formAction, pending] = useActionState(saveContact, {
        success: false,
        message: '',
    });

    return (
        <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">📞 연락처 저장</h3>
            
            {state.message && (
                <div className={`p-4 rounded-lg mb-4 ${
                    state.success 
                        ? 'bg-green-50 border border-green-200 text-green-800' 
                        : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                    <p className="font-medium">{state.message}</p>
                </div>
            )}

            <form action={formAction} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="name"
                        type="text"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="김철수"
                        disabled={pending}
                    />
                    {state.errors?.name && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        전화번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="010-1234-5678"
                        disabled={pending}
                    />
                    {state.errors?.phone && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.phone[0]}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        카테고리 <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="category"
                        className={`w-full p-3 border rounded-lg ${
                            state.errors?.category ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        disabled={pending}
                        defaultValue=""
                    >
                        <option value="">선택해주세요</option>
                        <option value="family">가족</option>
                        <option value="friend">친구</option>
                        <option value="work">직장</option>
                        <option value="business">업무</option>
                    </select>
                    {state.errors?.category && (
                        <p className="mt-1 text-sm text-red-600">{state.errors.category[0]}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className={`w-full px-4 py-3 rounded-lg font-medium ${
                        pending
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                    {pending ? (
                        <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            저장 중...
                        </span>
                    ) : (
                        '연락처 저장'
                    )}
                </button>
            </form>
        </div>
    );
}

export default function FormActionsPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Form Actions 예제</h1>
                <Link href="/react19-features/actions" className="text-blue-600 hover:text-blue-800">
                    ← Actions 예제로 돌아가기
                </Link>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">🎯 핵심 포인트</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>• <code className="bg-white px-2 py-1 rounded">useActionState</code>로 폼 상태와 액션 연동</li>
                    <li>• 자동 로딩 상태 관리 (<code className="bg-white px-2 py-1 rounded">pending</code>)</li>
                    <li>• 서버 응답을 기반으로 한 에러 처리와 성공 메시지</li>
                    <li>• 유효성 검사 결과를 필드별로 표시</li>
                </ul>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <RegisterForm />
                <ContactForm />
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 Form Actions 패턴</h4>
                <pre className="text-sm text-yellow-800 overflow-x-auto">
{`// 1. 액션 함수 정의 (prevState를 받음)
async function submitForm(prevState, formData) {
    // 유효성 검사
    const errors = validate(formData);
    if (errors) {
        return { success: false, errors };
    }
    
    // 서버 작업 수행
    await saveToDatabase(formData);
    return { success: true, message: '저장 완료!' };
}

// 2. useActionState로 상태 관리
const [state, formAction, pending] = useActionState(submitForm, {
    success: false,
    message: ''
});

// 3. 폼에서 사용
<form action={formAction}>
    <input name="email" />
    <button disabled={pending}>
        {pending ? '처리 중...' : '제출'}
    </button>
</form>`}
                </pre>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">✨ 기존 방식과의 차이점</h4>
                <div className="grid gap-4 md:grid-cols-2 text-sm">
                    <div>
                        <h5 className="font-medium text-blue-900 mb-2">기존 방식 (useState + fetch)</h5>
                        <ul className="text-blue-800 space-y-1">
                            <li>• 수동 로딩 상태 관리</li>
                            <li>• 복잡한 에러 처리</li>
                            <li>• 폼 제출 이벤트 핸들링</li>
                            <li>• FormData 수동 생성</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h5 className="font-medium text-blue-900 mb-2">Form Actions (React 19)</h5>
                        <ul className="text-blue-800 space-y-1">
                            <li>• 자동 로딩 상태 (<code>pending</code>)</li>
                            <li>• 구조화된 에러 응답</li>
                            <li>• 선언적 폼 처리</li>
                            <li>• 자동 FormData 처리</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}