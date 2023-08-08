// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import NoArrComponent from "./NoArrComponent";
import Icon from "@mdi/react";
import {
  mdiBriefcase as iconJob,
  mdiCardAccountDetails as Level0Icon,
  mdiAccount as Level1Icon,
  mdiAccountBox as Level2Icon,
  mdiClipboardAccount as Level3Icon,
  mdiBriefcaseAccount as Level4Icon,
  mdiAccountCreditCard as Level5Icon,
  mdiTicketAccount as Level6Icon,
  mdiShieldAccount as Level7Icon,
  mdiAccountTie as Level8Icon,
} from "@mdi/js";

const ErajayaExperience = ({ arrInsideEra, selectedUid }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const ticketPerPage = 5;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(arrInsideEra?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      arrInsideEra?.length <= 5
        ? arrInsideEra
        : arrInsideEra?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, arrInsideEra]);

  const columns = useMemo(
    () => [
      {
        accessor: "job_title",
        Header: "Job Tittle and Job Level",
        Cell: (props) => {
          let title = props?.row?.original?.job_title;
          let level = props?.row?.original?.job_level;
          let splitLvl = level?.split("");
          let numLvl = splitLvl ? splitLvl[0] : 0;
          let intLvl = parseInt(numLvl);

          return (
            <div className="d-flex align-items-center">
              <div
                className={`icon-shape icon-md bg-light-primary text-dark-primary rounded-circle w-37`}
              >
                {intLvl === 0 ? (
                  <Icon
                    path={Level0Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 1 ? (
                  <Icon
                    path={Level1Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 2 ? (
                  <Icon
                    path={Level2Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 3 ? (
                  <Icon
                    path={Level3Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 4 ? (
                  <Icon
                    path={Level4Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 5 ? (
                  <Icon
                    path={Level5Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 6 ? (
                  <Icon
                    path={Level6Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 7 ? (
                  <Icon
                    path={Level7Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : intLvl === 8 ? (
                  <Icon
                    path={Level8Icon}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                ) : (
                  <Icon
                    path={iconJob}
                    className="nav-icon text-primary"
                    size={0.8}
                  />
                )}
              </div>
              <p className="mb-0 ms-3 fw-bold text-kinda-dark w-350">
                {title} • {level}
              </p>
            </div>
          );
        },
      },
      {
        accessor: "org_name",
        Header: "Organization Name",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "sk_type",
        Header: "Type",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "sk_date",
        Header: "Effective Date",
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
        arrInsideEra?.length !== 0 ? (
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
              </Table>
            </div>
            {arrInsideEra ? (
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
            text="There is no work experience in Erajaya"
            className="py-10"
          />
        )
      ) : (
        <NoArrComponent
          text="There is no work experience in Erajaya"
          className="py-10"
        />
      )}
    </>
  );
};

export default ErajayaExperience;
