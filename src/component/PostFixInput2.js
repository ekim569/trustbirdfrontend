import React from "react"
import { Form } from "react-bootstrap"

import "../pages/Page.css

const PostFixInput2 = ({ type, placeholder, postfix, onChange, ...props }) => {
  return (
    <div style={{ position: "relative", width:"400px", display:"inline-block"}}>
      <Form.Control type={type} onChange={onChange} placeholder={placeholder} style={ Object.assign({ paddingRight: 44 }, props.style) } {...props} required />
      <span className="fixinput">{postfix}</span>
    </div>
  )
}

export default PostFixInput2
