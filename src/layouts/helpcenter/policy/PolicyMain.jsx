import { useEffect, useState } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import GuideTemplate from "../GuideTemplate";
import DataTable from "react-data-table-component";

const PolicyMain = () => {
  const win = window.localStorage;
  const [dataList, setDataList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dataPolicy = [];

  const fetchDataList = async (token) => {
    try {
      await axios
        .get("/services/get-policy", {
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
    dataPolicy?.push({
      no: index + 1,
      title: data?.PolicyName,
      date: data?.PolicyDate,
      link: data?.PolicyLink,
    });
  });

  useEffect(() => {
    const token = win.getItem("access_token");
    fetchDataList(token);
  }, []);

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
      name: "Policy Name",
      cell: (row) => (
        <a href={row.PolicyLink} target="_blank">
          {row.PolicyName}
        </a>
      ),
      sortable: true,
      width: "20rem",
    },
    {
      name: "Publish Date",
      selector: (row) => row.PolicyDate,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Link",
      cell: (row) => (
        <Button
          variant="outline-primary"
          onClick={() => handleViewButtonClick(row.PolicyLink)}
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
        width: "100%",
        backgroundColor: "#4F6DFF",
        color: "white",
        fontSize: "1.1em",
      },
    },
  };

  // search feature
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredMemo = dataList.filter((item) => {
    const idLower = item.ID && item.ID.toString().toLowerCase();
    return (
      item.PolicyName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.PolicyDate.toLowerCase().includes(searchText.toLowerCase()) ||
      idLower.includes(searchText.toLowerCase())
    );
  });

  const newData = dataList.slice(0, 2);
  return (
    <div
      style={{
        backgroundColor: "#F5F4F880",
      }}
    >
      <GuideTemplate>
        <Container>
          <Row>
            <Col md={{ offset: 2, span: 8 }} xs={12} className="mb-5">
              <Row>
                {newData.map((item, index) => (
                  <Col key={index} md={6} xs={12} className="mb-3">
                    <Card>
                      <Card.Header className="d-flex justify-content-between">
                        <p className="display-6">New Policy</p>
                        <p className="mt-2">{item.PolicyDate}</p>
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
                          <a href={item.PolicyLink} target="_blank">
                            {item.PolicyName}
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
export default PolicyMain;
