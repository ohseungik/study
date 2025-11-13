import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '사용자 입력을 받기 위한 Input 컴포넌트입니다. 라벨과 에러 메시지를 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
      description: 'Input의 타입',
    },
    label: {
      control: 'text',
      description: 'Input 위에 표시될 라벨',
    },
    placeholder: {
      control: 'text',
      description: 'Input의 placeholder 텍스트',
    },
    error: {
      control: 'text',
      description: '에러 메시지',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Input
 */
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

/**
 * 라벨이 있는 Input
 */
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

/**
 * 에러 상태의 Input
 */
export const WithError: Story = {
  args: {
    label: '이메일',
    placeholder: 'email@example.com',
    error: '올바른 이메일 형식이 아닙니다',
    value: 'invalid-email',
  },
};

/**
 * 비활성화된 Input
 */
export const Disabled: Story = {
  args: {
    label: '비활성화된 필드',
    placeholder: '입력 불가',
    disabled: true,
    value: '수정할 수 없습니다',
  },
};

/**
 * 이메일 Input
 */
export const Email: Story = {
  args: {
    type: 'email',
    label: '이메일',
    placeholder: 'email@example.com',
  },
};

/**
 * 비밀번호 Input
 */
export const Password: Story = {
  args: {
    type: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력하세요',
  },
};

/**
 * 숫자 Input
 */
export const Number: Story = {
  args: {
    type: 'number',
    label: '나이',
    placeholder: '숫자만 입력',
  },
};

/**
 * 인터랙티브 예제 - 실시간 값 변경
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="w-80">
        <Input
          label="실시간 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="입력해보세요"
        />
        <p className="mt-2 text-sm text-gray-600">
          입력한 값: <strong>{value || '(없음)'}</strong>
        </p>
      </div>
    );
  },
};

/**
 * 폼 예제
 */
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });
    
    return (
      <div className="w-96 space-y-4">
        <Input
          label="이름"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="홍길동"
        />
        <Input
          type="email"
          label="이메일"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
        />
        <Input
          type="password"
          label="비밀번호"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="8자 이상"
        />
      </div>
    );
  },
};
