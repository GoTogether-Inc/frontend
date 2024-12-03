interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor: 'black' | 'white';
}

const SubHeader: React.FC<HeaderProps> = ({ title, leftIcon, rightIcon, textColor = 'black' }) => {
  return (
    <header className="flex top-0 left-0 h-20 mx-6 justify-between items-center">
      <div className="w-6 h-6 flex items-center justify-center">{leftIcon}</div>

      <h1 className={`font-bold text-xl ${textColor === 'black' ? 'text-black' : 'text-white'}`}>{title}</h1>

      <div className="w-6 h-6 flex items-center justify-center">{rightIcon}</div>
    </header>
  );
};
export default SubHeader;
