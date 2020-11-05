import React, { useState } from "react";
import { Container, Button, Form, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "./PostFixInput";
import AuthToken from "../../storages/Auth";
import "./Page.css";

//Contract Enrollment
const ContractEnroll = () => {
  const token = AuthToken.get();

  const history = useHistory();
  const [constractEnroll, setConstractEnroll] = useState({
    token: "",
    preToken: "",
    location: "",
    landCategory: "",
    landArea: "",
    buildingpurpose: "",
    buildingArea: "",
    partOfLease: "",
    partOfLeaseArea: "",
    rentType: "",
    periodStart: "",
    periodEnd: "",
    securityDeposit: "",
    contractPrice: "",
    interimPrice: "",
    balance: "",
    rent: "",
    specialAgreement: "",
    "lessor.name": "",
    "lessor.address": "",
    "lessor.RRN": "",
    "lessor.telephoneNum": "",
    "lessee.name": "",
    "lessee.address": "",
    "lessee.RRN": "",
    "lessee.telephoneNum": "",
    "realtor.name": "",
    "realtor.telephoneNum": "",
    "realtor.officeName": "",
    " realtor.registrationNum": "",
    " realtor.address": "",
    attachments: {},
  });

  // token: "100",
  // preToken: "50",
  // location: "지구",
  // landCategory: "몰라",
  // landArea: "100",
  // buildingpurpose: "100",
  // buildingArea: "적당히",
  // partOfLease: "몰라",
  // partOfLeaseArea: "몰라",
  // rentType: "ㅇㄹ",
  // periodStart: "",
  // periodEnd: "",
  // securityDeposit: "10000",
  // contractPrice: "20",
  // interimPrice: "04",
  // balance: "1000",
  // rent: "390",
  // specialAgreement: "30434",
  // lessor: {
  //   name: "",
  //   address: "",
  //   RRN: "",
  //   telephoneNum: "",
  // },
  // lessee: {
  //   name: "",
  //   address: "",
  //   RRN: "",
  //   telephoneNum: "",
  // },
  // realtor: {
  //   name: "",
  //   telephoneNum: "",
  //   officeName: "",
  //   registrationNum: "",
  //   address: "",
  // },
  // });

  // function subDataChange(e) {
  //   e.preventDefault();

  //   const { value, name } = e.target;
  //   console.log(value, name);

  //   setConstractEnroll({
  //     ...lessor,
  //     [name]: value,
  //   });
  // }

  function handleInputChange(e) {
    e.preventDefault();

    const { value, name } = e.target;

    console.log(value, name);

    setConstractEnroll({
      ...constractEnroll,
      [name]: value,
    });
  }

  function onSubmit(e) {
    console.log(constractEnroll);
    console.log(JSON.stringify(constractEnroll));
    e.preventDefault();

    const formData = new FormData();

    formData.append("contract", JSON.stringify(constractEnroll));

    fetch("http://192.168.0.143:3001/api/contract/enroll", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
    <Container>
      <div className="pageheader">계약서 등록</div>
      <Form
        style={{ maxWidth: "800px", margin: "auto" }}
        className="sign-form"
        onSubmit={onSubmit}
      >
        <Form.Group controlId="formBasicLocation">
          <Form.Label> 계약 소재지 </Form.Label>
          <PostFixInput
            labelText="계약 소재지"
            postfix=""
            type="text"
            placeholder="주소"
            name="location"
            value={constractEnroll.location}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLandCategory">
          <Form.Label> 지목 </Form.Label>
          <PostFixInput
            labelText="지목"
            postfix=""
            type="text"
            placeholder="지번"
            name="landCategory"
            value={constractEnroll.landCategory}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicLandArea">
          <Form.Label> 토지의 면적 </Form.Label>
          <PostFixInput
            labelText="토지의 면적"
            postfix="㎡"
            type="text"
            placeholder="면적"
            name="landArea"
            value={constractEnroll.landArea}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBuildingPurpose">
          <Form.Label> 건물의 용도 </Form.Label>
          <PostFixInput
            labelText="건물의 용도"
            postfix=""
            type="text"
            placeholder="종류"
            name="buildingpurpose"
            value={constractEnroll.buildingpurpose}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBuildingArea">
          <Form.Label> 건물의 면적 </Form.Label>
          <PostFixInput
            labelText="부동산종류"
            postfix="㎡"
            type="text"
            placeholder="면적"
            name="buildingArea"
            value={constractEnroll.buildingArea}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPartOfLease">
          <Form.Label> 임대할 부분 </Form.Label>
          <Form.Control
            type="text"
            placeholder="임대할 부분"
            name="partOfArea"
            value={constractEnroll.partOfArea}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPartOfLeaseArea">
          <Form.Label> 임대할 부분의 면적 </Form.Label>
          <PostFixInput
            labelText="부동산 종류"
            postfix="㎡"
            type="text"
            placeholder="면적"
            name="partOfLeaseArea"
            value={constractEnroll.partOfLeaseArea}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div>
          <Form.Group>
            <Form.Label>전 · 월세</Form.Label>
            <br />
            <Form
              controlId="formBasicMonthly"
              style={{ display: "inline-block", marginRight: "32px" }}
            >
              <Form.Check
                type="checkbox"
                label="전세"
                name="rentType"
                onChange={(e) => {
                  console.log(e.target.value);
                  e.preventDefault();
                  setConstractEnroll({
                    ...constractEnroll,
                    purpose: e.target.value,
                  });
                }}
                value="전세"
                required
              />
            </Form>
            <Form
              controlId="formBasicResevations"
              style={{ display: "inline-block" }}
            >
              <Form.Check
                type="checkbox"
                label="월세"
                name="rentType"
                onChange={(e) => {
                  console.log(e.target.value);
                  e.preventDefault();
                  setConstractEnroll({
                    ...constractEnroll,
                    purpose: e.target.value,
                  });
                }}
                value="월세"
                required
              />
            </Form>
          </Form.Group>
        </div>

        <Form.Group controlId="formBasicPeriod">
          <Form.Label> 임대 시작일 </Form.Label>

          <Form.Control
            type="date"
            name="periodStart"
            value={constractEnroll.periodStart}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPeriod">
          <Form.Label> 임대 만료일 </Form.Label>

          <Form.Control
            type="date"
            name="periodEnd"
            value={constractEnroll.periodEnd}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicSecurityDeposit">
          <Form.Label> 보증금 </Form.Label>
          <PostFixInput
            labelText="보증금"
            postfix="만 원"
            type="text"
            name="securityDeposit"
            value={constractEnroll.securityDeposit}
            onChange={handleInputChange}
            placeholder="금액"
          />
        </Form.Group>

        <Form.Group controlId="formBasicContractPrice">
          <Form.Label> 계약금 </Form.Label>
          <PostFixInput
            labelText="계약금"
            postfix="만 원"
            type="text"
            placeholder="금액"
            name="contractPrice"
            value={constractEnroll.contractPrice}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicInterimPrice">
          <Form.Label> 중도금 </Form.Label>
          <PostFixInput
            labelText="중도금"
            postfix="만 원"
            type="text"
            placeholder="금액"
            name="interimPrice"
            value={constractEnroll.interimPrice}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicBalance">
          <Form.Label> 잔금</Form.Label>
          <PostFixInput
            labelText="잔금"
            postfix="만 원"
            type="text"
            placeholder="금액"
            name="balance"
            value={constractEnroll.balance}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicRent">
          <Form.Label> 차임 </Form.Label>
          <Form.Control
            type="text"
            value={constractEnroll.rent}
            name="rent"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSpecialAgreement">
          <Form.Label>특약사항</Form.Label>
          <Form.Control
            value={constractEnroll.specialAgreement}
            name="specialAgreement"
            type="text"
            onChange={handleInputChange}
          />
        </Form.Group>

        <div>임대인</div>
        <table style={{ width: "100%" }}>
          <tr>
            <Form.Control
              type="text"
              placeholder="이름"
              name="name"
              value={constractEnroll.name}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  lessor: {
                    ...constractEnroll.lessor,
                    name: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              name="telephoneNum"
              value={constractEnroll.lessor.telephoneNum}
              placeholder="전화번호"
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  lessor: {
                    ...constractEnroll.lessor,
                    telephoneNum: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주소"
              name="address"
              value={constractEnroll.lessor.address}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  lessor: {
                    ...constractEnroll.lessor,
                    address: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주민번호"
              name="RRN"
              value={constractEnroll.lessor.RRN}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  lessor: {
                    ...constractEnroll.lessor,
                    RRN: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
        </table>

        <Form.Group>
          <div>임차인</div>
          <table style={{ width: "100%" }}>
            <tr>
              <Form.Control
                type="text"
                placeholder="이름"
                name="name"
                value={constractEnroll.lessee.name}
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      name: e.target.value,
                    },
                  });
                }}
                required
              />
            </tr>
            <tr>
              <Form.Control
                type="text"
                placeholder="전화번호"
                name="telephoneNum"
                value={constractEnroll.lessee.telephoneNum}
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      telephoneNum: e.target.value,
                    },
                  });
                }}
                required
              />
            </tr>
            <tr>
              <Form.Control
                type="text"
                placeholder="주소"
                name="address"
                value={constractEnroll.lessee.address}
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      address: e.target.value,
                    },
                  });
                }}
                required
              />
            </tr>
            <tr>
              <Form.Control
                type="text"
                placeholder="주민번호"
                name="RRN"
                value={constractEnroll.lessee.RRN}
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      RRN: e.target.value,
                    },
                  });
                }}
                required
              />
            </tr>
          </table>
        </Form.Group>

        <div>중개인</div>
        <table style={{ width: "100%" }}>
          <tr>
            <Form.Control
              type="text"
              placeholder="이름"
              name="name"
              value={constractEnroll.realtor.name}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  realtor: {
                    ...constractEnroll.realtor,
                    name: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="전화번호"
              name="telephoneNum"
              value={constractEnroll.realtor.telephoneNum}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  realtor: {
                    ...constractEnroll.realtor,
                    telephoneNum: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="사무실 이름"
              name="officeName"
              value={constractEnroll.realtor.officeName}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  realtor: {
                    ...constractEnroll.realtor,
                    officeName: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="등록번호"
              name="registrationNum"
              value={constractEnroll.realtor.registrationNum}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  realtor: {
                    ...constractEnroll.realtor,
                    registrationNum: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주소"
              name="address"
              value={constractEnroll.realtor.address}
              onChange={(e) => {
                setConstractEnroll({
                  ...constractEnroll,
                  realtor: {
                    ...constractEnroll.realtor,
                    address: e.target.value,
                  },
                });
              }}
              required
            />
          </tr>
        </table>

        <Form.Group controlId="formBasicAttachments">
          <Form.Label> 첨부파일 </Form.Label>
          <Form.File
            // onChange={handleInputChange}
            onChange={(e) => {
              setConstractEnroll({
                ...constractEnroll,
                attachments: e.target.files[0],
              });
            }}
            name="attachments"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="button3">
          저장하기
        </Button>
      </Form>
    </Container>
  );
};

export default ContractEnroll;
