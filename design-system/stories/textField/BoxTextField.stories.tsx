import type { Meta, StoryObj } from '@storybook/react';

import BoxTextField from '../../ui/textField/BoxTextField';

const meta = {
  title: 'TextFields/BoxTextField',
  component: BoxTextField,
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
} satisfies Meta<typeof BoxTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-12',
  },
};
