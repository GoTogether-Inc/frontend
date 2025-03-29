// 사진 첨부는 추후에...
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from '../hooks/usePresignedUrlHook';
import { useFunnelState } from '../model/FunnelContext';

const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'align',
  'color',
  'background',
  'size',
  'h1',
];

const TextEditor = () => {
  const [content, setContent] = useState('');
  const quillRef = useRef<ReactQuill | null>(null);
  const { setEventState } = useFunnelState();

  const imageHandler = async () => {
    if (!quillRef.current) return;

    const quillInstance = quillRef.current.getEditor();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const imageUrl = await uploadFile(file);
        const range = quillInstance.getSelection();
        if (range) {
          quillInstance.insertEmbed(range.index, 'image', imageUrl);
        }
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
    };
  };

  const handleChange = (value: string) => {
    setContent(value);
    setEventState(prev => ({ ...prev, description: value }));
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <div className="flex flex-col justify-start gap-2 mb-4">
      <h1 className="font-bold text-black text-lg">이벤트에 대한 상세 설명</h1>
      <ReactQuill
        theme="snow"
        value={content}
        ref={quillRef}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        className="custom-quill-editor"
      />
    </div>
  );
};
export default TextEditor;
