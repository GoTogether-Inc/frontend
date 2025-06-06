import { useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadFile } from '../hooks/usePresignedUrlHook';
import { FunnelState } from '../model/FunnelContext';

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  setEventState?: React.Dispatch<React.SetStateAction<FunnelState['eventState']>>;
  onValidationChange?: (isValid: boolean) => void;
}

const MAX_LENGTH = 200;

const formats = [
  'font', 'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent', 'link', 'image', 'align', 'color', 'background',
  'size', 'h1',
];

const TextEditor = ({ value = '', onChange, setEventState, onValidationChange }: TextEditorProps) => {
  const [content, setContent] = useState(value);
  const quillRef = useRef<ReactQuill | null>(null);
  const [isOverLimit, setIsOverLimit] = useState(false);

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
  const getPlainText = (htmlContent: string): string => {
    return htmlContent.replace(/<[^>]*>/g, '').trim();
  };
  
  const handleChange = (value: string) => {
    const editorInstance = quillRef.current?.getEditor();
    const plainTextLength = editorInstance ? editorInstance.getText().trim().length : getPlainText(value).length;

    if (plainTextLength <= MAX_LENGTH) {
      setContent(value);
      onChange?.(value);
      setEventState?.(prev => ({ ...prev, description: value }));
      onValidationChange?.(plainTextLength > 0);
      setIsOverLimit(false);
    } else {
      if (editorInstance) {
        editorInstance.setContents(editorInstance.clipboard.convert(content));
      }
      setIsOverLimit(true);
    }
  };

  useEffect(() => {
    setContent(value); // 외부 value가 바뀌면 내부에 반영
    const plainText = getPlainText(value);
    onValidationChange?.(plainText.length > 0);
  }, [value]);

  const plainTextLength = getPlainText(content).length;


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
      <div className="flex justify-between items-center mt-1">
        <p className={`text-sm ${isOverLimit ? 'text-red-500' : 'text-gray-500'}`}>
          {plainTextLength} / {MAX_LENGTH}자
        </p>
        {isOverLimit && (
          <p className="text-sm text-red-500 font-medium">
            200자를 초과할 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default TextEditor;
