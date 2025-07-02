import { motion } from 'framer-motion';
import classNames from 'classnames';

interface FloatingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}

const FloatingButton = ({ onClick, children, className, ariaLabel }: FloatingButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classNames(
        'fixed right-100 ',
        'z-50 flex items-center justify-center',
        'rounded-full shadow-lg',
        'w-12 h-12 sm:w-10 sm:h-10 lg:w-12 lg:h-12',
        className
      )}
    >
      {children}
    </motion.button>
  );
};

export default FloatingButton;
