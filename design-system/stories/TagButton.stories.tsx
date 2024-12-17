import type { Meta, StoryObj } from '@storybook/react';
import TagButton from '../ui/TagButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/TagButton',
  component: TagButton,
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
    children: {
      control: 'text',
      description: '버튼 내부 내용',
      defaultValue: 'Tag Button',
    },
    isChecked: {
      control: 'boolean',
      description: '버튼 활성화 상태',
      defaultValue: false,
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof TagButton>;

export default meta;

export const Default: Story = {
  args: {
    children: 'Tag Button',
    isChecked: false,
    onClick: () => console.log('TagButton clicked'),
  },
};

export const Active: Story = {
  args: {
    children: 'Active Button',
    isChecked: true,
    onClick: () => console.log('Active TagButton clicked'),
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive Button',
    isChecked: false,
    onClick: () => console.log('Inactive TagButton clicked'),
  },
};
