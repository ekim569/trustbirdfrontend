import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import MaintenanceFee from "./MaintenanceFee";


const MaintenanceFeeModal = ({electronicPaymentNum, handleClose}) => {
    return (
      <Modal
      show={true}
      onHide={handleClose}
      dialogClassName="custom-dialog"
      >
        <Modal.Header closeButton >
          <Modal.Title className="modalheader">
            관리비 내역
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MaintenanceFee
            electronicPaymentNum={
              electronicPaymentNum
            }
          />
        </Modal.Body>
      </Modal>
    )
  }

  export default MaintenanceFeeModal;