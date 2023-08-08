import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MoreVertical } from "react-feather";
import { useFilters, usePagination, useTable } from "react-table";
import Learning from "../../../../../assets/images/svg/CARD_NO_IMAGE.svg";
import Pagination from "../../../../../components/components/elements/advance-table/Pagination";
import Icon from "@mdi/react";
import {
  mdiBookEducationOutline,
  mdiBookMultipleOutline,
  mdiEqualizerOutline,
} from "@mdi/js";
import axios from "axios";
import ModalPICTicket from "../../../../../components/components/database-admin/elements/ModalPICTicket";
import NotifSuccessModal from "../../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../../components/components/elements/modal/ProcessLoadingModal";

export const LibraryProgram = () => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="btn-icon btn btn-ghost btn-sm rounded-circle"
    >
      {children}
    </Link>
  ));

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [searchText, setSearchText] = useState("");
  const [dataList, setDataList] = useState([]);
  const [caution, setCaution] = useState(false);
  const [id, setId] = useState(0);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const fetchData = async () => {
    try {
      setSpinner(true);
      await axios
        .get("/euniv/get-list-program", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res?.status === 200) {
            setSpinner(false);
            setDataList(res?.data?.data);
          } else {
            setSpinner(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const deleteProgram = async (id) => {
    try {
      setModalLoading(true);
      await axios
        .delete(`/euniv/delete-program/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(async (res) => {
          if (res?.status === 200) {
            await fetchData();
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 1000);
            setModalLoading(false);
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  const ActionMenu = ({ id, row }) => {
    return (
      <>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <MoreVertical size="15px" className="text-secondary" />
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item
              eventKey="1"
              as={Link}
              state={row}
              to={`/main-desk/manage-program/detail/${id}`}
              className="d-flex align-items-center"
            >
              <i className="dropdown-item-icon fe fe-eye text-black"></i>View
              Details
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              as={Link}
              onClick={
                row.original.count_syllabus > 0
                  ? () => {
                      setCaution(true);
                      setId(id);
                    }
                  : () => deleteProgram(id)
              }
            >
              <i className="fe fe-trash dropdown-item-icon text-black"></i>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    );
  };

  const columns = useMemo(
    () => [
      // { accessor: (row, index) => index + 1, Header: "NO", show: false },
      {
        accessor: "name",
        Header: "Program",
        Cell: ({ value, row }) => {
          return (
            <div className="d-lg-flex align-items-center">
              <div>
                <Image
                  src={
                    row.original.files.length > 0
                      ? row.original.files[0]?.url
                      : Learning
                  }
                  height={60}
                  alt=""
                  className="img-4by3-lg rounded"
                />
              </div>
              <div className="ms-lg-3 mt-2 mt-lg-0">
                <h4 className="mb-1 text-truncate">{value?.slice(0, 60)}</h4>
                <span className="me-2 fs-6">
                  <Icon
                    path={mdiBookEducationOutline}
                    size={0.6}
                    className="me-1"
                  />
                  <span className="text-inherit  me-1 ">
                    {row.original.count_syllabus}
                  </span>
                  Silabus
                </span>
                <span>• </span>
                <span className="me-2 fs-6">
                  <Icon path={mdiBookMultipleOutline} size={0.6} />
                  <span className="text-inherit  me-1 ">
                    {row.original.type_program}
                  </span>
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessor: "category_name",
        Header: "View this month",
        Cell: ({ value, row }) => {
          return (
            <div className="d-flex align-items-center">
              <Icon path={mdiEqualizerOutline} size={0.7} />
              <h5 className="mb-0">1000</h5>
            </div>
          );
        },
      },
      {
        accessor: "created_by",
        Header: "Author",
      },
      {
        accessor: "updated_at",
        Header: "Last Modified",
      },
      {
        accessor: "",
        Header: "Status",
        Cell: ({ value, row }) => {
          return (
            <Badge bg="success">Published</Badge>
            // <Fragment>
            //   <Badge
            //     bg={`${
            //       value === "Scheduled"
            //         ? "warning"
            //         : value === "Published"
            //         ? "success"
            //         : value === "Draft"
            //         ? "info"
            //         : "danger"
            //     } `}
            //   >
            //     {" "}
            //     {value.charAt(0).toUpperCase() + value.slice(1)}
            //   </Badge>
            // </Fragment>
          );
        },
      },
      {
        accessor: "id",
        Header: "",
        Cell: ({ value, row }) => {
          return <ActionMenu id={value} row={row} />;
        },
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let result = dataList || [];
    if (searchText !== "") {
      result = result?.filter(
        (submission) =>
          submission.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          submission.updated_at
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.category_name
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.type_program
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.count_syllabus
            ?.toString()
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.created_by
            ?.toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }
    return result;
  }, [dataList, searchText]);

  const data = useMemo(() => {
    if (!filteredData) {
      return []; // or any other appropriate value for your use case
    }

    return filteredData;
  }, [filteredData]);

  // const data = useMemo(() => dataList, [dataList]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    state,
    gotoPage,
    pageCount,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    },
    useFilters,
    usePagination
  );

  const { pageIndex } = state;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  return (
    <Fragment>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Card>
            <Card.Header className="border-bottom bg-white">
              <Card.Title className="mb-0">List Program</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="overflow-hidden">
                <Row>
                  <Col xl={12} lg={12} sm={12} className="mb-3">
                    <Row className="p-4 pb-0">
                      <Col className="pe-0">
                        <Form.Group
                          className="mb-3"
                          controlId="formSearchbyName"
                        >
                          <Form.Control
                            type="text"
                            className="form-control rounded-3"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="col-auto">
                        <Button variant="outline-primary" className="rounded-3">
                          Select filter here
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div className="table-responsive overflow-y-hidden mb-3">
                <Table
                  hover
                  {...getTableProps()}
                  className="text-nowrap table-centered"
                >
                  <thead className="table-light">
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th {...column.getHeaderProps()}>
                            {column.render("Header")}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  {spinner ? (
                    <tbody>
                      <tr>
                        <td colSpan={6}>
                          <div className="text-center">
                            <Spinner animation="border" role="status">
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </Spinner>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <>
                      <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                          prepareRow(row);
                          return (
                            <tr {...row.getRowProps()}>
                              {row.cells.map((cell) => {
                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                      {filteredData?.length === 0 && (
                        <tbody>
                          <tr>
                            <td className="fst-italic" colSpan={columns.length}>
                              No records available
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </>
                  )}
                </Table>
              </div>

              {/* Pagination @ Footer */}
              <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
                <Pagination
                  previousPage={previousPage}
                  pageCount={pageCount}
                  pageIndex={pageIndex}
                  gotoPage={gotoPage}
                  nextPage={nextPage}
                  euniv={true}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {caution && (
        <ModalPICTicket
          setShow={setCaution}
          show={caution}
          buttonClassName="py-2 px-3 rounded-3  h4"
          onClick={() => {
            deleteProgram(id);
            setCaution(false);
          }}
          title="Caution"
        >
          <p className="mb-0 text-kinda-dark">
            Are you sure want to delete this Program ? There is a Syllabus in
            this Program.
          </p>
        </ModalPICTicket>
      )}
      {warning && (
        <NotifSuccessModal show={warning} setShow={setWarning}>
          <ErrorAlert
            setState={setWarning}
            text1={warningMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}

      {success && (
        <NotifSuccessModal
          show={success}
          setShow={setSuccess}
          text="Success Delete Program"
        ></NotifSuccessModal>
      )}
    </Fragment>
  );
};
