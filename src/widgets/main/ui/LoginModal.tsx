import { motion } from 'framer-motion';
import kakao from '../../../../public/assets/main/Kakao.svg';
import google from '../../../../public/assets/main/Google.svg';
import HorizontalCardButton from '../../../../design-system/ui/buttons/HorizontalCardButton';
import TextButton from '../../../../design-system/ui/buttons/TextButton';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  return (
    <motion.div
      initial={{ y: '-100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '-100vh', opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center backdrop-blur-sm"
    >
      <div className="flex flex-col justify-center gap-16 w-full max-w-lg h-[85%] bg-gradient-to-br from-[#FF5593] to-[#FF7577] rounded-b-[40px] px-10 py-8 shadow-lg">
        <div className="flex flex-col font-bold text-white">
          <div className="flex items-end gap-2">
            <p className="text-26">같이가자,</p>
            <p className="text-22">더 많은 사람들과 함께해요.</p>
          </div>
          <p className="text-22">언제 어디서든 자유롭게 이벤트를 만들어보세요.👋🏻</p>
        </div>
        <div className="flex flex-col w-full gap-6 px-3">
          <div className="flex items-center w-full h-12 bg-[#FEE500] gap-4 rounded-full">
            <HorizontalCardButton
              iconPath={<img src={kakao} alt="카카오 아이콘" className="" />}
              label="카카오 로그인"
              onClick={() => {}}
              className="mx-auto my-auto"
            />
          </div>
          <div className="flex items-center w-full h-12 bg-white gap-4 rounded-full">
            <HorizontalCardButton
              iconPath={<img src={google} alt="구글 아이콘" className="" />}
              label="Google 로그인"
              onClick={() => {}}
              className="mx-auto my-auto"
            />
          </div>
        </div>
        <TextButton label="홈으로 돌아가기" onClick={onClose} className="text-white" />
      </div>
    </motion.div>
  );
};
export default LoginModal;
