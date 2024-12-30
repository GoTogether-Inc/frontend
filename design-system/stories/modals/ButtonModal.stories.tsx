import { Meta, StoryObj } from '@storybook/react';
import ButtonModal from '../../ui/modals/ButtonModal';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof ButtonModal> = {
  title: 'Modals/ButtonModal',
  component: ButtonModal,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    onClose: {
      action: 'closed',
      description: '모달 닫기 이벤트',
    },
  },
} satisfies Meta<typeof ButtonModal>;

export default meta;

export const Default: Story = {
  args: {
    onClick: () => console.log('적용하기 버튼 클릭'),
    onClose: () => console.log('모달 닫힘'),
  },
};
