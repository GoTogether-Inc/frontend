import TextButton from '../../../../design-system/ui/buttons/TextButton';

interface ResponsesFilterBarProps {
  listType: 'summary' | 'individual';
  setListType: (type: 'summary' | 'individual') => void;
}

const ResponsesFilterBar = ({
  listType,
  setListType,
}: ResponsesFilterBarProps) => {
  return (
    <div className="flex items-center justify-between text-sm md:text-base py-2 flex gap-20 ">
        <TextButton
          label="요약"
          onClick={() => setListType('summary')}
          className={listType === 'summary' ? 'text-main' : ''}
        />
        <TextButton
          label="개별 조회"
          onClick={() => setListType('individual')}
          className={listType === 'individual' ? 'text-main' : ''}
        />
    </div>
  );
};

export default ResponsesFilterBar;
