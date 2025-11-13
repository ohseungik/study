import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

/**
 * Alert 컴포넌트는 사용자에게 중요한 정보를 전달합니다.
 * 
 * ## 사용 시나리오
 * - 📘 Info: 일반 정보, 도움말
 * - ✅ Success: 작업 완료, 저장 성공
 * - ⚠️ Warning: 주의사항, 경고
 * - ❌ Error: 오류, 실패 메시지
 */
const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '다양한 상태를 표시하는 알림 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: '알림의 타입',
    },
    title: {
      control: 'text',
      description: '알림 제목',
    },
    closable: {
      control: 'boolean',
      description: '닫기 버튼 표시 여부',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Info 알림 - 일반 정보 전달
 */
export const Info: Story = {
  args: {
    variant: 'info',
    title: '알림',
    children: '새로운 기능이 추가되었습니다. 설정에서 확인하세요.',
  },
};

/**
 * Success 알림 - 성공 메시지
 */
export const Success: Story = {
  args: {
    variant: 'success',
    title: '완료',
    children: '데이터가 성공적으로 저장되었습니다.',
  },
};

/**
 * Warning 알림 - 주의 메시지
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: '경고',
    children: '이 작업은 되돌릴 수 없습니다.',
  },
};

/**
 * Error 알림 - 오류 메시지
 */
export const Error: Story = {
  args: {
    variant: 'error',
    title: '오류',
    children: '네트워크 연결을 확인해주세요.',
  },
};

/**
 * 제목 없는 알림
 */
export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: '제목 없이 간단한 메시지만 표시합니다.',
  },
};

/**
 * 닫기 버튼이 있는 알림
 */
export const Closable: Story = {
  args: {
    variant: 'success',
    title: '알림',
    children: '이 메시지는 닫을 수 있습니다.',
    closable: true,
    onClose: () => alert('Alert closed!'),
  },
};

/**
 * 커스텀 아이콘
 */
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: '새 메시지',
    children: '커스텀 아이콘을 사용할 수 있습니다.',
    icon: '📧',
  },
};

/**
 * 긴 내용이 있는 알림
 */
export const LongContent: Story = {
  args: {
    variant: 'warning',
    title: '중요한 알림',
    children: (
      <div>
        <p className="mb-2">
          이것은 여러 줄의 내용을 포함하는 알림입니다.
        </p>
        <p>
          알림 내용은 자유롭게 HTML을 사용할 수 있으며, 리스트나 링크도 포함할 수 있습니다.
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>첫 번째 항목</li>
          <li>두 번째 항목</li>
          <li>세 번째 항목</li>
        </ul>
      </div>
    ),
  },
};

/**
 * 모든 변형 비교
 */
export const AllVariants: Story = {
  args: {
    variant: 'info',
    children: 'Placeholder',
  },
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Info">
        일반 정보 메시지입니다.
      </Alert>
      <Alert variant="success" title="Success">
        성공적으로 완료되었습니다.
      </Alert>
      <Alert variant="warning" title="Warning">
        주의가 필요합니다.
      </Alert>
      <Alert variant="error" title="Error">
        오류가 발생했습니다.
      </Alert>
    </div>
  ),
};
