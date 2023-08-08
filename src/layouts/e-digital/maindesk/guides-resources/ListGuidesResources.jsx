import React, { Fragment, useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListGuidesResources() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [memo, setMemo] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dataMemo = async () => {
    try {
      const res = await axios.get("/services/get-memo", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res?.data?.data;
      setMemo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const hideMemo = async (id) => {
    try {
      await axios.post(
        "/services/delete-memo",
        {
          memo_id: id,
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

  const unHideMemo = async (id) => {
    try {
      await axios.post(
        "services/delete-memo",
        {
          memo_id: id,
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

  const handleViewButtonClick = (link) => {
    window.open(link, "_blank");
  };

  const columns = [
    { name: "No", selector: (row) => row.ID, sortable: true, width: "5rem" },
    {
      name: "GUIDES & RESOURCES",
      selector: (row) => row.MemoName,
      sortable: true,
      width: "30rem",
    },
    {
      name: "Author",
      sortable: true,
      width: "10rem",
      cell: (row) => <p>Albert Haryo</p>,
    },
    {
      name: "Publish Date",
      selector: (row) => row.MemoDate,
      sortable: true,
      width: "10rem",
    },

    {
      name: "Action",
      width: "10rem",
      sortable: true,
      cell: (row) => (
        <>
          <Link
            to={`/main-desk/memo-internal/edit/${row.ID}`}
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
              className="btn btn-sm "
              onClick={() => unHideMemo(row.ID)}
            >
              <i className="fe fe-eye-off"></i>
            </Button>
          ) : (
            <Button
              variant="success"
              className="btn btn-sm"
              onClick={() => hideMemo(row.ID)}
            >
              <i className="fe fe-eye"></i>
            </Button>
          )}
          <Button
            variant="danger"
            className="btn btn-sm ms-2"
            //   onClick={() => hideMemo(row.ID)}
          >
            <i className="fe fe-trash"></i>
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dataMemo();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  const customStyles = {
    headRow: {
      style: {
        background: "#564B8D",
        color: "white",
        fontSize: "1.1em",
      },
    },
  };

  // search Feature
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredMemo = memo.filter((item) => {
    const idLower = item.ID && item.ID.toString().toLowerCase();
    return (
      item.MemoName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.MemoDate.toLowerCase().includes(searchText.toLowerCase()) ||
      idLower.includes(searchText.toLowerCase())
    );
  });

  return (
    <>
      <Fragment>
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <p
              style={{ fontFamily: "Roboto" }}
              className="mb-0 h4 text-primary"
            >
              Transaction
            </p>
            <div className="d-flex">
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
              striped
              columns={columns}
              data={filteredMemo}
              pagination
              customStyles={customStyles}
            />
          </Card.Body>
        </Card>
      </Fragment>
    </>
  );
}
