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
import FormSelect from "../../../components/components/elements/form-select/FormSelect";
import { useDispatch } from "react-redux";

const ListApproval = ({
  approval_data,
  selectedItem,
  selectedSubmissionType,
  dept,
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

  const columns = useMemo(() => {
    let cols = [
      { accessor: (row, index) => index + 1, Header: "NO" },
      { accessor: "employee_nik", Header: "NIK" },
      { accessor: "employee_name", Header: "NAME" },
      { accessor: "div", Header: "DIVISION" },
      { accessor: "initiator_emp_name", Header: "INITIATOR" },
      { accessor: "created_date", Header: "DATE" },
      { accessor: "pcn_type", Header: "TYPE" },
      {
        accessor: "pcn_id",
        Header: "ACTION",
        Cell: ({ value }) => {
          return (
            <Link
              to={`/main-desk/approval/detail-employee/${value}`}
              className="btn btn-xs btn-info text-white"
            >
              View Detail
            </Link>
          );
        },
      },
    ];

    if (dept === "SS Group Employee Services") {
      cols.splice(6, 0, {
        accessor: "company",
        Header: "Company Name",
      });
    }

    return cols;
  }, [dept]);

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
            .includes(searchText?.toLowerCase()) ||
          submission.employee_name
            .toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          submission.div.toLowerCase().includes(searchText?.toLowerCase()) ||
          submission.initiator_emp_name
            .toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          submission.created_date
            .toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          submission.pcn_type
            .toLowerCase()
            .includes(searchText?.toLowerCase()) ||
          submission.company?.toLowerCase().includes(searchText?.toLowerCase())
      );
    }
    return result;
  }, [approval_data, searchText, selectedItem, selectedSubmissionType]);

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

export default ListApproval;
