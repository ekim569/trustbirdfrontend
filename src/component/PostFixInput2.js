import React from "react";
import { Form } from "react-bootstrap";
import "../pages/Page.css"

const PostFixInput2 = ({ type, placeholder, postfix, onChange, ...props }) => {
  return (
    <div style={{ position: "relative", width:"400px", display:"inline-block"}}>
      <Form.Control
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        required
        style={Object.assign({ paddingRight: 44 }, props.style) }
        {...props}
      />
      <span
      className="fixinput"
      >
        {postfix}
      </span>
    </div>
  );
};

export default PostFixInput2;
