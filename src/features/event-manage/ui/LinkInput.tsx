import { useState } from 'react';
import AddButton from '../../../../public/assets/AddBtn.svg';
import CloseButton from '../../../../public/assets/CloseBtn.svg';
import Link from '../../../../public/assets/Link.svg';

interface LinkInputProps {
  id: string;
  url: string;
  title: string;
}

const LinkInput = () => {
  const [links, setLinks] = useState<LinkInputProps[]>([]);
  const [activeInput, setActiveInput] = useState<{ id: string | null; field: 'title' | 'url' | null }>({
    id: null,
    field: null,
  });
  const [hoveredInput, setHoveredInput] = useState<{ id: string | null; field: 'title' | 'url' | null }>({
    id: null,
    field: null,
  });

  const addNewLink = () => {
    const newLink = {
      id: Math.random().toString(36).substring(2, 9),
      title: '',
      url: '',
    };
    setLinks([...links, newLink]);
    setActiveInput({ id: newLink.id, field: null });
  };

  const removeLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
    if (activeInput.id === id) {
      setActiveInput({ id: null, field: null });
    }
  };

  const updateLink = (id: string, field: 'url' | 'title', value: string) => {
    setLinks(links.map(link => (link.id === id ? { ...link, [field]: value } : link)));
  };

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-bold text-black text-lg">관련 링크</h1>

      {links.map(link => (
        <div key={link.id} className="mb-2">
          <div className="flex items-center justify-between w-full">
            <img src={Link} alt="링크 이미지" className="p-2" />
            {/* Title Input */}
            <div
              className={`relative rounded-[3px] transition-colors ${
                hoveredInput.id === link.id && hoveredInput.field === 'title' ? 'bg-gray3' : ''
              }`}
              onMouseEnter={() => setHoveredInput({ id: link.id, field: 'title' })}
              onMouseLeave={() => setHoveredInput({ id: null, field: null })}
              onClick={() => setActiveInput({ id: link.id, field: 'title' })}
            >
              <input
                type="text"
                value={link.title}
                onChange={e => updateLink(link.id, 'title', e.target.value)}
                className="w-24 h-8 text-placeholderText ml-1"
                placeholder="참조링크"
                autoFocus={activeInput.id === link.id && activeInput.field === 'title'}
              />
            </div>

            {/* URL Input */}
            <div
              className={`relative rounded-[3px] transition-colors ${
                hoveredInput.id === link.id && hoveredInput.field === 'url' ? 'bg-gray3' : ''
              }`}
              onMouseEnter={() => setHoveredInput({ id: link.id, field: 'url' })}
              onMouseLeave={() => setHoveredInput({ id: null, field: null })}
              onClick={() => setActiveInput({ id: link.id, field: 'url' })}
            >
              <input
                type="text"
                value={link.url}
                onChange={e => updateLink(link.id, 'url', e.target.value)}
                className="w-72 h-8 text-placeholderText ml-2"
                placeholder="URL을 입력하세요"
                autoFocus={activeInput.id === link.id && activeInput.field === 'url'}
              />
              {/* Remove */}
              {hoveredInput.id === link.id && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeLink(link.id);
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
