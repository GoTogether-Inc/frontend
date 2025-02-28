interface TertiaryButtonProps {
  label: string;
  type: 'button' | 'submit';
  color: 'pink' | 'black';
  size: 'small' | 'medium' | 'large';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const TertiaryButton = ({ label, type, color, size, onClick, className }: TertiaryButtonProps) => {
  const baseStyle = `flex justify-center items-center border rounded`;

  const sizeClasses = {
    small: 'px-1.5 py-0.5 text-11 md:px-2 md:text-11',
    medium: 'px-4 py-1 text-sm',
    large:
      'text-sm sm:px-2.5 sm:py-2 sm:text-xs sm:rounded md:px-3 md:py-2.5 md:text-sm md:rounded-md lg:px-3 lg:py-2.5 lg:text-base lg:rounded-md',
  };

  const colorStyle =
    color === 'pink'
      ? 'border-main text-main hover:bg-main hover:text-white hover:font-bold'
      : 'border-black text-black hover:bg-black hover:text-white hover:font-bold';

  return (
    <button type={type} className={`${baseStyle} ${sizeClasses[size]} ${colorStyle} ${className}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default TertiaryButton;
