// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiHumanHandsdown as StrengthIcon } from "@mdi/js";
import NoArrComponent from "./NoArrComponent";

const TableStrength = ({ arrDataTable, selectedUid }) => {
  const columns = useMemo(
    () => [
      {
        accessor: "strength",
        Header: () => (
          <div className="d-flex align-items-center">
            <div
              className={`icon-shape icon-md bg-light-success text-dark-success rounded-circle w-37`}
            >
              <Icon
                path={StrengthIcon}
                className="nav-icon text-success"
                size={0.8}
              />
            </div>
            <p
              className="mb-0 ms-2 text-kinda-dark"
              style={{ fontWeight: "700" }}
            >
              {" "}
              Strength
            </p>
          </div>
        ),
        Cell: ({ value }) => {
          return (
            <div className="d-flex pe-4 w-100">
              <p
                className="mb-0  fw-bold text-kinda-dark w-100"
                style={{ wordBreak: "break-all", whiteSpace: "normal" }}
              >
                {value}
              </p>
            </div>
          );
        },
      },
      {
        accessor: "improve",
        Header: () => (
          <div className="d-flex align-items-center">
            <div
              className={`icon-shape icon-md bg-light-danger text-dark-danger rounded-circle w-37`}
            >
              <Icon
                path={StrengthIcon}
                className="nav-icon text-danger"
                size={0.8}
              />
            </div>
            <p
              className="mb-0 ms-2 text-kinda-dark"
              style={{ fontWeight: "400" }}
            >
              {" "}
              Need to improve
            </p>
          </div>
        ),
        Cell: ({ value }) => {
          return (
            <div className="d-flex pe-4 w-100">
              <p
                className="mb-0  text-kinda-dark w-100 opacity-50"
                style={{ wordBreak: "break-all", whiteSpace: "normal" }}
              >
                {value}
              </p>
            </div>
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
            <div className="table-responsive border-0 p-0 mt-3">
              <Table {...getTableProps()} className="text-nowrap mb-0">
                <thead
                  className="table-light-blue text-capitalize"
                  style={{ background: "rgba(241, 245, 249, .4)" }}
                >
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
                              className="pyc-12 border-0"
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

export default TableStrength;
