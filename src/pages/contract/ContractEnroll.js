import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import PostFixInput from "../../component/PostFixInput";
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
      RRN: "",
      telephoneNum: "",
    },
  });

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

    fetch("http://192.168.0.143:3001/api/contract/enroll", {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(constractEnroll),
    }).then((res) => {
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
          <div>
          <PostFixInput
            labelText="지목"
            postfix=""
            type="text"
            placeholder="지번"
            name="landCategory"
            value={constractEnroll.landCategory}
            onChange={handleInputChange}
          />
          <PostFixInput
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
          <Form.Control labelText="건물의 용도" type="text" placeholder="용도" />
          <PostFixInput
            labelText="건물의 면적"
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
          <Form.Control type="text" placeholder="임대할 부분" />
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
          <Form.Label> 임대 기간 </Form.Label>

          <Form.Control
            type="text"
            name="Period"
            value={constractEnroll.Period}
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
              value={constractEnroll.lessor.name}
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   e.preventDefault();
              //   setConstractEnroll({
              //     ...constractEnroll,
              //     name: e.target.value,
              //   });
              // }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              name="telephoneNum"
              value={constractEnroll.lessor.telephoneNum}
              placeholder="전화번호"
              // onChange={(e) => {
              //   console.log(e.target.value);
              //   e.preventDefault();
              //   setConstractEnroll({
              //     ...constractEnroll,
              //     purpose: e.target.value,
              //   });
              // }}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주소"
              name="address"
              value={constractEnroll.lessor.address}
              onChange={handleInputChange}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주민번호"
              name="RRN"
              value={constractEnroll.lessor.RRN}
              onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
              />
            </tr>
            <tr>
              <Form.Control
                type="text"
                placeholder="전화번호"
                name="telephoneNum"
                value={constractEnroll.lessee.telephoneNum}
                onChange={handleInputChange}
                required
              />
            </tr>
            <tr>
              <Form.Control
                type="text"
                placeholder="주소"
                name="address"
                value={constractEnroll.lessee.address}
                onChange={handleInputChange}
                required
              />
            </tr>
            <tr>
              <Form.Control
                type="text"
                placeholder="주민번호"
                name="RRN"
                value={constractEnroll.lessee.RRN}
                onChange={handleInputChange}
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
              onChange={handleInputChange}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="전화번호"
              name="telephoneNum"
              value={constractEnroll.realtor.telephoneNum}
              onChange={handleInputChange}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주소"
              name="address"
              value={constractEnroll.realtor.address}
              onChange={handleInputChange}
              required
            />
          </tr>
          <tr>
            <Form.Control
              type="text"
              placeholder="주민번호"
              name="RRN"
              value={constractEnroll.realtor.RRN}
              onChange={handleInputChange}
              required
            />
          </tr>
        </table>

        <Button variant="primary" type="submit" className="button3">
          저장하기
        </Button>
      </Form>
    </Container>
  );
};

export default ContractEnroll;
