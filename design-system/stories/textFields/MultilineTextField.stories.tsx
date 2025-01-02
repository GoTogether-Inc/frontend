import type { Meta, StoryObj } from '@storybook/react';

import MultilineTextField from '../../ui/textFields/MultilineTextField';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'TextFields/MultilineTextField',
  component: MultilineTextField,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ width: '380px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '텍스트 필드에 들어갈 문자열의 정보',
      defaultValue: '입력해주세요',
    },
    onChange: {
      description: '입력 이벤트',
    },
  },
} satisfies Meta<typeof MultilineTextField>;

export default meta;

export const SmallSize: Story = {
  args: {
    label: '',
    detail: '',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-20',
  },
};

export const MediumSize: Story = {
  args: {
    label: '',
    detail: '',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-32',
  },
};

export const LargeSize: Story = {
  args: {
    label: '',
    detail: '',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-96',
  },
};
