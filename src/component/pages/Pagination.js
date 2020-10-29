import React, { useState } from "react";
import { Pagination as ReactPagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Pagination = (props) => {
  const [pagination, setPagination] = useState({
    totalLength: "totalLength" in props ? this.props.totalLength : 0,
    row: "row" in props ? this.props.row : 5,
    currentPaginationNo:
      "currentPaginationNo" in props ? this.props.currentPaginationNo : 1,
    path: "path" in props ? this.props.path : "",
    currentSection: pagination.totalLength > 5 ? 5 : pagination.totalLength,
  });
  const history = useHistory();

  return (
    <ReactPagination
      style={{ marginBottom: "50px", margin: "auto", width: "fit-content" }}
    >
      {() => {
        if (pagination.currentSection > pagination.row) {
          return (
            <ReactPagination.Prev
              onClick={(e) => {
                setPagination({
                  currentSection: (pagination.currentSection -= pagination.row),
                });
              }}
            >
              이전
            </ReactPagination.Prev>
          );
        }
      }}

      {() => {
        for (
          let paginationNo = pagination.currentSection + 1;
          paginationNo <= pagination.currentSection + pagination.row;
          paginationNo++
        ) {
          return (
            <ReactPagination.Item
              key={paginationNo}
              active={paginationNo === pagination.currentPaginationNo}
              onClick={(e) => {
                history.push({
                  pathname: pagination.path,
                  state: { currentLocation: e.target.key },
                });
              }}
            >
              {paginationNo}
            </ReactPagination.Item>
          );
        }

        setPagination({
          currentSection: (pagination.currentSection =
            pagination.currentSection + pagination.row >
            Math.ceil(pagination.totalLength / pagination.row)
              ? Math.ceil(pagination.totalLength / pagination.row)
              : pagination.currentSection + pagination.row),
        });
      }}

      {() => {
        if (pagination.currentSection < pagination.totalLength) {
          return (
            <ReactPagination.Next
              onClick={(e) => {
                setPagination({
                  currentSection: (pagination.currentSection += pagination.row),
                });
              }}
            >
              이전
            </ReactPagination.Next>
          );
        }
      }}
    </ReactPagination>
  );
};

module.exports = Pagination;
