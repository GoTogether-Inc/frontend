import type { Meta, StoryObj } from '@storybook/react';
import Header from '../ui/Header';
import searchIcon from '../icons/search.png';

type Story = StoryObj<typeof Header>;

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    leftButtonLabel: {
      control: 'text',
      description: '왼쪽 버튼 레이블',
    },
    leftButtonClick: {
      action: 'clicked',
      description: '왼쪽 버튼 클릭 핸들러',
    },
    leftButtonClassName: {
      control: 'text',
      description: '왼쪽 버튼 추가 스타일링 클래스',
    },
    centerContent: {
      control: 'text',
      description: '가운데 콘텐츠 (검색창, 로고 등)',
    },
    rightContent: {
      control: 'text',
      description: '오른쪽 콘텐츠 (텍스트, 아이콘 등)',
    },
  },
};

export default meta;

export const Default: Story = {
  args: {
    centerContent: 'Default Header',
  },
};

export const LeftIconButtonOnly: Story = {
  args: {
    leftButtonLabel: '<',
    leftButtonClassName: 'text-xl',
  },
};

export const WithCenterTitleOnly: Story = {
  args: {
    centerContent: 'Centered Title',
  },
};

export const WithLeftIconButtonAndCenterTitle: Story = {
  args: {
    leftButtonLabel: '<',
    leftButtonClassName: 'text-xl',
    centerContent: 'Header with Title',
  },
};

export const WithCenterTitleAndRightIconButton: Story = {
  args: {
    centerContent: 'Header Title',
    rightContent: (
      <button type="button" className="w-5">
        <img src={searchIcon} alt="Search Icon" />
      </button>
    ),
  },
};

export const WithLeftIconButtonCenterTitleAndRightIconButton: Story = {
  args: {
    leftButtonLabel: '<',
    leftButtonClassName: 'text-xl',
    centerContent: 'Header Title',
    rightContent: (
      <button type="button" className="w-5">
        <img src={searchIcon} alt="Search Icon" />
      </button>
    ),
  },
};

export const WithLeftIconButtonAndSearchBar: Story = {
  args: {
    leftButtonLabel: '<',
    leftButtonClassName: 'text-xl',
    centerContent: (
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-main"
      />
    ),
  },
};

export const WithLeftIconButtonSearchBarAndSecondaryButton: Story = {
  args: {
    leftButtonLabel: '<',
    leftButtonClassName: 'text-xl',
    centerContent: (
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-main"
      />
    ),
    rightContent: (
      <button type="button" className="px-3.5 py-1.5 text-white bg-black rounded-md">
        로그인
      </button>
    ),
  },
};

export const WithLeftTitleSearchBarAndSecondaryButton: Story = {
  args: {
    leftButtonLabel: '같이가요',
    leftButtonClassName: 'text-xl font-bold',
    centerContent: (
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-main"
      />
    ),
    rightContent: (
      <button type="button" className="px-3.5 py-1.5 text-white bg-black rounded-md">
        로그인
      </button>
    ),
  },
};

export const WithLeftTitleSearchBarAndProfile: Story = {
  args: {
    leftButtonLabel: '같이가요',
    leftButtonClassName: 'text-xl font-bold',
    centerContent: (
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        className="w-full h-8 px-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-main"
      />
    ),
    rightContent: (
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-main">
        <span className="text-sm font-bold text-white">유진</span>
      </div>
    ),
  },
};
