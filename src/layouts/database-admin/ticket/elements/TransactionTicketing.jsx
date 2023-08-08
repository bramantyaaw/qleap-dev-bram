// import node module libraries
import React, { Fragment, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useTable, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect } from "react";

const ListApproval = ({ dataArr }) => {
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
      { accessor: "employee_nik", Header: "NIK" },
      { accessor: "employee_name", Header: "NAME" },
      { accessor: "div", Header: "DIVISION" },
      { accessor: "created_at", Header: "DATE" },
      { accessor: "issue_name", Header: "ISSUE TYPE" },
      { accessor: "ticket_number", Header: "TICKET NUMBER" },
      {
        accessor: "id",
        Header: "ACTION",
        Cell: ({ value }) => {
          return (
            <Link
              to={`/main-desk/ticket/detail/${value}`}
              className="btn btn-xs btn-info text-white"
            >
              View Detail
            </Link>
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
          {dataArr?.length === 0 && (
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

      {/* <Pagination
        previousPage={previousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
      /> */}
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
    </Fragment>
  );
};

export default ListApproval;
