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

  const MaintenanceFeeList = () => {
    const history = useHistory();
  const [maintenanceFeeList, setMaintenanceFeeList] = useState({
    no:0,
    claimingAgency: "",
    electronicPaymentNum: "",
    deadline: "",
    amountDue: "",
    amountDeadline: "",
    payment: "",
    payer:"",
  });

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setMaintenanceFeeList({
      ...maintenanceFeeList,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for(const [key, value] of Object.entries(contract)){
      formData.append(key, value)
      if(key === 'attachments'){
      formData.append(key, value, )
      }
    }

    fetch("http://192.168.0.22:3001/api/user/contract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contract),
    })
      .then((res) => {
        if (res.status === 200) {
          history.push("/signin");
        } else {
          const error = new Error(res.error);

          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error loggin in please try again");
      });
  }

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
      });
    });


    return(
    <Container>
    <div className="maintenanceimage" >
    <div className="pageheader" style={{marginTop:"50px"}} >관리비 내역 목록</div>
    </div>
    <Table bordered={true} style={{ marginBottom: "100px" ,textAlign:"center" }}>
      <thead>
        <tr >
          <th style={{width:"5%"}}>NO.</th>
          <th>관리비 청구 기관</th>
          <th>납부 날짜</th>
          <th>관리비</th>
          <th>납부 여부</th>
          <th>영수증 보기</th>
        </tr>
        <tr><td>{maintenanceFeeList[i].no}</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
        <tr><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td><td>df</td></tr>
      </thead>
      <tbody>
      </tbody>
    </Table>

   
  </Container>
  );
  
};

export default MaintenanceFeeList;
