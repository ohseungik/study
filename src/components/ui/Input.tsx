import React from 'react';

export interface InputProps {
  /**
   * Input의 타입
   */
  type?: 'text' | 'email' | 'password' | 'number';
  /**
   * Input의 placeholder 텍스트
   */
  placeholder?: string;
  /**
   * Input의 값
   */
  value?: string;
  /**
   * Input 라벨
   */
  label?: string;
  /**
   * 에러 메시지
   */
  error?: string;
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 값 변경 핸들러
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * 포커스 해제 핸들러
   */
  onBlur?: () => void;
}

/**
 * 폼 입력을 위한 Input 컴포넌트
 * 
 * 라벨, 에러 메시지 등을 포함한 완성형 입력 필드입니다.
 */
export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder = '',
  value,
  label,
  error,
  disabled = false,
  onChange,
  onBlur,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border transition-colors
          ${error 
            ? 'border-red-500 focus:border-red-600 focus:ring-red-200' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          focus:outline-none focus:ring-2
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
