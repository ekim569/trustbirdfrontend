import React, { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import MaintenanceFee from "./MaintenanceFee";

const MaintenanceFeeListPage = ({ maintenanceFeeList, loc, pageLimit }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}>
          관리비 내역 목록
        </div>
      </div>
      <Table
        bordered={true}
        style={{ marginBottom: "100px", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th style={{ width: "5%" }}>NO.</th>
            <th>관리비 청구 기관</th>
            <th>납부 날짜</th>
            <th>관리비</th>
            <th>납부 여부</th>
            <th style={{ width: "140px" }}>영수증 보기</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceFeeList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((maintenanceFee) => (
              <tr key={maintenanceFee.token}>
                <td>{maintenanceFee.no}</td>
                <td>{maintenanceFee.amountDue}</td>
                <td>{maintenanceFee.claimingAgency}</td>
                <td>{maintenanceFee.dueDate}</td>
                <td>{maintenanceFee.electronicPaymentNum}</td>
                <td>
                  <Button
                    variant=""
                    onClick={handleShow}
                    className="scopeimage"
                  ></Button>

                  <Modal
                    show={show}
                    onHide={handleClose}
                    dialogClassName="custom-dialog"
                  >
                    <Modal.Header closeButton style={{ maxWidth: "100%" }}>
                      <Modal.Title className="modalheader">
                        관리비 내역
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <MaintenanceFee
                        electronicPaymentNum={
                          maintenanceFee.electronicPaymentNum
                        }
                      />
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MaintenanceFeeListPage;
