// import node module libraries
import React, { Fragment, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useTable, useFilters, usePagination } from "react-table";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useEffect } from "react";

const TableProductSold = ({ arrData, searchText }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [arrDataSliced, setArrDataSliced] = useState([]);
  const [pageVisited, setPageVisited] = useState(0);

  const ticketPerPage = 10;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let countPage = Math.ceil(arrData?.length / ticketPerPage);

  useEffect(() => {
    const pageVisited = pageNumber * ticketPerPage;
    setPageVisited(pageVisited);
  }, [pageNumber, ticketPerPage]);

  useEffect(() => {
    let dataSliced =
      arrData?.length <= 10
        ? arrData
        : arrData?.slice(pageVisited, pageVisited + ticketPerPage);

    setArrDataSliced(dataSliced);
    // eslint-disable-next-line
  }, [pageVisited, ticketPerPage, arrData]);

  const columns = useMemo(
    () => [
      { accessor: (row, index) => index + 1 + pageVisited, Header: "NO" },
      { accessor: "productName", Header: "Product Name" },
      { accessor: "postingDate", Header: "Posting Date" },
      { accessor: "quantity", Header: "Quantity" },
      { accessor: "incentiveProduct", Header: "Incentive Product" },
      { accessor: "salesAmount", Header: "Sales Amount" },
      { accessor: "totalIncentive", Header: "Total Incentive" },
      { accessor: "posNumber", Header: "POS Number" },
      { accessor: "storeName", Header: "Store" },
    ],
    // eslint-disable-next-line
    [, pageVisited]
  );
  const filteredData = useMemo(() => {
    let result = arrDataSliced || [];

    if (searchText !== "") {
      result = result.filter(
        (submission) =>
          submission.productName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.quantity
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.incentiveProduct
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.incentiveProduct
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.salesAmount
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.totalIncentive
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.postingDate
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.posNumber
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.storeName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return result;
  }, [arrDataSliced, searchText]);

  const data = useMemo(() => {
    if (!filteredData) {
      return []; // or any other appropriate value for your use case
    } else {
      return filteredData;
    }
    // eslint-disable-next-line
  }, [filteredData]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageSize: 10,
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
          <thead className=" bg-white">
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

      {/* <Pagination
        previousPage={previousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
      /> */}
      {arrData ? (
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

export default TableProductSold;
