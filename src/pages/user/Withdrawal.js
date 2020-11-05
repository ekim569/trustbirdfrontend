import React from "react";
import { useHistory } from 'react-router-dom'
import { Container, Button } from "react-bootstrap";
import AuthToken from "../../storages/Auth";

//Withdrawal
const Withdrawal = () => {
  const history = useHistory()
  const token = AuthToken.get();
  
  const onSubmit = (e)=>{
    fetch(`http://192.168.0.143:3001/api/user/withdrawal`, {
        mode: "cors",
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res)=> {
        if(res.status === 200) {
          AuthToken.set("");
          alert("회원 탈퇴 되었습니다.")
          history.push("/")
        }
      })
  }
  return (
    <Container style={{marginTop:"200px"}} >
      <div className="pageheader" style={{fontSize:"30px"}}>회원탈퇴</div>
      <div
        style={{
          maxWidth:"100%",
          width: "800px",
          margin: "auto",
          border: "solid",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h5 style={{textAlign: "center",}}>계정 영구삭제</h5> <br />
        계졍을 영구적으로 삭제하려는 경우 저희에게 알려주세요. 삭제과정이
        시작되면 계정을 다시 활성화하거나 계정에 추가한 콘텐츠 또는 정보를
        가져올수 없습니다. 계정을 삭제하면 모두 삭제됩니다. 계정이 영구적으로
        삭제되기 전에 이 정보를 저장하려면 정보 사본을 다운로드 하세요.
      </div>
      <Container style={{
          maxWidth: "100%",
          marginTop: "16px",
          width:"800px",
          padding:"0",
          textAlign:"center"
      }}>
        <a href="/main" >
        <Button
          variant="primary"
          type="submit"
          className="button2"
        >
          취소
        </Button>
        </a>
        <Button
          variant="primary"
          type="submit"
          className="button2"
          style={{
            marginLeft:"16px",            
          }}
          onClick={onSubmit}
        >
          탈퇴하기
        </Button>
      </Container>
    </Container>
  );
};

export default Withdrawal;
