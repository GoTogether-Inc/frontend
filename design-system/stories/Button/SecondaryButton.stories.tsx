import type { Meta, StoryObj } from '@storybook/react';
import SecondaryButton from '../../ui/buttons/SecondaryButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/SecondaryButton',
  component: SecondaryButton,
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
} satisfies Meta<typeof SecondaryButton>;

export default meta;

export const Default: Story = {
  args: {
    label: 'Default Button',
    color: 'pink',
  },
};

export const Pink: Story = {
  args: {
    label: '전송하기',
    color: 'pink',
  },
};

export const Black: Story = {
  args: {
    label: '로그인',
    color: 'black',
  },
};
