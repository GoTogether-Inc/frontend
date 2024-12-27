import { Meta, StoryObj } from '@storybook/react';
import Description from '../../ui/texts/Description';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Texts/Description',
  component: Description,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      defaultValue: '설명 텍스트',
      description: '텍스트',
      control: 'text',
    },
  },
} satisfies Meta<typeof Description>;

export default meta;

export const Default: Story = {
  args: {
    children: 'text',
    textColor: '',
    textSize: '',
    className: '',
  },
};
