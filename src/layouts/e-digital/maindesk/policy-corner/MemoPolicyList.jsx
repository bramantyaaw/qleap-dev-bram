import React, { Fragment, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MemoPolicyList() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [memo, setMemo] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dataMemo = async () => {
    try {
      const res = await axios.get("/services/get-policy", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data;
      setMemo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const hidePolicy = async (id) => {
    try {
      await axios.post(
        "/services/delete-policy",
        {
          policy_id: id,
          is_deleted: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dataMemo();
    } catch (err) {
      console.error(err);
    }
  };

  const unHidePolicy = async (id) => {
    try {
      await axios.post(
        "services/delete-policy",
        {
          policy_id: id,
          is_deleted: 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dataMemo();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dataMemo();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  const handleViewButtonClick = (link) => {
    window.open(link, "_blank");
  };

  const columns = [
    { name: "No", selector: (row) => row.ID, sortable: true, width: "5rem" },
    {
      name: "Policy Name",
      selector: (row) => row.PolicyName,
      sortable: true,
      width: "30rem",
    },
    {
      name: "Publish Date",
      selector: (row) => row.PolicyDate,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Link Memo",
      selector: (row) => row.PolicyLink,
      sortable: true,
      width: "10rem",
      cell: (row) => (
        <Button
          variant="info"
          onClick={() => handleViewButtonClick(row.PolicyLink)}
          style={{
            color: "white",
            height: "2.3rem",
            fontSize: "12px",
            lineHeight: "12px",
          }}
        >
          View Detail
        </Button>
      ),
    },
    {
      name: "Action",
      width: "10rem",
      sortable: true,
      cell: (row) => (
        <>
          <Link
            to={`/main-desk/policy-corner/edit/${row.ID}`}
            className="btn btn-sm btn-warning text-white"
            style={{
              marginRight: ".5rem",
            }}
          >
            <i className="fe fe-edit"></i>
          </Link>
          {row.IsDeleted === "1" ? (
            <Button
              variant="secondary"
              className="btn btn-sm"
              onClick={() => unHidePolicy(row.ID)}
            >
              <i className="fe fe-eye-off"></i>
            </Button>
          ) : (
            <Button
              variant="success"
              className="btn btn-sm"
              onClick={() => hidePolicy(row.ID)}
            >
              <i className="fe fe-eye"></i>
            </Button>
          )}
        </>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        background: "#564B8D", // Ganti dengan warna atau gaya CSS yang diinginkan
        color: "white",
        fontSize: "1.1em",
      },
    },
  };

  // search feature
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredMemo = memo.filter((item) => {
    const idLower = item.ID && item.ID.toString().toLowerCase();
    return (
      item.PolicyName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.PolicyDate.toLowerCase().includes(searchText.toLowerCase()) ||
      idLower.includes(searchText.toLowerCase())
    );
  });

  return (
    <>
      <Fragment>
        <Card>
          <Card.Header className="d-flex justify-content-between pb-0">
            <h3 className="mb-0">Transaction</h3>
            <div className="d-flex pb-3">
              <input
                className="form-control form-control-sm w-100"
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={filteredMemo}
              pagination
              search={true}
              customStyles={customStyles}
            />
          </Card.Body>
        </Card>
      </Fragment>
    </>
  );
}
