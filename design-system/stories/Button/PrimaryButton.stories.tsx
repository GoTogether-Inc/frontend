import type { Meta, StoryObj } from '@storybook/react';
import PrimaryButton from '../../ui/Button/PrimaryButton';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 텍스트',
      defaultValue: '다음',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      defaultValue: false,
    },
    className: {
      control: 'text',
      description: '추가적인 CSS 클래스',
    },
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;

export const Default: Story = {
  args: {
    label: '다음',
    onClick: () => console.log('Default button clicked'),
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화',
    onClick: () => console.log('This should not be logged'),
    disabled: true,
  },
};
