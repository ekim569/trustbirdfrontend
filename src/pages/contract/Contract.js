import React, { useState, useEffect } from "react"
import { Container, Button, Form } from "react-bootstrap"
import { useHistory } from "react-router-dom"

import AuthToken from "../../storages/Auth"

//Contract Output
const Contract = ({ location }) => {
  const authToken = AuthToken.get()
  const history = useHistory()

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
    attachments: new Array()
  })

  const onDelete = ((e) => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_SERVER}/api/contract/delete`, {
      mode: "cors",
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },
      body:JSON.stringify({token : contract.token, trustToken : contract.trustToken})
    })
    .then((res)=> {
      if(res.status === 200) {
        fetch(`${process.env.REACT_APP_SERVER}/api/trust/status`, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
          body : JSON.stringify({token : contract.trustToken, status : "사용자 계약 승인"})
        })
        .then((res) => {
          if(res.status === 200) {
            alert("Contract Delete Complete")
          } else {
            alert("Contract Delete Fail")
          }
          history.push("/contractlist/admin")
        })
     }
    })
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)

    fetch(`${process.env.REACT_APP_SERVER}/api/contract/find?token=${params.get('token')}`, {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      }
    })
    .then((res) => {
      if (res.status === 200) {
          return res.json()
      }
    })
    .then((res) => {
      if(res !== undefined){
        setContract(res)
      }
    })
  }, [authToken])

  return (
    <div>
      <div className="pageheader">계약서</div>

      <Container style={{ maxWidth: "720px", padding: 0 }}>
        <Form>
          <div>
            <table className="tablelayout">
              <tr className="tableborder">
                <td className="tableborder">소재지</td>
                <td className="tableborder" colspan="4">{contract.location}</td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder" style={{ width: "175px" }}>토지</td>
                <td className="tableborder" style={{ width: "135px" }}>지목</td>
                <td className="tableborder">{contract.landCategory}</td>
                <td className="tableborder" style={{ width: "135px" }}>면적</td>
                <td className="tableborder" style={{ width: "135px", textAlign:"end", paddingRight:"16px"}}>
                  {contract.landArea}<span className="fixoutput" >㎡</span>
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">건물</td>
                <td className="tableborder">용도</td>
                <td className="tableborder">{contract.buildingPurpose}</td>
                <td className="tableborder">면적</td>
                <td className="tableborder" style={{ width: "135px", textAlign:"end", paddingRight:"16px"}}>
                  {contract.buildingArea}<span className="fixoutput" >㎡</span>
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">임대할 부분</td>
                <td className="tableborder" colspan="2">{contract.partOfLease}</td>
                <td className="tableborder">면적 </td>
                <td className="tableborder" style={{ width: "135px", textAlign:"end", paddingRight:"16px"}}>
                  {contract.partOfLeaseArea}<span className="fixoutput" >㎡</span>
                </td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">임대형태</td>
                <td className="tableborder" colspan="4">{contract.rentType}</td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">보증금</td>
                <td className="tableborder" colspan="4">{contract.securityDeposit}</td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">계약금</td>
                <td className="tableborder" colspan="4">{contract.contractPrice}</td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">중도금</td>
                <td className="tableborder" colspan="4">{contract.interimPrice}</td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">잔금</td>
                <td className="tableborder" colspan="4">{contract.balane}</td>
              </tr>
              <tr className="tableborder">
                <td className="tableborder">차임</td>
                <td className="tableborder" colspan="4">{contract.rent}</td>
              </tr>
            </table>
          </div>

          <Form.Label>특약사항</Form.Label>
          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" colspan="4">{contract.specialAgreement}</td>
            </tr>
          </table>

          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" style={{width:"200px"}}>임대인</td>
              <td className="tableborder" colspan="4">{contract.lessor.name}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >주소</td>
              <td className="tableborder" colspan="4">{contract.lessor.address}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >전화번호</td>
              <td className="tableborder" colspan="4">{contract.lessor.telephoneNum}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >주민등록번호</td>
              <td className="tableborder" colspan="4">{contract.lessor.RRN}</td>
            </tr>
          </table>
          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" style={{width:"200px"}} >임차인</td>
              <td className="tableborder" colspan="4">{contract.lessee.name}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >주소</td>
              <td className="tableborder" colspan="4">{contract.lessee.address}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >전화번호</td>
              <td className="tableborder" colspan="4">{contract.lessee.telephoneNum}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >주민등록번호</td>
              <td className="tableborder" colspan="4">{contract.lessee.RRN}</td>
            </tr>
          </table>

          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" style={{ width: "200px" }}>중개인</td>
              <td className="tableborder" colspan="4">{contract.realtor.name}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >사무실 명칭</td>
              <td className="tableborder" colspan="4">{contract.realtor.officeName}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >사무실 주소</td>
              <td className="tableborder" colspan="4">{contract.realtor.address}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder" >공인중개사 등록번호</td>
              <td className="tableborder" colspan="4">{contract.realtor.registrationNum}</td>
            </tr>
            <tr className="tableborder">
              <td className="tableborder">전화번호</td>
              <td className="tableborder" colspan="4">{contract.realtor.telephoneNum}</td>
            </tr>
          </table>

          <Form.Label>첨부파일</Form.Label>
          <table className="tablelayout">
            <tr className="tableborder">
              <td className="tableborder" colspan="4">
                {contract.attachments.map((attachment) => {
                  return (
                      <a href={`${process.env.REACT_APP_IPFS}/ipfs/${attachment.filePath}`} target="_blank">
                        {attachment.fileName}<br /></a>
                  )
                })}
              </td>
            </tr>
          </table>

          <div style={{ float: "right" }}>            
            <Button className="button4" style={{ float:"left", marginRight:"16px" }} onClick={() => { history.push('/') }}>
              돌아가기
            </Button>
            <Button variant="primary" type="submit" className="button2" style={{ marginRight: "16px" }}
              onClick={(e) => {
                e.preventDefault()
                history.push(`/contractmodified/admin?token=${contract.token}`)
              }}>
              수정
            </Button>
            <Button variant="primary" type="submit" className="button2" onClick={onDelete} >삭제</Button>
          </div>
          
        </Form>
      </Container>
    </div>
  )
}

export default Contract
