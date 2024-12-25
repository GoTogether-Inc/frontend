import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '../../ui/Button/TextButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/TextButton',
  component: TextButton,
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
      defaultValue: 'Text Button',
    },
    color: {
      control: 'color',
      description: '버튼 텍스트 색상',
      defaultValue: '#444444', // 기본값으로 파란색
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof TextButton>;

export default meta;

export const Default: Story = {
  args: {
    children: 'Text Button',
    color: '#444444', // 기본 검은색
    onClick: () => console.log('TextButton clicked'),
  },
};
