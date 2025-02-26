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
    size: {
      control: 'radio',
      options: ['large', 'small'],
      description: '버튼 크기',
      defaultValue: 'large',
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
    size: 'large',
  },
};

export const SmallPink: Story = {
  args: {
    label: '작은 버튼',
    color: 'pink',
    size: 'small',
  },
};

export const BigBlack: Story = {
  args: {
    label: '큰 버튼',
    color: 'black',
    size: 'large',
  },
};

export const SmallBlack: Story = {
  args: {
    label: '작은 검은 버튼',
    color: 'black',
    size: 'small',
  },
};
