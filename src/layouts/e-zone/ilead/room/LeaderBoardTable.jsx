// import node module libraries
import React, { Fragment, useMemo, useState, useEffect } from "react";
import { useTable, useFilters, usePagination } from "react-table";
import { Image, Table } from "react-bootstrap";
import NoArrComponent from "../../../../components/components/marketing/talent-dashboard/NoArrComponent";
import GoldAward from "../../../../assets/ezone/images/svg/gold-award.svg";
import SilverAward from "../../../../assets/ezone/images/svg/silver-award.svg";
import BronzeAward from "../../../../assets/ezone/images/svg/bronze-award.svg";

const LeaderBoardTable = ({ arrDataTable, selectedUid }) => {
  const columns = useMemo(
    () => [
      {
        accessor: "name",
        Header: "Name",
        Cell: (props) => {
          let code = props?.row?.original?.rank;

          let name = props?.row?.original?.name;
          let nameString = name?.toString();

          let point = props?.row?.original?.point;
          return (
            <Fragment>
              <div
                className={`d-flex ${
                  point !== 1 ? "text-black" : "text-danger"
                }`}
              >
                {code === 1 || code === 2 || code === 3 ? (
                  <div className="d-flex align-items-center justify-content-start ps-0 ps-sm-2 pt-3 pt-sm-0">
                    <Image
                      src={
                        code === 1
                          ? GoldAward
                          : code === 2
                          ? SilverAward
                          : BronzeAward
                      }
                      height={39}
                    />
                  </div>
                ) : (
                  <div
                    className={`d-flex align-items-center justify-content-center h-100  fw-bold  rounded-cirlce  bg-white border border-gray-900 `}
                    style={{
                      width: "39px",
                      borderRadius: "50% ",
                      minHeight: "39px",
                    }}
                  >
                    {code}
                  </div>
                )}
                <p className="mb-0">{nameString}</p>
              </div>
            </Fragment>
          );
        },
      },
      {
        accessor: "division",
        Header: "Division",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <div className="d-flex align-items-end justify-content-end pe-4">
                <p
                  className={`mb-0 h6 fw-bold ${
                    value === 1
                      ? "text-danger"
                      : value === 2
                      ? "text-success"
                      : value === 3
                      ? "text-primary"
                      : "text-black"
                  }`}
                >
                  {value}
                  <span className="text-kinda-grey">/3 Point</span>
                </p>
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
            <div className="table-responsive border-0 p-0">
              <Table {...getTableProps()} className="text-nowrap mb-0">
                <thead className="table-light-blue text-capitalize bg-light-blue">
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

export default LeaderBoardTable;
