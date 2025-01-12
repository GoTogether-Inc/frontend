import type { Meta, StoryObj } from '@storybook/react';
import HorizontalCardButton from '../../ui/buttons/HorizontalCardButton';
type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Buttons/HorizontalCardButton',
  component: HorizontalCardButton,
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
  },
} satisfies Meta<typeof HorizontalCardButton>;

export default meta;

export const Button: Story = {
  args: {
    label: 'Button',
    iconPath: '../icons/calendar.png',
    hoverIconPath: '../icons/selected_calendar.png',
    onClick: () => console.log('Button clicked'), // onClick 속성 추가
  },
};
