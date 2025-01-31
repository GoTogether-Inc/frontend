import type { Meta, StoryObj } from '@storybook/react';
import VerticalCardButton from '../../ui/buttons/VerticalCardButton';
import Calendar from '../../icons/Event.svg';
import SelectedCalendar from '../../icons/SelectedEvent.svg';

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
      defaultValue: <img src={Calendar} alt="Calendar" />,
    },
    hoverIconPath: {
      control: 'text',
      description: 'hover 상태에서 사용할 아이콘 경로',
      defaultValue: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    },
  },
} satisfies Meta<typeof VerticalCardButton>;

export default meta;

export const Button: Story = {
  args: {
    label: 'Button',
    iconPath: <img src={Calendar} alt="Calendar" />,
    hoverIconPath: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    onClick: () => console.log('Button clicked'), // onClick 속성 추가
  },
};

export const SmallButton: Story = {
  args: {
    label: 'Small',
    iconPath: <img src={Calendar} alt="Calendar" />,
    hoverIconPath: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    onClick: () => console.log('Small Button clicked'),
  },
};

export const MediumButton: Story = {
  args: {
    label: 'Medium',
    iconPath: <img src={Calendar} alt="Calendar" />,
    hoverIconPath: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    onClick: () => console.log('Medium Button clicked'),
  },
};

export const LargeButton: Story = {
  args: {
    label: 'Large',
    iconPath: <img src={Calendar} alt="Calendar" />,
    hoverIconPath: <img src={SelectedCalendar} alt="SelectedCalendar" />,
    onClick: () => console.log('Large Button clicked'),
  },
};
