// 사진 첨부는 추후에...
import { useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from '../hooks/usePresignedUrlHook';
import { useFunnelState } from '../model/FunnelContext';

interface TextEditorProps {
  useFunnel?: boolean;
}

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

const TextEditor = ({ useFunnel = false }: TextEditorProps) => {
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
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const handleChange = (value: string) => {
    setContent(value);
    if (useFunnel) {
      setEventState(prev => ({ ...prev, description: value }));
    }
  };

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
