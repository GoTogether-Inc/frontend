import type { Meta, StoryObj } from '@storybook/react';
import TextButton from '../../ui/Button/TextButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/TextButton',
  component: TextButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 내부 내용',
      defaultValue: 'Text Button',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러',
    },
    className: {
      control: 'text',
      description: '추가 스타일링 클래스',
    },
  },
} satisfies Meta<typeof TextButton>;

export default meta;

export const Default: Story = {
  args: {
    label: 'Text Button',
    onClick: () => console.log('TextButton clicked'),
  },
};
