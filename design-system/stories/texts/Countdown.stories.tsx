import type { Meta, StoryObj } from '@storybook/react';
import Countdown from '../../ui/texts/Countdown';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Texts/Countdown',
  component: Countdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '카운트다운 내부 내용',
      defaultValue: 'Countdown',
    },
    isChecked: {
      control: 'boolean',
      description: '활성화 상태',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof Countdown>;

export default meta;

export const Default: Story = {
  args: {
    children: 'D-5',
    isChecked: true,
  },
};

export const Active: Story = {
  args: {
    children: 'D-5',
    isChecked: true,
  },
};

export const Inactive: Story = {
  args: {
    children: '종료',
    isChecked: false,
  },
};
