import React from "react";
import { Pagination as BSPagination } from "react-bootstrap";

const Pagination = ({ active, last, paginationLimite, onClick }) => {
  return (
    <BSPagination>
      {(() => {
        if (active > paginationLimite) {
          return (
            <BSPagination.Prev
              onClick={() =>
                onClick(
                  Math.floor(active / paginationLimite) * paginationLimite
                )
              }
            />
          );
        }
      })()}

      {(() => {
        let length =
          Math.ceil(active / paginationLimite) * paginationLimite > last
            ? Math.ceil(active / paginationLimite) * paginationLimite
            : last;

        let start = 1;

        let array = new Array();

        for (let index = start; index <= length; index++) {
          if (index === active) {
            array.push(
              <BSPagination.Item onClick={() => onClick(index)} active>
                {index}
              </BSPagination.Item>
            );
          } else {
            array.push(
              <BSPagination.Item onClick={() => onClick(index)}>
                {index}
              </BSPagination.Item>
            );
          }
        }

        return array;
      })()}

      {(() => {
        if (last > paginationLimite && active !== last) {
          return (
            <BSPagination.Next
              onClick={() =>
                onClick(
                  Math.ceil(active / paginationLimite) * paginationLimite + 1
                )
              }
            />
          );
        }
      })()}
    </BSPagination>
  );
};

Pagination.defaultProps = {
  active: 1,
  paginationLimite: 5,
};

export default Pagination;
