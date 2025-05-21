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
    options: [
      { label: '선착순', value: 'FIRST_COME' },
      { label: '주최자 선별', value: 'SELECTION' },
    ],
    onSelect: (selected: string) => {
      console.log(`Selected option: ${selected}`);
    },
  },
};

export const ThreeOptions: Story = {
  args: {
    label: '',
    options: [
      { label: '객관식', value: 'MULTIPLE_CHOICE' },
      { label: '주관식', value: 'SUBJECTIVE' },
      { label: '여러 개 선택', value: 'MULTI_SELECT' },
    ],
    onSelect: (selected: string) => {
      console.log(`Selected option: ${selected}`);
    },
  },
};
