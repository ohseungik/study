import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from './Button';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '컨텐츠를 시각적으로 그룹화하는 Card 컴포넌트입니다. 헤더, 본문, 푸터를 포함할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '카드 헤더 제목',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning'],
      description: '카드 배경색 변형',
    },
    hoverable: {
      control: 'boolean',
      description: '호버 효과 여부',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 Card
 */
export const Default: Story = {
  args: {
    children: <p>카드의 기본 컨텐츠입니다.</p>,
  },
};

/**
 * 제목이 있는 Card
 */
export const WithTitle: Story = {
  args: {
    title: '카드 제목',
    children: (
      <div>
        <p>제목이 있는 카드입니다.</p>
        <p className="mt-2 text-gray-600">부가 설명을 추가할 수 있습니다.</p>
      </div>
    ),
  },
};

/**
 * 푸터가 있는 Card
 */
export const WithFooter: Story = {
  args: {
    title: '프로필 카드',
    children: (
      <div>
        <p className="text-gray-700">이름: 홍길동</p>
        <p className="text-gray-700">직책: 프론트엔드 개발자</p>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button size="small">연락하기</Button>
        <Button size="small" variant="secondary">더보기</Button>
      </div>
    ),
  },
};

/**
 * Primary 변형
 */
export const Primary: Story = {
  args: {
    title: 'Primary 카드',
    variant: 'primary',
    children: <p>중요한 정보를 표시하는 카드입니다.</p>,
  },
};

/**
 * Success 변형
 */
export const Success: Story = {
  args: {
    title: '성공 메시지',
    variant: 'success',
    children: <p>작업이 성공적으로 완료되었습니다!</p>,
  },
};

/**
 * Warning 변형
 */
export const Warning: Story = {
  args: {
    title: '경고',
    variant: 'warning',
    children: <p>이 작업은 되돌릴 수 없습니다. 신중히 결정하세요.</p>,
  },
};

/**
 * 호버 효과가 있는 Card
 */
export const Hoverable: Story = {
  args: {
    title: '클릭 가능한 카드',
    hoverable: true,
    children: <p>마우스를 올려보세요!</p>,
  },
};

/**
 * 복잡한 컨텐츠 예제
 */
export const ComplexContent: Story = {
  args: {
    title: '상품 정보',
    children: (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">이미지</span>
          </div>
          <div>
            <h4 className="font-semibold">프리미엄 헤드폰</h4>
            <p className="text-gray-600">고품질 사운드</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">₩299,000</span>
          <span className="text-sm text-gray-500">재고: 5개</span>
        </div>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button className="flex-1">장바구니</Button>
        <Button variant="secondary" className="flex-1">찜하기</Button>
      </div>
    ),
  },
};

/**
 * 그리드 레이아웃 예제
 */
export const GridLayout = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <Card title="통계 #1" variant="primary">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-sm text-gray-600 mt-1">총 방문자</p>
        </div>
      </Card>
      <Card title="통계 #2" variant="success">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600">567</p>
          <p className="text-sm text-gray-600 mt-1">신규 가입</p>
        </div>
      </Card>
      <Card title="통계 #3" variant="warning">
        <div className="text-center">
          <p className="text-3xl font-bold text-yellow-600">89</p>
          <p className="text-sm text-gray-600 mt-1">대기 중</p>
        </div>
      </Card>
      <Card title="통계 #4">
        <div className="text-center">
          <p className="text-3xl font-bold text-gray-800">42</p>
          <p className="text-sm text-gray-600 mt-1">완료됨</p>
        </div>
      </Card>
    </div>
  ),
};
