import type { Meta, StoryObj } from '@storybook/react';

import TextField from '../../ui/textFields/TextField';

const meta = {
  title: 'TextFields/TextField',
  component: TextField,
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
    onChange: {
      description: '입력 이벤트',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'label',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
  },
};
