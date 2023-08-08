// import node module libraries
import React, { Fragment, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useTable, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { useEffect } from "react";

const TableILEADQuiz = ({ dataArr }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const ticketPerPage = 6;

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
      { accessor: "name", Header: "Quiz Name" },
      {
        accessor: "startDate",
        Header: "Quiz Period",
        Cell: (props) => {
          let start = props?.row?.original?.startDate;
          let end = props?.row?.original?.endDate;

          return (
            <div className="d-flex align-items-center">
              <p className="mb-0">
                {start} - {end}
              </p>
            </div>
          );
        },
      },
      {
        accessor: "id",
        Header: "ACTION",
        Cell: (props) => {
          let data = props?.row?.original;
          return (
            <Link to="/ezone/ilead/diagnostic/course" state={data}>
              <Button variant="primary" className="btn btn-xs">
                Start Quiz
              </Button>
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
          <thead className="bg-light-blue text-center">
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
          <tbody {...getTableBodyProps()} className=" ">
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
    </Fragment>
  );
};

export default TableILEADQuiz;
