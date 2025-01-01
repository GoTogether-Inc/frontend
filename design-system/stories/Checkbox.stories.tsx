import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../ui/Checkbox';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '체크박스 옆에 표시할 텍스트',
      defaultValue: 'Checkbox Label',
    },
    checked: {
      control: 'boolean',
      description: '체크 여부',
      defaultValue: false,
    },
    onChange: {
      action: 'changed',
      description: '체크박스 상태 변경 핸들러',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: '추가적인 스타일링 클래스',
      defaultValue: '',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

export const Default: Story = {
  args: {
    label: 'Default Checkbox',
    checked: false,
    onChange: () => console.log('Checkbox toggled'),
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    onChange: () => console.log('Checkbox toggled'),
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    checked: false,
    disabled: true,
    onChange: () => console.log('Checkbox toggled (should not trigger)'),
  },
};
