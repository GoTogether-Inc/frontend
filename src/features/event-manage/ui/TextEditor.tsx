// 사진 첨부는 추후에...
import { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const handleChange = (value: string) => {
    const newText = value.replace(/<\/?[^>]+(>|$)/g, ''); // 태그 제거
    setContent(newText);
    console.log(newText);
  };

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        [{ align: [] }, { color: [] }, { background: [] }],
        ['clean'],
      ],
    };
  }, []);

  return (
    <div className="flex flex-col justify-start gap-2 mb-4">
      <h1 className="font-bold text-black text-lg">이벤트에 대한 상세 설명</h1>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={handleChange}
        className="custom-quill-editor"
      />
    </div>
  );
};
export default TextEditor;
