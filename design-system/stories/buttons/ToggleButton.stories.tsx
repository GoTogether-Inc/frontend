import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '../../ui/buttons/ToggleButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      control: 'boolean',
      description: '토글 버튼의 활성 상태',
      defaultValue: false,
    },
    onChange: {
      action: 'changed',
      description: '토글 상태 변경 핸들러',
    },
    className: {
      control: 'text',
      description: '추가적인 커스텀 스타일링 클래스',
      defaultValue: '',
    },
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;

export const InactiveButton: Story = {
  args: {
    isChecked: false,
    onChange: () => console.log('Inactive button clicked'),
  },
};

export const ActiveButton: Story = {
  args: {
    isChecked: true,
    onChange: () => console.log('Active button clicked'),
  },
};
