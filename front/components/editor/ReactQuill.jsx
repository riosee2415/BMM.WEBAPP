import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});
import "react-quill/dist/quill.snow.css";
import { Wrapper } from "../commonComponents";
import styled from "styled-components";

const QuillWrapper = styled(ReactQuill)`
  & .ql-container {
    height: calc(100% - 42.38px);
  }

  & .ql-toolbar.ql-snow {
    border-radius: 5px 5px 0 0;
  }
  & .ql-toolbar.ql-snow + .ql-container.ql-snow {
    border-radius: 0 0 5px 5px;
  }
`;

const QuillEditor = ({ value, setValue, placeholder }) => {
  return (
    <QuillWrapper
      placeholder={placeholder}
      style={{ width: `100%`, height: `100%` }}
      theme="snow"
      value={value}
      onChange={setValue}
      modules={{
        toolbar: [
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],

          [{ header: [1, 2, 3, 4, 5, 6, false] }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ["link", "image", "video"],
        ],
      }}
    />
  );
};

export default QuillEditor;
