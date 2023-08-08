// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination, Image } from "react-table";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import NoArrComponent from "./NoArrComponent";
import Icon from "@mdi/react";
import { mdiToolboxOutline as iconJob } from "@mdi/js";

const OutsiteExperience = ({ arrOutsiteEra, selectedUid }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const ticketPerPage = 5;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(arrOutsiteEra?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      arrOutsiteEra?.length <= 5
        ? arrOutsiteEra
        : arrOutsiteEra?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, arrOutsiteEra]);

  const columns = useMemo(
    () => [
      {
        accessor: "job_title",
        Header: "Job Tittle",
        Cell: ({ value }) => {
          return (
            <div className="d-flex align-items-center">
              <div
                className={`icon-shape icon-md bg-light-success text-dark-success rounded-circle w-37`}
              >
                <Icon
                  path={iconJob}
                  className="nav-icon text-success"
                  size={0.8}
                />
              </div>
              <p className="mb-0 ms-3 fw-bold text-kinda-dark w-350">{value}</p>
            </div>
          );
        },
      },
      {
        accessor: "company_name",
        Header: "Workplace",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "job_start",
        Header: "Period Date",
        Cell: (props) => {
          let start = props?.row?.original?.job_start;
          let nameStart = start?.toString();

          let end = props?.row?.original?.job_end;
          let nameEnd = end?.toString();
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">
                {!nameStart && nameStart} - {!nameEnd && nameEnd}
              </p>
            </Fragment>
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
          pageSize: 5,
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
    <>
      {selectedUid !== "" ? (
        arrOutsiteEra?.length !== 0 ? (
          <Fragment>
            <div className="table-responsive border-0 overflow-y-hidden mb-5 ">
              <Table {...getTableProps()} className="text-nowrap">
                <thead className="table-light-blue text-capitalize bg-light-blue opacity-50">
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
                            <td className="py-c-20" {...cell?.getCellProps()}>
                              {cell?.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                {!arrOutsiteEra && (
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
            {arrOutsiteEra ? (
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
        ) : (
          <NoArrComponent
            text="There is no work experience outside"
            className="py-10"
          />
        )
      ) : (
        <NoArrComponent
          text="There is no work experience outside"
          className="py-10"
        />
      )}
    </>
  );
};

export default OutsiteExperience;
