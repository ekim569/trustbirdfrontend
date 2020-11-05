import React, { useState } from "react";
import { Container, Button, Form} from "react-bootstrap";
import { useHistory } from "react-router-dom";

//Contract Output
const Contract = () => {
  const history = useHistory();
  const [contract, setContract] = useState({
    trustToken: "",
    token: "",
    preToken: "",
    location: "",
    landCategory: "",
    landArea: "",
    building: "",
    buildingPurpose: "",
    buildingArea: "",
    partOfLease: "",
    partOfLeaseArea: "",
    rentType: "",
    securityDeposit: "",
    contractPrice: "",
    interimPrice: "",
    balance: "",
    rent: "",
    specialAgreement: "",
    attachments: "",
    lessor: {
      address: "",
      RRN: "",
      name: "",
      telephoneNum: "",
    },
    lessee: {
      address: "",
      RRN: "",
      name: "",
      telephoneNum: "",
    },
    realtor: {
      address: "",
      officeName: "",
      name: "",
      registrationNum: "",
      telephoneNum: "",
    },
  });

s

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setContract({
      ...contract,
      [name]: value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    for (const [key, value] of Object.entries(contract)) {
      formData.append(key, value);
      if (key === "attachments") {
        formData.append(key, value);
      }
    }
  

    fetch("http://192.168.0.143:3001/api/user/contract", {
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

  return (
    <div>
      <div className="pageheader">계약서</div>

      <Container style={{ maxWidth: "720px", padding: 0 }}>
        <Form>
          <div>
            <table className="tablelayout">
              <tr className="tableborder">
                <td className="tableborder" style={{ width: "180px" }}>
                  소재지
                </td>
                <td className="tableborder" colspan="4"></td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder" style={{ width: "175px" }}>
                  토지
                </td>
                <td
                  placeholder=""
                  className="tableborder"
                  style={{ width: "135px" }}
                >
                  지목
                </td>
                <td className="tableborder"> {contract.landCategory} </td>
                <td className="tableborder" style={{ width: "135px" }}>
                  면적
                </td>
                <td className="tableborder" style={{ width: "135px" }}>
                  {contract.landArea}
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">건물</td>
                <td placeholder="용도">용도 </td>
                <td className="tableborder">{contract.buildingPurpose} </td>
                <td className="tableborder">면적</td>
                <td className="tableborder">{contract.buildingArea} </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">임대할 부분</td>
                <td className="tableborder" colspan="2">
                  {" "}
                  {contract.partOfLease}
                </td>
                <td className="tableborder">면적 </td>
                <td className="tableborder">{contract.partOfLeaseArea} </td>
              </tr>
              <tr className="tableborder" className="tableborder">
                <td className="tableborder">임대형태</td>
                <td className="tableborder" colspan="4">
                  {" "}
                  {contract.rentType}
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">보증금</td>
                <td className="tableborder" colspan="4">
                  {" "}
                  {contract.securityDeposit}
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">계약금</td>
                <td className="tableborder" colspan="4">
                  {contract.contractPrice}
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">중도금</td>
                <td className="tableborder" colspan="4">
                  {contract.interimPrice}
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">잔금</td>
                <td className="tableborder" colspan="4">
                  {contract.balane}
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">차임</td>
                <td className="tableborder" colspan="4">
                  {contract.rent}
                </td>
              </tr>
            </table>
          </div>

          <Form.Label>특약사항</Form.Label>
          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" colspan="4">
                {contract.specialAgreement}
              </td>
            </tr>
          </table>

          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                임대인
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessor.name}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                주소
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessor.address}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                전화번호
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessor.telephoneNum}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                주민등록번호
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessor.RRN}
              </td>
            </tr>
          </table>
          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                임차인
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessee.name}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                주소
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessee.address}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                전화번호
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessee.telephoneNum}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                주민등록번호
              </td>
              <td className="tableborder" colspan="4">
                {contract.lessee.RRN}
              </td>
            </tr>
          </table>

          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                중개인
              </td>
              <td className="tableborder" colspan="4">
                {contract.realtor.name}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                사무실 명칭
              </td>
              <td className="tableborder" colspan="4">
                {contract.realtor.officeName}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                사무실 주소
              </td>
              <td className="tableborder" colspan="4">
                {contract.realtor.address}
              </td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                공인중개사 등록번호
              </td>
              <td className="tableborder" colspan="4"></td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "180px" }}>
                전화번호
              </td>
              <td className="tableborder" colspan="4">
                {contract.realtor.telephoneNum}
              </td>
            </tr>
          </table>

          <Form.Label>첨부파일</Form.Label>
          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" colspan="4">
                {contract.attachments}
              </td>
            </tr>
          </table>

          <div style={{ float: "right" }}>
            <Button
              variant="primary"
              type="submit"
              className="button2"
              style={{ marginRight: "16px" }}
            >
              수정
            </Button>
            <Button variant="primary" type="submit" className="button2">
              삭제
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Contract;
