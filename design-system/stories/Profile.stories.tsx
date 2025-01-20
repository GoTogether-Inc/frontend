import type { Meta, StoryObj } from '@storybook/react';
import Profile from '../ui/Profile';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'UI/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '프로필에 표시될 이름(2글자 제한)',
      defaultValue: '유진',
    },
    className: {
      control: 'text',
      description: '추가적인 커스텀 스타일링 클래스',
      defaultValue: '',
    },
    profile: {
      control: { type: 'radio', options: ['userProfile', 'HostProfile'] },
      description: '프로필 타입을 선택합니다.',
      defaultValue: 'userProfile',
    },
  },
} satisfies Meta<typeof Profile>;

export default meta;

export const DefaultProfile: Story = {
  args: {
    name: '유진',
    profile: 'userProfile',
  },
};

export const CustomStyledProfile: Story = {
  args: {
    name: '예진',
    className: 'bg-blue-400',
    profile: 'userProfile',
  },
};

export const HostProfile: Story = {
  args: {
    name: '호스트 유진',
    profile: 'HostProfile',
  },
};
