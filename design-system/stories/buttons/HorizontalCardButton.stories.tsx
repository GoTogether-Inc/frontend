import type { Meta, StoryObj } from '@storybook/react';
import HorizontalCardButton from '../../ui/buttons/HorizontalCardButton';
import Calendar from '../../icons/menu-event.svg';
import SelectedCalendar from '../../icons/selected-event.svg';

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
      defaultValue: <img src={Calendar} alt="Calendar" />,
    },
    hoverIconPath: {
      control: 'text',
      description: 'hover 상태에서 사용할 아이콘 경로',
      defaultValue: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    },
  },
} satisfies Meta<typeof HorizontalCardButton>;

export default meta;

export const Button: Story = {
  args: {
    label: 'Button',
    iconPath: <img src={Calendar} alt="Calendar" />,
    hoverIconPath: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    onClick: () => console.log('Button clicked'), // onClick 속성 추가
  },
};
