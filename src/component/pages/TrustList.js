import React from "react";
import { Container, Table, Button } from "react-bootstrap";
import Pagination from "./Pagination";
import AuthToken from "../../storages/Auth";

const TrustList = () => {
  const token = AuthToken.get();

  const [trustList, setTrustList] = React.useState([]);
  const [loc, setLoc] = React.useState(1);

  const pageLimit = 1;
  const paginationLimite = 1;

  React.useEffect(() => {
    fetch("http://192.168.0.143:3001/api/user/trustlist", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((res) => {
        setTrustList(res);
      });
  }, [token]);

  const onClick = (loc) => {
    setLoc(loc);
  };

  // list length
  const totalLength = React.useMemo(() => {
    return trustList.length;
  }, [trustList]);

  // page length
  const totalPageNum = React.useMemo(() => {
    return Math.ceil(totalLength / pageLimit);
  }, [totalLength, pageLimit]);

  return (
    <div>
      <TrustListPage trustList={trustList} loc={loc} pageLimit={pageLimit} />
      <Pagination
        total={totalLength}
        active={loc}
        last={totalPageNum}
        paginationLimite={paginationLimite}
        onClick={onClick}
      />
    </div>
  );
};

const TrustListPage = ({ trustList, loc, pageLimit }) => {
  return (
    <Container style={{ marginTop: "150px" }}>
      <div className="maintenanceimage">
        <div className="pageheader" style={{ marginTop: "50px" }}>
          신탁 계약 내역 목록
        </div>
      </div>
      <Table
        bordered={true}
        style={{ marginBottom: "100px", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th>NO.</th>
            <th>종류</th>
            <th>보증금</th>
            <th>전월세</th>
            <th>신탁 시작일</th>
            <th>신탁 종류일</th>
            <th>신탁 상태</th>
            <th style={{ width: "140px" }}>상세 보기</th>
          </tr>
        </thead>
        <tbody>
          {trustList
            .slice(pageLimit * (parseInt(loc) - 1), pageLimit * parseInt(loc))
            .map((trust) => (
              <tr key={trust.token}>
                <td>{trust.no}</td>
                <td>{trust.type}</td>
                <td>{trust.securityDeposit}</td>
                <td>{trust.rent}</td>
                <td>{trust.periodStart}</td>
                <td>{trust.periodEnd}</td>
                <td>{trust.status}</td>
                <td>
                  <Button variant="" className="scopeimage"></Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TrustList;
