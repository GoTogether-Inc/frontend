import type { Meta, StoryObj } from '@storybook/react';
import Profile from '../ui/Profile';
import { MemoryRouter } from 'react-router-dom';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'UI/Profile',
  component: Profile,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
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
      control: { type: 'radio', options: ['userProfile', 'hostProfile'] },
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
    className: 'lg:w-10 lg:h-10 md:h-9 md:w-9 sm:h-8 sm:w-8 lg:text-sm md:text-xs sm:text-xs',
  },
};

export const CustomStyledProfile: Story = {
  args: {
    name: '예진',
    profile: 'userProfile',
    className: 'bg-blue-400 lg:w-10 lg:h-10 md:h-9 md:w-9 sm:h-8 sm:w-8 lg:text-sm md:text-xs sm:text-xs',
  },
};

export const HostProfile: Story = {
  args: {
    name: '호스트 유진',
    profile: 'hostProfile',
    className: 'md:w-28 md:h-28 w-24 h-24',
  },
};
