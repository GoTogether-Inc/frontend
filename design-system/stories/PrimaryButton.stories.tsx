import type { Meta, StoryObj } from '@storybook/react';
import PrimaryButton from '../ui/PrimaryButton';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-96">
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 텍스트',
      defaultValue: '다음',
    },
    navigateTo: {
      control: 'text',
      description: '클릭 시 이동할 경로',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      defaultValue: false,
    },
    isFullWidth: {
      control: 'boolean',
      description: '버튼을 전체 너비로 설정',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: '추가적인 CSS 클래스',
    },
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;

export const Default: Story = {
  args: {
    label: '다음',
    onClick: () => console.log('Default button clicked'),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    onClick: () => console.log('This should not be logged'),
    disabled: true,
  },
};

export const WithNavigation: Story = {
  args: {
    label: '이동',
    navigateTo: '/example-path', // 경로 설정
    onClick: () => console.log('Navigating...'),
    disabled: false,
  },
};
