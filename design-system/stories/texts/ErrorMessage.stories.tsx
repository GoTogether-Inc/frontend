import { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from '../../ui/texts/ErrorMessage';

type Story = StoryObj<typeof meta>;

const meta = {
  title: 'Texts/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Error메세지의 내용',
    },
  },
} satisfies Meta<typeof ErrorMessage>;

export default meta;

export const Default: Story = {
  args: {
    children: 'text',
  },
};
