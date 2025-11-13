import React from 'react';

export interface ButtonProps {
  /**
   * 버튼의 텍스트 (label 또는 children 중 하나 사용)
   */
  label?: string;
  /**
   * 버튼의 자식 요소
   */
  children?: React.ReactNode;
  /**
   * 버튼의 크기
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * 버튼의 스타일 변형
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  /**
   * 비활성화 여부
   */
  disabled?: boolean;
  /**
   * 추가 CSS 클래스
   */
  className?: string;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

const sizeClasses = {
  small: 'px-3 py-1.5 text-sm',
  medium: 'px-4 py-2 text-base',
  large: 'px-6 py-3 text-lg',
};

const variantClasses = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
};

/**
 * 재사용 가능한 버튼 컴포넌트
 * 
 * 다양한 크기와 스타일 변형을 지원합니다.
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  size = 'medium',
  variant = 'primary',
  disabled = false,
  className = '',
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-semibold transition-colors
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children || label}
    </button>
  );
};
