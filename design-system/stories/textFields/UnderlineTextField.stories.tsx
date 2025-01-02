import type { Meta, StoryObj } from '@storybook/react';

import UnderlineTextField from '../../ui/textFields/UnderlineTextField';

const meta = {
  title: 'TextFields/UnderlineTextField',
  component: UnderlineTextField,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ width: '350px' }}>
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
    type: {
      control: { type: 'select', options: ['text', 'password'] },
      description: '텍스트 필드의 타입',
      defaultValue: 'text',
    },
    onChange: {
      description: '입력 이벤트',
    },
  },
} satisfies Meta<typeof UnderlineTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'label',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
  },
};
