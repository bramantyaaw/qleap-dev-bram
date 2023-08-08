// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import NoArrComponent from "../../../components/components/marketing/talent-dashboard/NoArrComponent";
import Icon from "@mdi/react";
import {
  mdiMinusCircleOffOutline as notPassIcon,
  mdiCheck as passIcon,
} from "@mdi/js";

const TableSummaryResult = ({ arrDataTable, selectedUid }) => {
  const columns = useMemo(
    () => [
      {
        accessor: "talent",
        Header: "Criteria",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="text-black">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "review",
        Header: "",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <p className="text-black">{value}</p>
            </Fragment>
          );
        },
      },
      {
        accessor: "isPass",
        Header: "Meet / Not Meet",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <div className="ps-5">
                {value ? (
                  <div
                    className={`icon-shape icon-xs bg-success text-white rounded-circle w-37`}
                  >
                    <Icon
                      path={passIcon}
                      className="nav-icon text-white"
                      size={0.7}
                    />
                  </div>
                ) : (
                  <div
                    className={`icon-shape icon-xs bg-danger text-white rounded-circle w-37`}
                  >
                    <Icon
                      path={notPassIcon}
                      className="nav-icon text-white"
                      size={0.7}
                    />
                  </div>
                )}
              </div>
            </Fragment>
          );
        },
      },
    ],
    // eslint-disable-next-line
    []
  );

  const data = useMemo(() => {
    if (!arrDataTable) {
      return []; // or any other appropriate value for your use case
    } else {
      return arrDataTable;
    }
    // eslint-disable-next-line
  }, [arrDataTable]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: {
          pageSize: 20,
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
        arrDataTable?.length !== 0 ? (
          <Fragment>
            <div className="table-responsive border-0 p-2">
              <Table {...getTableProps()} className="text-nowrap mb-0">
                <thead className="table-white border-white text-capitalize bg-white text-black fw-bold">
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
                              className="pyc-12 border-0 border-white"
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
                {!arrDataTable && (
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

export default TableSummaryResult;
