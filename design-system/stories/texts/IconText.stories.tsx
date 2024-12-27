import type { Meta, StoryObj } from '@storybook/react';
import IconText from '../../ui/texts/IconText';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'texts/IconText',
  component: IconText,
  parameters: {
    layout: 'centered',
  },
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
      description: '카드 버튼에 보이는 아이콘',
      defaultValue: '../icons/calendar.png',
    },
  },
} satisfies Meta<typeof IconText>;

export default meta;

export const SmallSize: Story = {
  args: {
    size: 'small',
    iconPath: '../icons/calendar.png',
    children: 'IconText',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'medium',
    iconPath: '../icons/calendar.png',
    children: 'IconText',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
    iconPath: '../icons/calendar.png',
    children: 'IconText',
  },
};
