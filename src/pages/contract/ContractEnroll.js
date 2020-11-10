import React, { useState } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import Uppy from '@uppy/core'
import { Dashboard  } from '@uppy/react'

import  PostFixInput2 from "../../component/PostFixInput2"
import  PostFixInput3 from "../../component/PostFixInput3"
import AuthToken from "../../storages/Auth"

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

//Contract Enrollment
const ContractEnroll = ({ location }) => {
  const history = useHistory()
  const authToken = AuthToken.get()
  const parmas = new URLSearchParams(location.search)

  const [constractEnroll, setConstractEnroll] = useState({
    trustToken: parmas.get('token'),
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
      telephoneNum: ""
    },
    lessee: {
      name: "",
      address: "",
      RRN: "",
      telephoneNum: ""
    },
    realtor: {
      name: "",
      address: "",
      officeName: "",
      registrationNum: "",
      telephoneNum: ""
    }
  })

  const uppy = new Uppy({
    debug: true,
    autoProceed: false,
    restrictions: {
      maxFileSize: 100000000,
      maxNumberOfFiles: 3,
      allowedFileTypes: [".jpg", ".png", ".pdf"]
    }
  })

  const handleInputChange = (e) => {
    e.preventDefault()

    const { value, name } = e.target

    setConstractEnroll({
      ...constractEnroll,
      [name]: value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    
    formData.append("contract", JSON.stringify(constractEnroll))

    for(let file of Object.values(uppy.state.files)){
      formData.append("attachments", file.data)
    }

    fetch(`${process.env.REACT_APP_SERVER}/api/contract/enroll`, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      body: formData
    })
    .then((res) => {
      if (res.status === 200) {
        history.push("/contractlist/admin")
      } else {
        const error = new Error(res.error)
        throw error
      }
    })
    .catch((err) => {
      console.error(err)
      alert("Error!")
    })
  }

  return (
    <Container>
      <div className="pageheader">계약서 등록</div>
      <Form style={{ maxWidth: "800px", margin: "auto" }} className="sign-form" onSubmit={onSubmit}>
        <Form.Group controlId="formBasicLocation">
          <Form.Label> 계약 소재지 </Form.Label>
          <Form.Control type="text" placeholder="주소" name="location" value={constractEnroll.location} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicLandCategory">
          <Form.Label> 지목 </Form.Label>
          <div style={{ display: "flex" }}>
            <Form.Control type="text" placeholder="지목" name="landCategory" style={{ width: "380px", marginRight: "20px" }} value={constractEnroll.landCategory} onChange={handleInputChange} />
            <PostFixInput2 labelText="토지의 면적" postfix="㎡" type="text" placeholder="면적" name="landArea" value={constractEnroll.landArea} onChange={handleInputChange} />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicBuildingPurpose">
          <Form.Label> 건물의 용도 </Form.Label>
          <div style={{ display: "flex" }}>
            <Form.Control type="text" placeholder="종류" name="buildingPurpose" style={{ width: "380px", marginRight: "20px" }} value={constractEnroll.buildingPurpose} onChange={handleInputChange} />
            <PostFixInput2 labelText="부동산종류" postfix="㎡" type="text" placeholder="면적" name="buildingArea" value={constractEnroll.buildingArea} onChange={handleInputChange} />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicPartOfLease">
          <Form.Label> 임대할 부분 </Form.Label>
          <div style={{ display: "flex" }}>
            <Form.Control type="text" placeholder="임대할 부분" name="partOfLease" style={{ width: "380px", marginRight: "20px" }} value={constractEnroll.partOfLease} onChange={handleInputChange} />
            <PostFixInput2 labelText="부동산 종류" postfix="㎡" type="text" placeholder="면적" name="partOfLeaseArea" value={constractEnroll.partOfLeaseArea} onChange={handleInputChange} />
          </div>
        </Form.Group>
        
        <div>
          <Form.Group>
            <Form.Label>전 · 월세</Form.Label><br />
            <Form controlId="formBasicMonthly" style={{ display: "inline-block", marginRight: "32px" }}>
              <Form.Check type="checkbox" label="전세" name="rentType" value="전세" required
                onChange={(e) => {
                  e.preventDefault()
                  setConstractEnroll({
                    ...constractEnroll,
                    rentType: e.target.value,
                  })
                }}/>
            </Form>

            <Form controlId="formBasicResevations" style={{ display: "inline-block" }}>
              <Form.Check type="checkbox" label="월세" name="rentType" value="월세" required
                onChange={(e) => {
                  e.preventDefault()
                  setConstractEnroll({
                    ...constractEnroll,
                    rentType: e.target.value,
                  })
                }}/>
            </Form>
          </Form.Group>
        </div>

        <Form.Group controlId="formBasicPeriod">
          <Form.Label> 임대 기간 </Form.Label>
          <div>
            <Form.Control type="date" name="periodStart" style={{ width: "390px", marginRight: "20px", display: "inline-block" }} value={constractEnroll.periodStart} onChange={handleInputChange} required />
            <Form.Control type="date" name="periodEnd" style={{ width: "390px", display: "inline-block" }} value={constractEnroll.periodEnd} onChange={handleInputChange} required />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicSecurityDeposit">
          <Form.Label> 보증금 / 차임 </Form.Label>
          <div>
            <PostFixInput2 labelText="보증금" postfix="만 원" type="text" name="securityDeposit" style={{ width: "390px", marginRight: "10px" }} value={constractEnroll.securityDeposit} onChange={handleInputChange} placeholder="금액" />
            <PostFixInput2 labelText="차임" postfix="만 원" type="text" placeholder="금액" name="rent" style={{ width: "390px", marginLeft: "10px" }} value={constractEnroll.rent} onChange={handleInputChange} />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicContractPrice">
          <Form.Label> 계약금 / 중도금 / 잔금 </Form.Label>
          <div>
            <PostFixInput3 labelText="계약금" postfix="만 원" type="text" placeholder="금액" name="contractPrice" value={constractEnroll.contractPrice} onChange={handleInputChange} />
            <PostFixInput3 labelText="중도금" postfix="만 원" type="text" placeholder="금액" name="interimPrice" value={constractEnroll.interimPrice} onChange={handleInputChange} />
            <PostFixInput3 labelText="잔금" postfix="만 원" type="text" placeholder="금액" name="balance" value={constractEnroll.balance} className="inline-nput" onChange={handleInputChange} />
          </div>
        </Form.Group>

        <Form.Group controlId="formBasicSpecialAgreement">
          <Form.Label>특약사항</Form.Label>
          <Form.Control value={constractEnroll.specialAgreement} name="specialAgreement" type="text" onChange={handleInputChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>임대인</Form.Label>
          <table style={{ width: "100%" }}>
            <tr>
              <Form.Control type="text" placeholder="이름" name="lessor.name" style={{ width: "330px", display: "inline-block", marginBottom: "5px" }} value={constractEnroll.lessor.name} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessor: {
                      ...constractEnroll.lessor,
                      name: e.target.value,
                    },
                  })
                }}/>
              <Form.Control type="text" placeholder="전화번호" style={{ width: "450px", marginLeft: "20px", display: "inline-block", marginBottom: "5px" }} value={constractEnroll.lessor.telephoneNum} name="lessor.telephoneNum" required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessor: {
                      ...constractEnroll.lessor,
                      telephoneNum: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="주소" name="lessor.address" style={{ marginBottom: "5px" }} value={constractEnroll.lessor.address} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessor: {
                      ...constractEnroll.lessor,
                      address: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="주민번호" name="lessor.RRN" style={{ marginBottom: "5px" }} value={constractEnroll.lessor.RRN} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessor: {
                      ...constractEnroll.lessor,
                      RRN: e.target.value,
                    },
                  })
                }}/>
            </tr>
          </table>
        </Form.Group>

        <Form.Group>
          <Form.Label>임차인</Form.Label>
          <table style={{ width: "100%" }}>
            <tr>
              <Form.Control type="text" placeholder="이름" name="lessee.name" value={constractEnroll.lessee.name} style={{ width: "330px", display: "inline-block", marginBottom: "5px" }} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      name: e.target.value,
                    },
                  })
                }}/>
              <Form.Control type="text" placeholder="전화번호" name="lessee.telephoneNum" style={{ width: "450px", marginLeft: "20px", display: "inline-block", marginBottom: "5px" }} value={constractEnroll.lessee.telephoneNum} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      telephoneNum: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="주소" name="lessee.address" value={constractEnroll.lessee.address} style={{ marginBottom: "5px" }} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      address: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="주민번호" name="lessee.RRN" value={constractEnroll.lessee.RRN} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    lessee: {
                      ...constractEnroll.lessee,
                      RRN: e.target.value,
                    },
                  })
                }}/>
            </tr>
          </table>
        </Form.Group>

        <Form.Group>
          <Form.Label>중개인</Form.Label>
          <table style={{ width: "100%" }}>
            <tr>
              <Form.Control type="text" placeholder="이름" name="realtor.name" style={{ width: "330px", display: "inline-block", marginBottom: "5px" }} value={constractEnroll.realtor.name} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    realtor: {
                      ...constractEnroll.realtor,
                      name: e.target.value,
                    },
                  })
                }}/>
              <Form.Control type="text" placeholder="전화번호" name="realtor.telephoneNum" style={{ width: "450px", marginLeft: "20px", display: "inline-block" }} value={constractEnroll.realtor.telephoneNum} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    realtor: {
                      ...constractEnroll.realtor,
                      telephoneNum: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="사무실 이름" name="realtor.officeName" style={{ marginBottom: "5px" }} value={constractEnroll.realtor.officeName} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    realtor: {
                      ...constractEnroll.realtor,
                      officeName: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="등록번호" name="realtor.registrationNum" style={{ marginBottom: "5px" }} value={constractEnroll.realtor.registrationNum} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    realtor: {
                      ...constractEnroll.realtor,
                      registrationNum: e.target.value,
                    },
                  })
                }}/>
            </tr>
            <tr>
              <Form.Control type="text" placeholder="주소" name="realtor.address" style={{ marginBottom: "5px" }} value={constractEnroll.realtor.address} required
                onChange={(e) => {
                  setConstractEnroll({
                    ...constractEnroll,
                    realtor: {
                      ...constractEnroll.realtor,
                      address: e.target.value,
                    },
                  })
                }}/>
            </tr>
          </table>
        </Form.Group>
        
        <Form.Group controlId="formBasicAttachments">
          <Form.Label> 첨부파일 </Form.Label>
          <div><Dashboard uppy={uppy} hideUploadButton={true} /></div>
        </Form.Group>
        
        <Button variant="primary" type="submit" className="button3"> 저장하기 </Button>
      </Form>
    </Container>
  )
}

export default ContractEnroll
