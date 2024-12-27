import { Meta, StoryObj } from '@storybook/react';
import HashTag from '../../ui/texts/HashTag';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Texts/HashTag',
  component: HashTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      defaultValue: '설명 텍스트',
      description: '텍스트',
      control: 'text',
    },
  },
} satisfies Meta<typeof HashTag>;

export default meta;

export const Default: Story = {
  args: {
    children: 'text',
    onClick: () => console.log('해시태그 삭제'),
  },
};
