import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Button 컴포넌트는 사용자 인터랙션을 위한 기본 UI 요소입니다.
 * 
 * ## 사용 예시
 * 
 * ```tsx
 * import { Button } from '@/components/ui/Button';
 * 
 * <Button label="클릭하세요" variant="primary" size="medium" />
 * ```
 */
const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기를 지원하는 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline'],
      description: '버튼의 시각적 스타일',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary 버튼 - 가장 중요한 액션에 사용
 */
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

/**
 * Secondary 버튼 - 보조 액션에 사용
 */
export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

/**
 * Danger 버튼 - 삭제 등 위험한 액션에 사용
 */
export const Danger: Story = {
  args: {
    label: 'Danger Button',
    variant: 'danger',
    size: 'medium',
  },
};

/**
 * Outline 버튼 - 경계선만 있는 스타일
 */
export const Outline: Story = {
  args: {
    label: 'Outline Button',
    variant: 'outline',
    size: 'medium',
  },
};

/**
 * Small 크기 버튼
 */
export const Small: Story = {
  args: {
    label: 'Small Button',
    variant: 'primary',
    size: 'small',
  },
};

/**
 * Large 크기 버튼
 */
export const Large: Story = {
  args: {
    label: 'Large Button',
    variant: 'primary',
    size: 'large',
  },
};

/**
 * Disabled 상태 버튼
 */
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

/**
 * 모든 크기 비교
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button label="Small" variant="primary" size="small" />
      <Button label="Medium" variant="primary" size="medium" />
      <Button label="Large" variant="primary" size="large" />
    </div>
  ),
};

/**
 * 모든 변형 비교
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button label="Primary" variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Danger" variant="danger" />
      <Button label="Outline" variant="outline" />
    </div>
  ),
};
