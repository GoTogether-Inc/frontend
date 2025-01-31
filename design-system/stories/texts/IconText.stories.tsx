import type { Meta, StoryObj } from '@storybook/react';
import IconText from '../../ui/texts/IconText';
import Calendar from '../../icons/Event.svg';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'texts/IconText',
  component: IconText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xSmall', 'small', 'medium', 'large'],
      description: '아이콘 버튼의 사이즈',
      defaultValue: 'medium',
    },
    iconPath: {
      control: 'text',
      description: '카드 버튼에 보이는 아이콘',
      defaultValue: <img src={Calendar} alt="Calendar" />,
    },
  },
} satisfies Meta<typeof IconText>;

export default meta;

export const XSmallSize: Story = {
  args: {
    size: 'xSmall',
    iconPath: <img src={Calendar} alt="Calendar" />,
    children: 'IconText',
  },
};

export const SmallSize: Story = {
  args: {
    size: 'small',
    iconPath: <img src={Calendar} alt="Calendar" />,
    children: 'IconText',
  },
};

export const MediumSize: Story = {
  args: {
    size: 'medium',
    iconPath: <img src={Calendar} alt="Calendar" />,
    children: 'IconText',
  },
};

export const LargeSize: Story = {
  args: {
    size: 'large',
    iconPath: <img src={Calendar} alt="Calendar" />,
    children: 'IconText',
    className: '',
  },
};
