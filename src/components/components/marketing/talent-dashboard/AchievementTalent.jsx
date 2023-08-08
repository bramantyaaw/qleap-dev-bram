// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiAirplane as airplaneIcon, mdiLicense as awardIcon } from "@mdi/js";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import NoArrComponent from "./NoArrComponent";

const AchievementTalent = ({ arrEmployeeAwards, selectedUid }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const ticketPerPage = 5;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(arrEmployeeAwards?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      arrEmployeeAwards?.length <= 5
        ? arrEmployeeAwards
        : arrEmployeeAwards?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, arrEmployeeAwards]);

  const columns = useMemo(
    () => [
      {
        accessor: "award_name",
        Header: "Achievement Name",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <div className="d-flex align-items-center ">
                {value !== "Erajaya Achievement Award" ? (
                  <div
                    className={`icon-shape icon-md bg-light-info text-dark-info rounded-circle`}
                  >
                    <Icon
                      path={airplaneIcon}
                      className="nav-icon text-info"
                      size={0.8}
                    />
                  </div>
                ) : (
                  <div
                    className={`icon-shape icon-md bg-light-success text-dark-success rounded-circle`}
                  >
                    <Icon
                      path={awardIcon}
                      className="nav-icon text-success"
                      size={0.8}
                    />
                  </div>
                )}

                <p className="mb-0 ms-3 fw-bold h5 text-kinda-dark">{value}</p>
              </div>
            </Fragment>
          );
        },
      },
      {
        accessor: "emp_hon_note",
        Header: "Achievement Description",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <div className="d-flex align-items-center ">
                <p className="mb-0  h6 text-kinda-light-dark  ">{value}</p>
              </div>
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
        arrEmployeeAwards?.length !== 0 ? (
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
                {!arrEmployeeAwards && (
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
            {arrEmployeeAwards ? (
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
            text="There is no achievement earned"
            className="py-10"
          />
        )
      ) : (
        <NoArrComponent
          text="There is no achievement earned"
          className="py-10"
        />
      )}
    </>
  );
};

export default AchievementTalent;
