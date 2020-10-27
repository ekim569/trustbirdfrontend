import React, { useEffect, useState } from "react";
import { Container, Table, Pagination, Button } from "react-bootstrap";
import { Link, useParams, useHistory } from "react-router-dom";

import "./Page.css";
//userEffect

//Maintenance Fee List


  const handleEvent = (e) => {
    e.preventDefault();
  };



  return (
    <Container>
      <div className="pageheader">관리비 내역 목록</div>
      <Table bordered={true} style={{ marginBottom: "100px" }}>
        <thead>
          <tr style={{textAlign:"center"}}>
            <th>NO.</th>
            <th>관리비 청구 기관</th>
            <th>관리비</th>
            <th>납부 여부</th>
            <th>영수증 보기</th>
          </tr>
        </thead>
        <tbody>
          {/* {() => {
            for (let i = currentPageNo; i < currentPageNo + pageLow; i++) {
              return (
                <tr>
                  <td>{[i] + 1}</td>
                  <td>{maintenanceFeeList[i].claimingAgency}</td>
                  <td>{maintenanceFeeList[i].electronicPaymentNum}</td>
                  <td>{maintenanceFeeList[i].dueDate}</td>
                  <td>{maintenanceFeeList[i].amountDue}</td>
                  <td>
                    <Link to="/maintenancefee" onClick={handleEvent}>
                      <Button>관리비 내역</Button>
                    </Link>
                  </td>
                </tr>
              );
            } */}
            {/* // currentPageNo =
            //   currentPageNo + pageLow > maintenanceFeeList.length
            //     ? maintenanceFeeList.length
            //     : currentPageNo + pageLow; */}
          {/* }} */}
        </tbody>
      </Table>

     
    </Container>
  );
};

export default MaintenanceFeeList;
