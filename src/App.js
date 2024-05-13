import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function App() {
  const quillRef = useRef(null);

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        ['image', 'code-block']
      ],
      handlers: {
        image: imageHandler
      }
    }
  };

  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target.result;
        const editor = quillRef.current.getEditor();
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', base64Image, 'user');
      };
      reader.readAsDataURL(file);
    };
  }

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      modules={modules}
      style={{ height: '500px' }}
      defaultValue={""} // defaultValue 사용
    />
  );
}

export default App;