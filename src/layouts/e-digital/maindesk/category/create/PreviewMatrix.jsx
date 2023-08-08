import React, { Fragment, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFilters, usePagination, useTable } from "react-table";
import Pagination from "../../../../../components/components/elements/advance-table/Pagination";
import { Row } from "react-bootstrap";
import { Form } from "react-bootstrap";

export const PreviewMatrix = (props) => {
  const { empData } = props;

  const [searchText, setSearchText] = useState("");

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

  const filesdata = [
    {
      name: "Malvin Syaputra Kurniawan Ningrat",
      nik: "202304521",
    },
    {
      name: "Malvin Syaputra Kurniawan Ningrat",
      nik: "202304521",
    },
    {
      name: "Malvin Syaputra Kurniawan Ningrat",
      nik: "202304521",
    },
  ];

  const columns = useMemo(
    () => [
      { accessor: "id", Header: "ID", show: false },
      {
        accessor: "name",
        Header: "Name",
        Cell: ({ row }) => {
          const index = row.index + 1;
          return (
            <div>
              <span className="fw-bold me-2">{index}</span>
              {row.original.name}
            </div>
          );
        },
      },
      { accessor: "nik", Header: "NIK" },
    ],
    []
  );

  // const data = useMemo(() => empData, []);
  const filteredData = useMemo(() => {
    let result = empData || [];
    if (searchText !== "") {
      result = result?.filter(
        (submission) =>
          submission.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          submission.nik?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return result;
  }, [empData, searchText]);

  const data = useMemo(() => {
    if (!filteredData) {
      return []; // or any other appropriate value for your use case
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

  return (
    <Fragment>
      <Card className="px-0">
        <Row>
          <Col lg={12} md={12} sm={12} className="mb-lg-0">
            <div className="d-flex justify-content-between p-4">
              <Col lg={7}>
                <div>
                  <h4 className="mb-0 card-title fw-bold ">Preview Matrix</h4>
                  <span>
                    Berikut adalah list peserta yang akan menerima program ini
                  </span>
                </div>
              </Col>
              <Col lg={5}>
                <Form.Control
                  type="text"
                  className="form-control"
                  placeholder="Search NIK/Name here"
                  // value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Col>
            </div>
          </Col>
        </Row>

        <div className="table-responsive overflow-y-hidden">
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
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
          </Table>
        </div>

        {/* Pagination @ Footer */}
        <Pagination
          previousPage={previousPage}
          pageCount={pageCount}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
          nextPage={nextPage}
          euniv={true}
        />
      </Card>
    </Fragment>
  );
};
