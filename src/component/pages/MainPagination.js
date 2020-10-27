// import React from "react";
// import { Pagination } from "react-bootstrap";
// import { useParams, Link } from "react-router-dom";

// const MainPagination = (props) => {
//   return (
//     <Pagination
//       style={{ marginBottom: "50px", margin: "auto", width: "fit-content" }}
//     >
//       <Pagination.First />
//       <Pagination.Prev
//         onClick={(e) => {
//           console.log(props);
//         }}
//       >
//         <Link to={`${pageNo - 1}`}>
//           <span aria-hidden="true">›</span>
//         </Link>
//       </Pagination.Prev>

//       <Pagination.Next
//         onClick={(e) => {
//           console.log(props);
//         }}
//       >
//         <Link to={`${pageNo + 1}`}>
//           <span aria-hidden="true">›</span>
//         </Link>
//       </Pagination.Next>

//       <Pagination.Last />
//     </Pagination>
//   );
// };
