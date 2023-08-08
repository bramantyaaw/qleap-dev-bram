import React, { Fragment, useMemo, useState } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { getRandomNo } from "../../../../../config/helper/utils";
import { useFilters, usePagination, useTable } from "react-table";
import Pagination from "../../../../../components/components/elements/advance-table/Pagination";
// import { Avatar } from "../../../../../components/elements/bootstrap/Avatar";
import { ChevronLeft, ChevronRight, MoreVertical } from "react-feather";
import { filesdata } from "../../../../../data/onboard/FileData";
import LoadingComponent from "../../../../../components/components/elements/loading/LoadingComponent";
import ReactPaginate from "react-paginate";

export const ListParticipant = ({ items, spinner }) => {
  const [searchText, setSearchText] = useState("");

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle}>
          <MoreVertical size="15px" className="text-secondary" />
        </Dropdown.Toggle>
        <Dropdown.Menu align={"end"}>
          <Dropdown.Header>SETTINGS</Dropdown.Header>
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columns = useMemo(
    () => [
      {
        accessor: "no",
        Header: "",
        Cell: ({ value }) => {
          let backgroundColor = "";
          let textColor = "";
          if (value === 1) {
            backgroundColor = "bg-light-success";
            textColor = "text-dark-success";
          } else if (value === 2) {
            backgroundColor = "bg-light-primary";
            textColor = "text-dark-primary";
          } else if (value === 3) {
            backgroundColor = "bg-light-warning";
            textColor = "text-dark=warning";
          }
          return (
            <div
              className={`icon-shape icon-md rounded-circle w-37 ${backgroundColor} ${textColor}`}
            >
              {value}
            </div>
          );
        },
      },
      {
        accessor: "name",
        Header: "Name",
        Cell: ({ value }) => {
          return <div className="d-flex align-items-center">{value}</div>;
        },
      },

      {
        accessor: "many_attempt",
        Header: "Attempt",
        Cell: ({ value }) => {
          return (
            <div>
              {value} <span className="text-secondary">Attempt</span>
            </div>
          );
        },
      },
      {
        accessor: "best_score",
        Header: "Best Score",
        Cell: ({ value, row }) => {
          const getSuffix = (number) => {
            const suffixes = ["th", "st", "nd", "rd"];
            const remainder10 = number % 10;
            const remainder100 = number % 100;
            const suffix =
              remainder10 === 1 && remainder100 !== 11
                ? suffixes[1]
                : remainder10 === 2 && remainder100 !== 12
                ? suffixes[2]
                : remainder10 === 3 && remainder100 !== 13
                ? suffixes[3]
                : suffixes[0];
            return `${number}${suffix}`;
          };
          return (
            <div className={` text-${value > 80 ? "success" : "danger"}`}>
              {value}{" "}
              <span className="text-secondary">
                {`(${getSuffix(
                  row.original.attempt_to_get_best_score
                )} attempt)`}
              </span>
            </div>
          );
        },
      },
      { accessor: "date_based_on_score", Header: "Date based best score" },
      {
        accessor: "bu",
        Header: "Business Unit",
        Cell: ({ value }) => {
          return <div className="">{value ? value : "-"}</div>;
        },
      },
      {
        accessor: "duration_based_on_score",
        Header: "Duration based best score",
      },
      {
        accessor: "action",
        Header: "",
        Cell: () => {
          return <ActionMenu />;
        },
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let result = items || [];
    if (searchText !== "") {
      result = result?.filter(
        (submission) =>
          submission.no
            ?.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          submission.many_attempt
            ?.toString()
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.date_based_on_score
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.best_score
            ?.toString()
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.bu?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return result;
  }, [items, searchText]);

  const data = useMemo(() => {
    if (!filteredData) {
      return []; // or any other appropriate value for your use case
    }

    return filteredData;
  }, [filteredData]);

  // const data = useMemo(() => items, []);

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
    // setGlobalFilter,
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
    // useGlobalFilter,
    usePagination
  );

  const { pageIndex } = state;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Fragment>
      {/* search filename */}

      <Row>
        <Col lg={10} md={10} sm={10} className="mb-lg-0 mb-2 py-4 ps-2 ">
          <Form.Control
            type="text"
            className="form-control"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col lg={2} md={2} sm={2} className="mb-lg-0 mb-2 py-4 pe-2 ">
          <Button variant="outline-primary" className="rounded-3">
            Sort By
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="table-responsive border-0 overflow-y-hidden">
            <Table {...getTableProps()} className="text-wrap" hover>
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
                    <td colSpan={columns.length}>
                      <div className="text-center">
                        <LoadingComponent className="mt-3" />
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
                              <td
                                {...cell.getCellProps()}
                                className="align-middle"
                              >
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
          <div style={{ textAlign: "center" }}>
            {" "}
            <Pagination
              previousPage={previousPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              gotoPage={gotoPage}
              nextPage={nextPage}
              euniv={true}
            />
          </div>

          {/* <div className="text-center mt-3">
            <ReactPaginate
              previousLabel={<ChevronLeft size="14px" />}
              nextLabel={<ChevronRight size="14px" />}
              pageCount={Math.ceil(filteredData.length / 10)}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              containerClassName="justify-content-center mb-0 pagination"
              previousLinkClassName="page-link mx-1 rounded"
              nextLinkClassName="page-link mx-1 rounded"
              pageClassName="page-item"
              pageLinkClassName="page-link mx-1 rounded"
              disabledClassName="paginationDisabled"
              activeClassName="active"
              forcePage={currentPage}
            />
          </div> */}
        </Col>
      </Row>
    </Fragment>
  );
};
