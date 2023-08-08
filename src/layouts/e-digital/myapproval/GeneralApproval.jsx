// import node module libraries
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable, useFilters, usePagination, useSortBy } from "react-table";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Image,
  Dropdown,
  Table,
  Badge,
  Form,
  Modal,
  Card,
} from "react-bootstrap";
import { CMSDashboard } from "../../../components/components/dashboard/cms/CMSDashboard";

// import custom components
import Pagination from "../../../components/components/elements/advance-table/Pagination";
import { useDispatch } from "react-redux";

const GeneralApproval = ({
  approval_data,
  selectedItem,
  selectedSubmissionType,
  newEndDate,
  newStartDate,
}) => {
  // The forwardRef is important!!
  // Dropdown needs access to the DOM node in order to position the Menu
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const columns = useMemo(
    () => [
      { accessor: (row, index) => index + 1, Header: "NO" },
      { accessor: "employee_nik", Header: "NIK" },
      { accessor: "employee_name", Header: "NAME" },
      { accessor: "div", Header: "DIVISION" },
      { accessor: "created_date", Header: "DATE" },
      { accessor: "approval_type", Header: "PROGRAM TYPE" },
      //   {
      //     accessor: "fg_status",
      //     Header: "STATUS",
      //     Cell: ({ value }) => {
      //       return (
      //         <Fragment>
      //           <Badge
      //             bg={`${
      //               value === "In Progress"
      //                 ? "warning"
      //                 : value === "Full Approved"
      //                 ? "success"
      //                 : value === "Open"
      //                 ? "secondary"
      //                 : value === "Reject"
      //                 ? "danger"
      //                 : "primary"
      //             } `}
      //           >
      //             {value}
      //           </Badge>
      //         </Fragment>
      //       );
      //     },
      //   },
      {
        accessor: "trx_id",
        Header: "ACTION",
        Cell: ({ value }) => {
          return (
            <Link
              to={`/approval/detail-employee/${value}`}
              className="btn btn-xs btn-info text-white"
            >
              View Detail
            </Link>
          );
        },
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    let result = approval_data || [];
    if (selectedSubmissionType !== "") {
      result = result.filter(
        (submission) => submission.approval_type === selectedSubmissionType
      );
    }
    if (selectedItem !== "") {
      result = result.filter(
        (submission) => submission.fg_status === selectedItem
      );
    }

    if (searchText !== "") {
      result = result.filter(
        (submission) =>
          submission.employee_nik
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.employee_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.div.toLowerCase().includes(searchText.toLowerCase()) ||
          submission.created_date
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.approval_type
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }

    if (newStartDate && newEndDate) {
      result = result.filter((submission) => {
        const submissionDate = new Date(submission.created_date);
        const startDate = new Date(newStartDate);
        const endDate = new Date(newEndDate);
        return submissionDate >= startDate && submissionDate <= endDate;
      });
    }

    return result;
  }, [
    approval_data,
    searchText,
    selectedItem,
    selectedSubmissionType,
    newStartDate,
    newEndDate,
  ]);

  const data = useMemo(() => {
    if (!filteredData) {
      return [];
    }

    return filteredData;
  }, [filteredData]);

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
        // sortBy: [{ id: "pcn_id", desc: true }],
        hiddenColumns: columns?.map((column) => {
          if (column?.show === false) return column?.accessor || column?.id;
          else return false;
        }),
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );
  const { pageIndex } = state;

  return (
    <Fragment>
      <Card>
        <Card.Header className="d-flex justify-content-between pb-0">
          <p className="mt-2 mb-3 text-dark">Transaction</p>
          <div className="d-flex pb-3">
            <Form.Control
              type="text"
              className="form-control form-control-sm"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive border-0 overflow-y-hidden">
            <Table striped {...getTableProps()} className="text-nowrap">
              <thead className="table-dark">
                {headerGroups?.map((headerGroup) => (
                  <tr {...headerGroup?.getHeaderGroupProps()}>
                    {headerGroup?.headers?.map((column) => (
                      <th {...column?.getHeaderProps()}>
                        {column?.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page?.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row?.getRowProps()}>
                      {row?.cells?.map((cell) => {
                        return (
                          <td {...cell?.getCellProps()}>
                            {cell?.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {filteredData.length === 0 && (
                <tbody>
                  <tr>
                    <td className="fst-italic" colSpan={columns.length}>
                      No records available
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </div>

          {/* Pagination @ Footer */}
          <Pagination
            previousPage={previousPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
            gotoPage={gotoPage}
            nextPage={nextPage}
          />
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default GeneralApproval;
