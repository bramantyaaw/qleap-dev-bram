// import node module libraries
import React, { Fragment, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useTable, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Button, Card, Form, Table } from "react-bootstrap";
import { useEffect } from "react";
import Icon from "@mdi/react";
import {
  mdiPlusCircleOutline as plusIcon,
  mdiPencilBoxOutline as editIcon,
} from "@mdi/js";

const TableListRnR = ({ dataArr }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const ticketPerPage = 4;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(dataArr?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      dataArr?.length <= 4
        ? dataArr
        : dataArr?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, dataArr]);

  const columns = useMemo(
    () => [
      { accessor: (row, index) => index + 1 + pageVisited, Header: "NO" },
      { accessor: "title", Header: "JOB TITLE" },
      { accessor: "sublevel", Header: "ORG. LEVEL NAME" },
      { accessor: "div", Header: "ORG. NAME" },
      { accessor: "updateDate", Header: "UPDATE DATE" },
      {
        accessor: "id",
        Header: "ACTION",
        Cell: ({ value }) => {
          return (
            <div className="d-flex">
              <Link
                to={`/main-desk/ticket/detail/${value}`}
                className="btn btn-xs btn-info text-white"
              >
                View Detail
              </Link>
              <Link
                to={`/main-desk/ticket/detail/${value}`}
                className="btn btn-xs btn-warning px-2 text-white ms-2"
              >
                <Icon path={editIcon} size={0.8} />
              </Link>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line
    [, pageVisited]
  );

  const data = useMemo(() => {
    if (!arrDataSliced) {
      return []; // or any other appropriate value for your use case
    } else {
      return arrDataSliced;
    }
    // eslint-disable-next-line
  }, [arrDataSliced]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageSize: 4,
          hiddenColumns: columns?.map((column) => {
            if (column?.show === false) return column?.accessor || column?.id;
            else return false;
          }),
        },
      },
      useFilters,
      usePagination
    );
  // const { pageIndex } = state;

  return (
    <Fragment>
      <Card>
        <Card.Header className="d-flex justify-content-between pb-0 align-items-center">
          <div className="d-flex align-items-center">
            <p className="mt-2 mb-3 text-dark">Transaction</p>
            <div className="d-flex pb-3 ms-3">
              <Form.Control
                type="text"
                className="form-control form-control-sm"
                placeholder="Search"
                // value={searchText}
                // onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Link to="/edigital/rnr/create">
              <Button
                variant="primary"
                className="d-flex py-2 align-items-center"
              >
                <span>
                  <Icon path={plusIcon} size={0.8} />
                </span>
                <p className="mb-0 ms-1">Create</p>
              </Button>
            </Link>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive border-0 overflow-y-hidden mb-5">
            <Table {...getTableProps()} className="text-nowrap">
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
                          <td
                            className="h6 text-kinda-light-dark "
                            {...cell?.getCellProps()}
                          >
                            {cell?.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {!dataArr && (
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
          {dataArr ? (
            <ReactPaginate
              previousLabel={<ChevronLeft size="14px" />}
              nextLabel={<ChevronRight size="14px" />}
              pageCount={countPage}
              onPageChange={changePage}
              containerClassName={"justify-content-center mb-0 pagination"}
              previousLinkClassName={"page-link mx-1 rounded"}
              nextLinkClassName={"page-link mx-1 rounded"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link mx-1 rounded"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"active"}
            />
          ) : null}
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default TableListRnR;
