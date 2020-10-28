import React, { useEffect, useState } from "react";
import { Container, Table, Pagination, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import "./Page.css";
//userEffect

//Maintenance Fee List
const MaintenanceFeeList = () => {
  const [maintenanceFeeList, setMaintenanceFeeList] = useState({
    no: 0,
    claimingAgency: "",
    electronicPaymentNum: "",
    dueDate: "",
    amountDeadline: "",
  });
  const history = useHistory();

  const pageLow = 7;
  const paginationLow = 5;

  let currentPageNo = 0;
  let currentPaginationNo = 0;

  const handleEvent = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/maintenancefee",
      state: { maintenanceFeeList: maintenanceFeeList },
    });
  };

  useEffect(() => {
    fetch("/api/maintenancefeelist/list")
      .then((res) => res.json())
      .then((maintenanceFeeList) => {
        let maintenanceFees = new Array();

        for (let i = 1; i < maintenanceFeeList.length; i++) {
          maintenanceFees.push({
            No: i,
            claimingAgency: maintenanceFeeList.claimingAgency,
            electronicPaymentNum: maintenanceFeeList.electronicPaymentNum,
            dueDate: maintenanceFeeList.dueDate,
            amountDeadline: maintenanceFeeList.amountDeadline,
          });
        }

        setMaintenanceFeeList(maintenanceFees);
        // pageNo = Math.ceil(maintenanceFeeList.length / 7);
      });
  });

  return (
    <Container>
      <div className="pageheader">관리비 내역 목록</div>
      <Table bordered={true} style={{ marginBottom: "100px" }}>
        <thead>
          <tr>
            <th>NO.</th>
            <th>청구 기관</th>
            <th>전자 번호</th>
            <th>납부 내 기한</th>
            <th>납부 내 금액</th>
            <th>보기</th>
          </tr>
        </thead>
        <tbody>
          {() => {
            for (let i = currentPageNo; i < currentPageNo + pageLow; i++) {
              return (
                <tr>
                  <td>{maintenanceFeeList[i].No}</td>
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
            }
            currentPageNo =
              currentPageNo + pageLow > maintenanceFeeList.length
                ? maintenanceFeeList.length
                : currentPageNo + pageLow;
          }}
        </tbody>
      </Table>

      {/* <Pagination
        style={{ marginBottom: "50px", margin: "auto", width: "fit-content" }}
      >
        <Pagination.Prev
          onClick={(e) => {
            currentPaginationNo -= paginationLow;
            currentPageNo = currentPageNo;
          }}
        >
          이전
        </Pagination.Prev>
        {() => {
          for (
            let paginationNo = currentPaginationNo + 1;
            paginationNo <= currentPaginationNo + paginationLow;
            paginationNo++
          ) {
            return <Pagination onClick={() => {}}>{paginationNo}</Pagination>;
          }

          currentPaginationNo =
            currentPaginationNo + paginationLow >
            Math.ceil(maintenanceFeeList.length / pageLow)
              ? Math.ceil(maintenanceFeeList.length / pageLow)
              : currentPaginationNo + paginationLow;
        }}
        <Pagination.Next
          onClick={(e) => {
            currentPaginationNo += paginationLow;
          }}
        >
          다음
        </Pagination.Next>
      </Pagination> */}
    </Container>
  );
};

export default MaintenanceFeeList;
