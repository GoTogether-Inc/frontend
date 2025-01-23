import type { Meta, StoryObj } from '@storybook/react';
import TertiaryButton from '../../ui/buttons/TertiaryButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/TertiaryButton',
  component: TertiaryButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [Story => <Story />],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
      defaultValue: 'Button',
    },
    color: {
      control: 'radio',
      options: ['pink', 'black'],
      description: '버튼 색상',
      defaultValue: 'pink',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러',
    },
  },
} satisfies Meta<typeof TertiaryButton>;

export default meta;

export const Default: Story = {
  args: {
    label: 'Default Button',
    type: 'button',
    color: 'pink',
  },
};

export const Pink: Story = {
  args: {
    label: '전송하기',
    type: 'button',
    color: 'pink',
  },
};

export const Black: Story = {
  args: {
    label: '로그인',
    type: 'button',
    color: 'black',
  },
};
