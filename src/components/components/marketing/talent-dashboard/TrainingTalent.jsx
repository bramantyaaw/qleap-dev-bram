// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import NoArrComponent from "./NoArrComponent";

const TrainingTalent = ({ arrEmployeeTraining, selectedUid }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  let sortArr = arrEmployeeTraining?.sort((a, b) => {
    const aString = parseInt(a?.training_year);
    const bString = parseInt(b?.training_year);
    return bString - aString;
  });

  const ticketPerPage = 5;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(sortArr?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      sortArr?.length <= 5
        ? sortArr
        : sortArr?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, sortArr]);

  const columns = useMemo(
    () => [
      {
        accessor: "training_name",
        Header: "Training Name",
        Cell: (props) => {
          let training = props?.row?.original?.training_name;
          let nameString = training?.toString();
          return (
            // <Fragment>
            <div className="d-flex flex-column justify-content-start w-406">
              <span className="text-black opacity-50 fw-10">
                {props?.row?.original?.training_code}
              </span>
              <p className="mb-0 h6 text-kinda-dark fw-bold">{nameString}</p>
            </div>
            // </Fragment>
          );
        },
      },
      {
        accessor: "training_type",
        Header: "Training Type",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "training_year",
        Header: "Training Date",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
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
        sortArr?.length !== 0 ? (
          <Fragment>
            <div className="table-responsive border-0 overflow-y-hidden mb-5 ">
              <Table {...getTableProps()} className="text-nowrap">
                <thead className="table-light-blue text-capitalize">
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
                {!sortArr && (
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
            {sortArr ? (
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
            text="There is no training followed"
            className="py-10"
          />
        )
      ) : (
        <NoArrComponent
          text="There is no training followed"
          className="py-10"
        />
      )}
    </>
  );
};

export default TrainingTalent;
