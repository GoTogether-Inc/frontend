import type { Meta, StoryObj } from '@storybook/react';
import trashIcon from '../../icons/trash.svg';

import DefaultTextField from '../../ui/textFields/DefaultTextField';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'TextFields/DefaultTextField',
  component: DefaultTextField,
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
    rightContent: {
      control: 'text',
      description: '오른쪽 콘텐츠(버튼)',
    },
  },
} satisfies Meta<typeof DefaultTextField>;

export default meta;

export const Default: Story = {
  args: {
    label: '',
    detail: '',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-12',
    labelClassName: 'sm:text-base md:text-lg',
  },
};
export const WithTitleTextField: Story = {
  args: {
    label: '',
    detail: '',
    leftText: '받는',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-12',
    labelClassName: 'sm:text-base md:text-lg',
  },
};
export const WithIconButtonTextField: Story = {
  args: {
    label: '',
    detail: '',
    rightContent: (
      <button type="button">
        <img src={trashIcon} alt="Trash Icon" />
      </button>
    ),
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-12',
    labelClassName: 'sm:text-base md:text-lg',
  },
};
export const WithLabelTextField: Story = {
  args: {
    label: 'label',
    detail: '',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-12',
    labelClassName: 'sm:text-base md:text-lg',
  },
};
export const WithLabelDetailTextField: Story = {
  args: {
    label: 'label',
    detail: 'detail',
    onChange: e => console.log(e.target.value),
    placeholder: '입력해주세요',
    className: 'h-12',
    labelClassName: 'sm:text-base md:text-lg',
  },
};
