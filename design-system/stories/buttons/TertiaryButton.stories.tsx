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
    type: {
      control: 'radio',
      options: ['button', 'submit'],
      description: '버튼 타입',
      defaultValue: 'button',
    },
    color: {
      control: 'radio',
      options: ['pink', 'black'],
      description: '버튼 색상',
      defaultValue: 'pink',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'], // medium 추가
      description: '버튼 크기',
      defaultValue: 'large',
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
    size: 'large',
  },
};

export const Pink: Story = {
  args: {
    label: '전송하기',
    type: 'button',
    color: 'pink',
    size: 'large',
  },
};

export const Black: Story = {
  args: {
    label: '로그인',
    type: 'button',
    color: 'black',
    size: 'large',
  },
};

export const Small: Story = {
  args: {
    label: '작은 버튼',
    type: 'button',
    color: 'pink',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    label: '중간 버튼',
    type: 'button',
    color: 'pink',
    size: 'medium',
  },
};
