import type { Meta, StoryObj } from '@storybook/react';
import LinkTextField from '../../ui/textFields/LinkTextField';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'TextFields/LinkTextField',
  component: LinkTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 핸들러',
    },
    onChange: {
      action: 'clicked',
      description: '입력 이벤트',
    },
    onRemoveClick: {
      action: 'removed',
      description: '삭제 이벤트',
    },
    placeholder: {
      control: 'text',
      description: '텍스트 필드에 들어갈 문자열의 정보',
      defaultValue: '입력해주세요',
    },
  },
} satisfies Meta<typeof LinkTextField>;

export default meta;

export const TitleInput: Story = {
  args: {
    iconPath: '../icons/link.svg',
    placeholder: 'LinkTextField',
  },
};

export const UrlInput: Story = {
  args: {
    category: 'url',
    iconPath: '../icons/link.svg',
    placeholder: 'LinkTextField',
    onRemoveClick: () => console.log('링크 텍스트 상자 삭제'),
  },
};
