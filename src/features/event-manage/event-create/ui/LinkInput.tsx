import { useState } from 'react';
import AddButton from '../../../../../public/assets/event-manage/creation/AddBtn.svg';
import CloseButton from '../../../../../public/assets/event-manage/creation/CloseBtn.svg';
import Link from '../../../../../public/assets/event-manage/creation/Link.svg';
import { FunnelState } from '../model/FunnelContext';

interface LinkInputProps {
  formState?: FunnelState['formState'];
  setFormState?: React.Dispatch<React.SetStateAction<FunnelState['formState']>>;
}

const LinkInput = ({ formState, setFormState }: LinkInputProps) => {
  const [links, setLinks] = useState<{ title: string; url: string }[]>(formState?.referenceLinks || []);
  const [activeInput, setActiveInput] = useState<{ field: 'title' | 'url' | null }>({
    field: null,
  });
  const [hoveredInput, setHoveredInput] = useState<{ field: 'title' | 'url' | null }>({
    field: null,
  });

  const addNewLink = () => {
    const newLink = {
      title: '',
      url: '',
    };
    setLinks([...links, newLink]);
    setActiveInput({ field: null });
    if (setFormState) {
      setFormState(prev => ({
        ...prev,
        referenceLinks: [...prev.referenceLinks, newLink],
      }));
    }
  };

  const removeLink = (title: string) => {
    const updatedLinks = links.filter(link => link.title !== title);
    setLinks(updatedLinks);
    if (setFormState) {
      setFormState(prev => ({
        ...prev,
        referenceLinks: updatedLinks,
      }));
    }
  };

  const updateLink = (title: string, field: 'url' | 'title', value: string) => {
    const updatedLinks = links.map(link => (link.title === title ? { ...link, [field]: value } : link));
    setLinks(updatedLinks);
    if (setFormState) {
      setFormState(prev => ({
        ...prev,
        referenceLinks: updatedLinks,
      }));
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-bold text-black text-lg">관련 링크</h1>

      {links.map((link, index) => (
        <div key={index} className="mb-2">
          <div className="flex items-center justify-between">
            <img src={Link} alt="링크 이미지" className="p-2" />
            {/* Title Input */}
            <div
              className={`relative rounded-[3px] transition-colors ${hoveredInput.field === 'title' ? 'bg-gray3' : ''}`}
              onMouseEnter={() => setHoveredInput({ field: 'title' })}
              onMouseLeave={() => setHoveredInput({ field: null })}
              onClick={() => setActiveInput({ field: 'title' })}
            >
              <input
                type="text"
                value={link.title}
                onChange={e => updateLink(link.title, 'title', e.target.value)}
                className="w-full min-w-[3rem] md:min-w-[6rem] h-8 text-placeholderText ml-1 outline-none bg-transparent text-sm md:text-base"
                placeholder="참조링크"
                autoFocus={activeInput.field === link.title && activeInput.field === 'title'}
              />
            </div>

            {/* URL Input */}
            <div
              className={`relative rounded-[3px] transition-colors ${hoveredInput.field === 'url' ? 'bg-gray3' : ''}`}
              onMouseEnter={() => setHoveredInput({ field: 'url' })}
              onMouseLeave={() => setHoveredInput({ field: null })}
              onClick={() => setActiveInput({ field: 'url' })}
            >
              <input
                type="text"
                value={link.url}
                onChange={e => updateLink(link.title, 'url', e.target.value)}
                className="w-full min-w-[10rem] md:min-w-[15rem] h-8 text-placeholderText ml-2 outline-none bg-transparent text-sm md:text-base"
                placeholder="URL을 입력하세요"
                autoFocus={activeInput.field === 'url'}
              />
              {/* Remove */}
              {hoveredInput.field === 'url' && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeLink(link.title);
                  }}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2"
                >
                  <img src={CloseButton} alt="닫기 버튼" className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Add */}
      <button onClick={addNewLink} className="flex items-center gap-2 text-placeholderText px-2">
        <img src={AddButton} alt="추가하기 버튼" />
        추가하기
      </button>
    </div>
  );
};
export default LinkInput;
