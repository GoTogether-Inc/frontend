interface TertiaryButtonProps {
  label: string;
  type: 'button' | 'submit';
  color: 'pink' | 'black';
  size: 'small' | 'large';
  onClick?: () => void;
  className?: string;
}

const TertiaryButton = ({ label, type, color, size, onClick, className }: TertiaryButtonProps) => {
  const baseStyle = `flex justify-center items-center border rounded`;

  const sizeStyle =
    size === 'large'
      ? 'text-sm sm:px-2.5 sm:py-2 sm:text-xs sm:rounded md:px-3 md:py-2.5 md:text-sm md:rounded-md lg:px-3 lg:py-2.5 lg:text-base lg:rounded-md'
      : 'px-2 py-0.5 text-11';

  const colorStyle =
    color === 'pink'
      ? 'border-main text-main hover:bg-main hover:text-white hover:font-bold'
      : 'border-black text-black hover:bg-black hover:text-white hover:font-bold';

  return (
    <button type={type} className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default TertiaryButton;
