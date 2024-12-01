import type { Meta, StoryObj } from '@storybook/react';
import VerticalCardButton from '../ui/VerticalCardButton';
type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/VerticalCardButton',
  component: VerticalCardButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [Story => <Story />],
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '버튼 텍스트',
      defaultValue: 'Button',
    },
    iconPath: {
      control: 'text',
      description: '카드 버튼에 보이는 아이콘',
      defaultValue: '../icons/calendar.png',
    },
    hoverIconPath: {
      control: 'text',
      description: 'hover 상태에서 사용할 아이콘 경로',
      defaultValue: '../icons/selected_calendar.png',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'], // 선택 가능한 크기
      description: '버튼 크기',
      defaultValue: 'medium',
    },
  },
} satisfies Meta<typeof VerticalCardButton>;

export default meta;

export const Button: Story = {
  args: {
    label: 'Button',
    iconPath: '../icons/calendar.png',
    hoverIconPath: '../icons/selected_calendar.png',
    onClick: () => console.log('Button clicked'), // onClick 속성 추가
  },
};

export const SmallButton: Story = {
  args: {
    label: 'Small',
    iconPath: '../icons/calendar.png',
    hoverIconPath: '../icons/selected_calendar.png',
    onClick: () => console.log('Small Button clicked'),
    size: 'small', // 크기 설정
  },
};

export const MediumButton: Story = {
  args: {
    label: 'Medium',
    iconPath: '../icons/calendar.png',
    hoverIconPath: '../icons/selected_calendar.png',
    onClick: () => console.log('Medium Button clicked'),
    size: 'medium', // 크기 설정
  },
};

export const LargeButton: Story = {
  args: {
    label: 'Large',
    iconPath: '../icons/calendar.png',
    hoverIconPath: '../icons/selected_calendar.png',
    onClick: () => console.log('Large Button clicked'),
    size: 'large', // 크기 설정
  },
};
