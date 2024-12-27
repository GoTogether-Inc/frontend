import type { Meta, StoryObj } from '@storybook/react';
import DayCounter from '../../ui/texts/DayCounter';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Texts/DayCounter',
  component: DayCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부 내용',
      defaultValue: 'DayCounter',
    },
    isChecked: {
      control: 'boolean',
      description: '버튼 활성화 상태',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof DayCounter>;

export default meta;

export const Default: Story = {
  args: {
    children: 'DayCounter',
    isChecked: true,
    className: '',
  },
};

export const Active: Story = {
  args: {
    children: 'Active DayCounter',
    isChecked: true,
    className: '',
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive DayCounter',
    isChecked: false,
    className: '',
  },
};
