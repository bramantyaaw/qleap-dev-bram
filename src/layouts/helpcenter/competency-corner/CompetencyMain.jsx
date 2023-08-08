import { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import DataTable from "react-data-table-component";

import GuideTemplate from "../GuideTemplate";

const CompetencyMain = () => {
  const win = window.localStorage;
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dataMemo = [];

  const fetchDataList = async (token) => {
    try {
      await axios
        .get("/services/get-competency", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const filterData = res?.data?.data.filter(
            (item) => item.IsDeleted !== "1"
          );
          setDataList(filterData);
        });
    } catch (e) {
      return e;
    }
  };

  dataList?.forEach((data, index) => {
    dataMemo?.push({
      no: index + 1,
      title: data?.MemoName,
      date: data?.MemoDate,
      link: data?.MemoLink,
    });
  });

  const handleViewButtonClick = (link) => {
    window.open(link, "_blank");
  };

  const colums = [
    {
      name: "No",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5rem",
    },
    {
      name: "Memo Name",
      cell: (row) => (
        <a href={row.CompetencyName} target="_blank">
          {row.CompetencyName}
        </a>
      ),
      sortable: true,
      width: "20rem",
    },
    {
      name: "Publish Date",
      selector: (row) => row.CompetencyDate,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Link",
      cell: (row) => (
        <Button
          variant="outline-primary"
          onClick={() => handleViewButtonClick(row.CompetencyLink)}
          className="btn-sm"
        >
          View Link
        </Button>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#4F6DFF",
        color: "white",
        fontSize: "1.1em",
      },
    },
  };

  useEffect(() => {
    const token = win.getItem("access_token");
    fetchDataList(token);
  }, []);

  //new Memo
  const newData = dataList.slice(0, 2);

  // search feature
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredMemo = dataList.filter((item) => {
    const idLower = item.ID && item.ID.toString().toLowerCase();
    return (
      item.CompetencyName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.CompetencyDate.toLowerCase().includes(searchText.toLowerCase()) ||
      idLower.includes(searchText.toLowerCase())
    );
  });

  return (
    <div
      style={{
        backgroundColor: "#F5F4F880",
      }}
    >
      <GuideTemplate>
        <Container className="mb-5">
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12}>
              <Row>
                {newData.map((item, index) => (
                  <Col key={index} md={6} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <p className="display-6">New Competency</p>
                        <p className="mt-2">{item.CompetencyDate}</p>
                      </Card.Header>
                      <Card.Body
                        style={{
                          backgroundColor: "#F5F4F880",
                          height: "1rem",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Card.Title>
                          <a href={item.CompetencyLink} target="_blank">
                            {item.CompetencyName}
                          </a>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Card>
                <Card.Body>
                  <Row className="mb-2">
                    <input
                      className="form-control form-control-sm w-40 m-3 shadow-sm"
                      type="text"
                      placeholder="Search..."
                      value={searchText}
                      onChange={handleSearchChange}
                    />
                  </Row>
                  <DataTable
                    columns={colums}
                    data={filteredMemo}
                    pagination
                    className="bg-primary"
                    customStyles={customStyles}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </GuideTemplate>
    </div>
  );
};
export default CompetencyMain;
