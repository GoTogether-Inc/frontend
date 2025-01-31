interface SecondaryButtonProps {
  label: string;
  color: 'pink' | 'black';
  onClick?: () => void;
  className?: string;
}

const SecondaryButton = ({ label, color, onClick, className }: SecondaryButtonProps) => {
  const baseStyle = `font-bold text-white
  text-sm sm:px-3 sm:py-2 sm:text-xs sm:rounded
  md:px-3.5 md:py-2.5 md:text-sm md:rounded-md
  lg:px-4 lg:py-2.5 lg:text-base lg:rounded-md`;
  const colorStyle = color === 'pink' ? 'bg-main' : 'bg-black';

  return (
    <button className={`${baseStyle} ${colorStyle} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default SecondaryButton;
