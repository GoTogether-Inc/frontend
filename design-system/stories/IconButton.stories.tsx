import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '../ui/IconButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="flex justify-center w-96">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '아이콘 버튼의 사이즈',
      defaultValue: 'medium',
    },
    iconPath: {
      control: 'text',
      description: '아이콘 경로 (SVG 또는 이미지 URL)',
      defaultValue: '/icons/sample-icon.svg',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

export const SmallSize: Story = {
  args: {
    size: 'small',
    iconPath: '../icons/calendar.png',
    onClick: () => console.log('Small IconButton clicked'),
  },
};

export const MediumSize: Story = {
  args: {
    size: 'medium',
    iconPath: '../icons/calendar.png',
    onClick: () => console.log('Medium IconButton clicked'),
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
    iconPath: '../icons/calendar.png',
    onClick: () => console.log('Large IconButton clicked'),
  },
};
