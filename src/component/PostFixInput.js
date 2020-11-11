import React from "react"
import { Form } from "react-bootstrap"

import "../pages/Page.css"

const PostFixInput = ({ type, placeholder, postfix, onChange, ...props }) => {

  return (
    <div style={{ position: "relative" }}>
      <Form.Control type={type} onChange={onChange} placeholder={placeholder} style={ Object.assign({ paddingRight: 44 }, props.style) } {...props} required />
      <span className="fixinput">{postfix}</span>
    </div>
  )
}

export default PostFixInput
