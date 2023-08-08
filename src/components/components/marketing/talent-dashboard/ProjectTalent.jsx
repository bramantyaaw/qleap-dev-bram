// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Icon from "@mdi/react";
import { mdiDownload as downloadIcon } from "@mdi/js";
import { ChevronLeft, ChevronRight } from "react-feather";
import { saveAs } from "file-saver";
import NoArrComponent from "./NoArrComponent";

const ProjectTalent = ({ selectedUid }) => {
  const [arrDummy, setArrDummy] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const saveFile = (value) => {
    saveAs(value);
  };

  useEffect(() => {
    const dataArr = [
      {
        title: "Pembuatan Form Offboarding",
        desc: "Untuk memudahkan karyawan mengajukan Offboarding",
        matrix: "Commercial",
        link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        title: "Pembuatan Form Offboarding",
        desc: "Untuk memudahkan karyawan mengajukan Offboarding",
        matrix: "Commercial",
        link: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
    ];
    setArrDummy(dataArr);
  }, []);

  const ticketPerPage = 5;
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(arrDummy?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      arrDummy?.length <= 5
        ? arrDummy
        : arrDummy?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, arrDummy]);

  const columns = useMemo(
    () => [
      {
        accessor: "title",
        Header: "Tittle",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <div className="d-flex flex-column justify-content-start">
                <p className="h6 text-kinda-dark fw-bold">{value}</p>
              </div>
            </Fragment>
          );
        },
      },
      {
        accessor: "desc",
        Header: "Description",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "matrix",
        Header: "Matrix Competency",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="mb-0 h6 text-kinda-light-dark">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "link",
        Header: "Option",
        Cell: ({ value }) => {
          return (
            <div className="d-flex justify-content-center">
              <Icon
                role="button"
                path={downloadIcon}
                size={0.8}
                className="text-black"
                onClick={() => saveFile(value)}
              />
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
      {/* {selectedUid !== "" ? (
        arrDummy?.length !== 0 ? ( */}
      {/* <Fragment>
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
            {!arrDummy && (
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
        {arrDummy ? (
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
      </Fragment> */}
      {/* ) : (
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
      )} */}
      <NoArrComponent text="There is no project yet" className="py-10" />
    </>
  );
};

export default ProjectTalent;
