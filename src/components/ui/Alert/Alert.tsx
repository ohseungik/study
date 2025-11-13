import React from 'react';

export interface AlertProps {
  /**
   * 알림 변형
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /**
   * 알림 제목
   */
  title?: string;
  /**
   * 알림 내용
   */
  children: React.ReactNode;
  /**
   * 닫기 버튼 표시 여부
   */
  closable?: boolean;
  /**
   * 닫기 이벤트 핸들러
   */
  onClose?: () => void;
  /**
   * 아이콘 (커스텀)
   */
  icon?: React.ReactNode;
}

/**
 * 사용자에게 정보를 전달하는 Alert 컴포넌트
 * 
 * 다양한 상태(info, success, warning, error)를 지원합니다.
 */
export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  closable = false,
  onClose,
  icon,
}) => {
  const variantStyles = {
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-900',
      icon: '💡',
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-900',
      icon: '✅',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-900',
      icon: '⚠️',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-900',
      icon: '❌',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`${styles.bg} border rounded-lg p-4 ${styles.text} relative`}>
      <div className="flex items-start gap-3">
        <div className="text-xl shrink-0">
          {icon || styles.icon}
        </div>
        
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold mb-1">{title}</h4>
          )}
          <div className="text-sm">{children}</div>
        </div>
        
        {closable && (
          <button
            onClick={onClose}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
