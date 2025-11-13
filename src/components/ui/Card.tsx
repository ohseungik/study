import React from 'react';

export interface CardProps {
  /**
   * 카드 헤더 제목
   */
  title?: string;
  /**
   * 카드의 메인 컨텐츠
   */
  children: React.ReactNode;
  /**
   * 카드 푸터 내용
   */
  footer?: React.ReactNode;
  /**
   * 카드 배경색 변형
   */
  variant?: 'default' | 'primary' | 'success' | 'warning';
  /**
   * 호버 효과 여부
   */
  hoverable?: boolean;
}

/**
 * 컨텐츠를 그룹화하는 Card 컴포넌트
 * 
 * 헤더, 본문, 푸터를 포함할 수 있는 카드 레이아웃입니다.
 */
export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  variant = 'default',
  hoverable = false,
}) => {
  const variantStyles = {
    default: 'bg-white border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    success: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div
      className={`
        rounded-lg border shadow-sm overflow-hidden transition-all
        ${variantStyles[variant]}
        ${hoverable ? 'hover:shadow-md hover:scale-[1.02] cursor-pointer' : ''}
      `}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};
