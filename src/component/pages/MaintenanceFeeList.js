import React, { useEffect, useState } from "react";
import { Container, Table, Pagination, Button } from "react-bootstrap";
import { Link, useHistory,} from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import MaintenanceFee from "./MaintenanceFee";

import "./Page.css";
//userEffect

//Maintenance Fee List
const MaintenanceFeeList = () => {
  const [maintenanceFeeList, setMaintenanceFeeList] = useState([]);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEvent = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/maintenancefee",
      state: { maintenanceFeeList: maintenanceFeeList },
    });
  };

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setMaintenanceFeeList({
      ...maintenanceFeeList,
      [name]: value,
    });
  }

  useEffect(() => {
    const body= {
      email : "page1111@naver.com"
    }

    fetch("http://192.168.0.22:3001/api/user/maintenancefeelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res)
      const data = maintenanceFeeList.concat(res)
      setMaintenanceFeeList(data)
      
      // for(let i = 0; i < res.length; i++){
      //   setMaintenanceFeeList([...maintenanceFeeList,
      //     {
      //       amountDue : res[0].amountDue,
      //       claimingAgency : res[0].claimingAgency,
      //       dueDate : res[0].dueDate,
      //       electronicPaymentNum : res[0].electronicPaymentNum
      //     }]);
      // }
  });
},[])
console.log(maintenanceFeeList)

  return(
    <Container style={{marginTop:"150px"}}>
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
            <th style={{width:"140px" }} >영수증 보기</th>
            </tr>
        </thead> 
        <tbody>
          {
            maintenanceFeeList.map(data=>(
        <tr>
          <td>1</td>
          <td>{data.amountDue}</td>
          <td>{data.claimingAgency}</td>
          <td>{data.dueDate}</td>
          <td>{data.electronicPaymentNum}</td>
          <td >
          <Button variant="" onClick={handleShow} className="scopeimage">
      
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName="custom-dialog" > 
        <Modal.Header closeButton style={{maxWidth:"100%"}}>
          <Modal.Title className="modalheader">관리비 내역</Modal.Title>
        </Modal.Header>
        <Modal.Body> <MaintenanceFee/> </Modal.Body>
      </Modal>
      </td>
      </tr>
    
      ))
      }         
          </tbody>
      </Table>
  </Container>
  );
  
}

export default MaintenanceFeeList;
