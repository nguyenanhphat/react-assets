import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import './styles.scss';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],
];

const MyEditor = ({ onChange, value }) => {
  return (
    <ReactQuill
      className="my-editor-custom"
      value={value}
      modules={{ toolbar: toolbarOptions }}
      onChange={onChange}
    />
  );
};

MyEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

MyEditor.defaultProps = {
  onChange: () => null,
  value: '',
};

export default MyEditor;
