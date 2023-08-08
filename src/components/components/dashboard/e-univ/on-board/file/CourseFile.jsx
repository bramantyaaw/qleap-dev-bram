// import node module libraries
import React, { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Dropdown, Table, Card, Image } from "react-bootstrap";
import { MoreVertical } from "react-feather";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import {
  FileImage,
  FileWord,
  FileEarmarkSpreadsheet,
  FilePpt,
  FileText,
  FileEarmarkSlides,
  Exclamation,
} from "react-bootstrap-icons";
import GlobalFilter from "./GlobalFilter";
import Pagination from "./Pagination";
import Tippy from "@tippyjs/react";

import { filesdata } from "../../../../../../data/onboard/FileData";

import {
  getFileExtension,
  getRandomNo,
} from "../../../../../../config/helper/utils";

const FilesTable = () => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
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

  const getFileTypeIcon = (value) => {
    let color = null;
    let extension = getFileExtension(value);
    extension === "xlsx"
      ? (color = "primary")
      : extension === "jpeg"
      ? (color = "info")
      : extension === "doc"
      ? (color = "success")
      : extension === "ppt"
      ? (color = "danger")
      : extension === "txt"
      ? (color = "warning")
      : extension === "mov"
      ? (color = "danger")
      : (color = "danger");

    return (
      <div className={`icon-shape icon-lg rounded-3 bg-light-${color}`}>
        <Link to="#">
          {extension === "xlsx" ? (
            <FileEarmarkSpreadsheet size={24} className="text-primary" />
          ) : extension === "jpeg" ? (
            <FileImage size={24} className="text-info" />
          ) : extension === "doc" ? (
            <FileWord size={24} className="text-success" />
          ) : extension === "ppt" ? (
            <FilePpt size={24} className="text-danger" />
          ) : extension === "txt" ? (
            <FileText size={24} className="text-warning" />
          ) : extension === "mov" ? (
            <FileEarmarkSlides size={24} className="text-danger" />
          ) : (
            <Exclamation size={24} className="text-danger" />
          )}
        </Link>
      </div>
    );
  };

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "filename",
        Header: "Name",
        Cell: ({ value }) => {
          return (
            <div className="d-flex align-items-center">
              {getFileTypeIcon(value)}
              <div className="ms-3">
                <h5 className="mb-0">
                  <Link to="#" className="text-inherit">
                    {value}{" "}
                  </Link>
                </h5>
              </div>
            </div>
          );
        },
      },

      { accessor: "filesize", Header: "File Size" },
      { accessor: "date_modified", Header: "Modified" },

      {
        accessor: "options",
        Header: "Options",
        Cell: () => {
          return (
            <Fragment>
              <Tippy
                content={<span className="mb-0">Download</span>}
                animation={"scale"}
              >
                <Link to="#" className="me-3 text-muted">
                  <i className="fe fe-download fs-5"></i>
                </Link>
              </Tippy>
              <Tippy
                content={<span className="mb-0">Link</span>}
                animation={"scale"}
              >
                <Link to="#" className="me-3 text-muted">
                  <i className="fe fe-link fs-5"></i>
                </Link>
              </Tippy>
            </Fragment>
          );
        },
      },
      {
        accessor: "Status",
        Header: "Status",
        Cell: () => {
          return <p>-</p>;
        },
      },
    ],
    []
  );

  const data = useMemo(() => filesdata, []);

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
    setGlobalFilter,
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
    useGlobalFilter,
    usePagination
  );

  const { pageIndex, globalFilter } = state;

  return (
    <Fragment>
      <Col className="mx-0">
        <Card>
          <Card.Body className="p-0">
            <div className="table-responsive border-0 overflow-y-hidden ">
              <Table hover className="text-nowrap mb-0 table-centered">
                <thead className="table-course-file">
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
              </Table>
            </div>
            {/* <Pagination
              previousPage={previousPage}
              pageCount={pageCount}
              pageIndex={pageIndex}
              gotoPage={gotoPage}
              nextPage={nextPage}
            /> */}
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default FilesTable;
