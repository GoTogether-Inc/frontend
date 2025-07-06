import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from '../hooks/usePresignedUrlHook';
import { FunnelState } from '../model/FunnelContext';

interface TextEditorProps {
  eventState?: FunnelState['eventState'];
  setEventState?: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
  value?: string;
  onChange?: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
}

const MAX_LENGTH = 2000;
const IMAGE_WEIGHT = 200;

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

const TextEditor = ({ eventState, setEventState, value = '', onChange, onValidationChange }: TextEditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const [editorContent, setEditorContent] = useState('');
  const [isOverLimit, setIsOverLimit] = useState(false);

  useEffect(() => {
    const initial = value ?? eventState?.description ?? '';
    if (!editorContent && initial) {
      setEditorContent(initial);
    }
  }, [value, eventState?.description, editorContent]);

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

  const getImageCount = (htmlContent: string): number => {
    const matches = htmlContent.match(/<img [^>]*src="[^"]*"[^>]*>/g);
    return matches ? matches.length : 0;
  };
  const getPlainText = (htmlContent: string): string => {
    return htmlContent.replace(/<[^>]*>/g, '').trim();
  };
  const getTotalContentLength = (htmlContent: string): number => {
    const textLength = getPlainText(htmlContent).length;
    const imageCount = getImageCount(htmlContent);
    return textLength + imageCount * IMAGE_WEIGHT;
  };

  const handleChange = (val: string) => {
  const totalLength = getTotalContentLength(val);

  if (totalLength <= MAX_LENGTH) {
    setEditorContent(val);
    onChange?.(val);
    setEventState?.(prev => ({ ...prev, description: val }));
    onValidationChange?.(getPlainText(val).length > 0);
    setIsOverLimit(false);
  } else {
    const editorInstance = quillRef.current?.getEditor();
    if (editorInstance) {
      editorInstance.clipboard.dangerouslyPasteHTML(eventState?.description ?? '');
    }
    setIsOverLimit(true);
  }
};


  useEffect(() => {
    onValidationChange?.(getPlainText(editorContent).length > 0);
  }, [editorContent, onValidationChange]);

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

  const totalLength = getTotalContentLength(editorContent);
  const imageCount = getImageCount(editorContent);

  return (
    <div className="flex flex-col justify-start gap-2 mb-4">
      <h1 className="font-bold text-black text-lg">이벤트에 대한 상세 설명</h1>
      <ReactQuill
        theme="snow"
        value={editorContent}
        ref={quillRef}
        modules={modules}
        formats={formats}
        onChange={handleChange}
        className="custom-quill-editor"
      />
      <div className="flex justify-between items-center mt-1">
        <p className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
          {totalLength} / {MAX_LENGTH}자{imageCount > 0 && ` (이미지 ${imageCount}개 포함)`}
        </p>
        {isOverLimit && <p className="text-sm text-red-500 font-medium">{MAX_LENGTH}자를 초과할 수 없습니다.</p>}
      </div>
    </div>
  );
};

export default TextEditor;
