import TextButton from '../../../../design-system/ui/buttons/TextButton';

interface ResponsesFilterBarProps {
  listType: 'summary' | 'query' | 'individual';
  setListType: (type: 'summary' | 'query' | 'individual') => void;
}

const ResponsesFilterBar = ({
  listType,
  setListType,
}: ResponsesFilterBarProps) => {
  return (
    <div className="flex items-center justify-between text-15 md:text-sm py-2 flex gap-20 font-semibold">
        <TextButton
          label="요약"
          onClick={() => setListType('summary')}
          className={listType === 'summary' ? 'text-main' : ''}
        />
        <TextButton
          label="질문"
          onClick={() => setListType('query')}
          className={listType === 'query' ? 'text-main' : ''}
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
