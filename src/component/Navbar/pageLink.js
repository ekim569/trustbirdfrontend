import React from "react";
import { Link } from "react-router-dom";

const PageLink = ({ to, children }) => {
  return (
    <Link to={to} style={{ color: "inherit", textDecoration: "inherit" }}>
      {children}
    </Link>
  );
};

// NavbarLink.defautProps = {
//   to: "/",
//   linkName: "link",
// };

// NavbarLink.propTypes = {
//   to: PropTypes.string,
//   linkName: PropTypes.string,
// };

export default PageLink;
