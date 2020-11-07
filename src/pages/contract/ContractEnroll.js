import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "../../component/PostFixInput";
import PostFixInput2 from "../../component/PostFixInput2";
import AuthToken from "../../storages/Auth";

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
    buildingPurpose: "",
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
    lessor: {
      name: "",
      address: "",
      RRN: "",
      telephoneNum: "",
    },
    lessee: {
      name: "",
      address: "",
      RRN: "",
      telephoneNum: "",
    },
    realtor: {
      name: "",
      address: "",
      officeName: "",
      registrationNum: "",
      telephoneNum: "",
    },
  });
  const [attachments, setAttachments] = useState({});

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
    e.preventDefault();

    const formData = new FormData();

    formData.append("contract", JSON.stringify(constractEnroll));
    formData.append("attachments", attachments);

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
          history.push("/");
        } else {
          const error = new Error(res.error);

          throw error;
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry Fail to Contract");
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
          <Form.Control
          type="text"
          placeholder="주소"
          name="location"
          value={constractEnroll.location}
          onChange={handleInputChange}
        />
          
        </Form.Group>

        <Form.Group controlId="formBasicLandCategory">
          <Form.Label> 지목 </Form.Label>
          <div style={{display:"flex"}}>
          <Form.Control
            type="text"
            placeholder="지목"
            name="landCategory"
            style={{width:"380px", marginRight:"20px", }}
            value={constractEnroll.landCategory}
            onChange={handleInputChange}
          />
          <PostFixInput2
            labelText="토지의 면적"
            postfix="㎡"
            type="text"
            placeholder="면적"
            name="landArea"
            value={constractEnroll.landArea}
            onChange={handleInputChange}
          />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicBuildingPurpose">
          <Form.Label> 건물의 용도 </Form.Label>
          <div style={{display:"flex"}}>
          <Form.Control
            type="text"
            placeholder="종류"
            name="buildingPurpose"
            style={{width:"380px", marginRight:"20px", }}
            value={constractEnroll.buildingPurpose}
            onChange={handleInputChange}
          />
          <PostFixInput2
            labelText="부동산종류"
            postfix="㎡"
            type="text"
            placeholder="면적"
            name="buildingArea"
            value={constractEnroll.buildingArea}
            onChange={handleInputChange}
          />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicPartOfLease">
          <Form.Label> 임대할 부분 </Form.Label>
          <div style={{display:"flex  "}}>
          <Form.Control
            type="text"
            placeholder="임대할 부분"
            name="partOfLease"
            style={{width:"380px", marginRight:"20px", }}
            value={constractEnroll.partOfLease}
            onChange={handleInputChange}
          />
          <PostFixInput2
            labelText="부동산 종류"
            postfix="㎡"
            type="text"
            placeholder="면적"
            name="partOfLeaseArea"
            value={constractEnroll.partOfLeaseArea}
            onChange={handleInputChange}
          />
          </div>
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
                    rentType: e.target.value,
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
                    rentType: e.target.value,
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
          <PostFixInput
            labelText="차임"
            postfix="만 원"
            type="text"
            placeholder="금액"
            name="rent"
            value={constractEnroll.rent}
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
              name="lessor.name"
              style={{width:"330px", display:"inline-block"}}
              value={constractEnroll.lessor.name}
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
            <Form.Control
              type="text"
              placeholder="전화번호"
              style={{width:"450px", marginLeft:"20px", display:"inline-block"}}
              value={constractEnroll.lessor.telephoneNum}
              name="lessor.telephoneNum"
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
              name="lessor.address"
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
              name="lessor.RRN"
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
                name="lessee.name"
                value={constractEnroll.lessee.name}
                style={{width:"330px", display:"inline-block"}}
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
              <Form.Control
                type="text"
                placeholder="전화번호"
                name="lessee.telephoneNum"
                style={{width:"450px", marginLeft:"20px", display:"inline-block"}}
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
                name="lessee.address"
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
                name="lessee.RRN"
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
              name="realtor.name"
              style={{width:"330px", display:"inline-block"}}
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
            <Form.Control
              type="text"
              placeholder="전화번호"
              name="realtor.telephoneNum"
              style={{width:"450px", marginLeft:"20px", display:"inline-block"}}
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
              name="realtor.officeName"
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
              name="realtor.registrationNum"
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
              name="realtor.address"
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
            onChange={(e) => {
              setAttachments({
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
