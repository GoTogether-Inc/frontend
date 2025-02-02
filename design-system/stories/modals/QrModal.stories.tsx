import { Meta, StoryObj } from '@storybook/react';
import QrModal from '../../ui/modals/QrModal';
import QRbackground from '../../icons/QrBackground.svg';
import QRcode from '../../icons/QrCode.svg';

type Story = StoryObj<typeof meta>;

const meta: Meta<typeof QrModal> = {
  title: 'Modals/QrModal',
  component: QrModal,
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
    isChecked: {
      control: 'boolean',
      description: '티켓 승인 상태',
      defaultValue: true,
    },
    isCheckIn: {
      control: 'boolean',
      description: '참가자 체크인 상태',
      defaultValue: true,
    },
    isCountdownChecked: {
      control: 'boolean',
      description: '카운트다운 활성화 여부',
      defaultValue: true,
    },
    className: {
      control: 'text',
      description: '추가적인 커스텀 스타일링 클래스',
      defaultValue: '',
    },
  },
} satisfies Meta<typeof QrModal>;

export default meta;

export const ActiveQrModal: Story = {
  args: {
    isChecked: true,
    iconPath1: <img src={QRbackground} alt="QRbackground" />,
    iconPath2: <img src={QRcode} alt="QRcode" />,
    title: '인프콘 2024 - INFCON 2024',
    hostName: '인프런',
    date: '2024-11-23',
    location: '올림픽 공원',
    ticketName: '일반',
    price: 150000,
    isApproved: true,
    isCheckIn: false,
    isCountdownChecked: true,
  },
};

export const InActiveQrModal: Story = {
  args: {
    isChecked: false,
    iconPath1: <img src={QRbackground} alt="QRbackground" />,
    iconPath2: <img src={QRcode} alt="QRcode" />,
    title: '인프콘 2024 - INFCON 2024',
    hostName: '인프런',
    date: '2024-11-23',
    location: '올림픽 공원',
    ticketName: '일반',
    price: 150000,
    isApproved: true,
    isCheckIn: true,
    isCountdownChecked: false,
  },
};
