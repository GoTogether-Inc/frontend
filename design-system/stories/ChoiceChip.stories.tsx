import type { Meta, StoryObj } from '@storybook/react';
import ChoiceChip from '../ui/ChoiceChip';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'UI/ChoiceChip',
  component: ChoiceChip,
  parameters: {
    layout: 'centered',
  },
  decorators: [Story => <Story />],
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: '선택 가능한 옵션 리스트',
      defaultValue: ['Option 1', 'Option 2'],
    },
    onSelect: {
      action: 'selected',
      description: '선택된 옵션의 값을 반환하는 핸들러',
    },
  },
} satisfies Meta<typeof ChoiceChip>;

export default meta;

export const TwoOptions: Story = {
  args: {
    label: '',
    options: ['선착순', '주최자 선별'],
    onSelect: (selected: string) => {
      console.log(`Selected option: ${selected}`);
    },
  },
};

export const ThreeOptions: Story = {
  args: {
    label: '',
    options: ['객관식', '주관식', '여러 개 선택'],
    onSelect: (selected: string) => {
      console.log(`Selected option: ${selected}`);
    },
  },
};
