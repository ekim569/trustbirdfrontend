import React from "react";
import { Form } from "react-bootstrap";
import "../pages/Page.css"

const PostFixOutput = ({ type, placeholder, postfix, onChange, ...props }) => {
  return (
    <div >
      <Form
      />
      <span
      className="fixoutput"
      >
        {postfix}
      </span>
    </div>
  );
};

export default PostFixOutput;
