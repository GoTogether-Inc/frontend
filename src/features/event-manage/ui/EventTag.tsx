import { useFunnelState } from '../model/FunnelContext';
import TagInput from '../../../shared/ui/TagInput';

const EventTag = () => {
  const { formState, setFormState } = useFunnelState();
  const MAX_TAGS = 5;

  const handleHashtagsChange = (tags: string[]) => {
    setFormState(prev => ({
      ...prev,
      hashtags: tags,
    }));
  };

  return (
    <div className="flex flex-col justify-start">
      <h1 className="font-bold text-black text-lg">이벤트 해시태그</h1>
      <p className="text-placeholderText text-base mb-2">최대 5개의 태그를 입력할 수 있어요</p>

      <TagInput
        value={formState.hashtags}
        onChange={handleHashtagsChange}
        maxTags={MAX_TAGS}
        placeholder="엔터를 이용해 태그를 입력하세요."
      />
    </div>
  );
};
export default EventTag;
