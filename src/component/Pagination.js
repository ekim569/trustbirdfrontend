import React from "react"
import { Pagination as BSPagination } from "react-bootstrap"

const Pagination = ({totalLength, active, last, paginationLimite, onClick }) => {
    return (
        <BSPagination>
            {(() => {
                if ( active > paginationLimite ) {
                    return (
                        <BSPagination.Prev onClick={() => onClick((Math.ceil(active / paginationLimite) - 1) * paginationLimite)} />
                    );
                }
            })()}

            {(() => {
              if(totalLength > 0) {
                let length = 1
                let start = 1

                if (Math.ceil(active / paginationLimite) < Math.ceil(last / paginationLimite)) {
                    length = Math.ceil(active / paginationLimite) * paginationLimite
                    start = length - paginationLimite + 1
                } else {
                    length = last
                    start = last % paginationLimite === 0 ?
                        last - paginationLimite + 1 :
                        last - (last % paginationLimite) + 1
                }

                let array = new Array();

                for (let index = start; index <= length; index++) {
                    if (index === active) {
                        array.push(<BSPagination.Item onClick={() => onClick(index)} active>{index}</BSPagination.Item>)
                    } else {
                        array.push(<BSPagination.Item onClick={() => onClick(index)}>{index}</BSPagination.Item>)
                    }
                }
                return array
              }
            })()}

            {(() => {
                if (Math.ceil(last / paginationLimite) > Math.ceil(active / paginationLimite)) {
                    return (
                        <BSPagination.Next onClick={() => onClick(Math.ceil(active / paginationLimite) * paginationLimite + 1)} />
                    );
                }
            })()}
        </BSPagination>
    )
}

Pagination.defaultProps = {
    active: 1,
    paginationLimite: 5
}

export default Pagination