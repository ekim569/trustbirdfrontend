import React, { Container , useEffect, useState } from "react";
import "../Navbar/Navbar.css";
import "./Page.css";

//Contract List
const ContractList = () => {
  const [contractList, setContractList] = useState({
    No: 0,
    lesse: "",
    preiodstart: "",
    periodend: "",
    renttype: "",
  });

  const history = useHistory();

  const pageLow = 7;
  const paginationLow = 5;

  let currentPageNo = 0;
  let currentPaginationNo = 0;

  const handleEvent = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/contract",
      state: { contractList: contractList },
    });
  };

  return (
    <Container>
      <div className="pageheader">계약서 목록</div>
      <Table bordered={true} style={{ marginBottom: "100px" }}>
        <thead>
          <tr>
            <th>NO.</th>
            <th>사용자</th>
            <th>계약 시점</th>
            <th>계약 종료 시점</th>
            <th>임대 종류</th>
            <th>보기</th>
          </tr>
        </thead>
        <tbody>
          {() => {
            for (let i = currentPageNo; i < currentPageNo + pageLow; i++) {
              return (
                <tr>
                  <td>{contractList[i].No}</td>
                  <td>{contractList[i].lesse}</td>
                  <td>{contractList[i].preiodstart}</td>
                  <td>{contractList[i].periodend}</td>
                  <td>{contractList[i].renttype}</td>
                  <td>
                    <Link to="/maintenancefee" onClick={handleEvent}>
                      <Button>관리비 내역</Button>
                    </Link>
                  </td>
                </tr>
              );
            }
            currentPageNo =
              currentPageNo + pageLow > contractList.length
                ? contractList.length
                : currentPageNo + pageLow;
          }}
        </tbody>
      </Table>
    </Container>
  );
};

//Contract List
export default ContractList;
