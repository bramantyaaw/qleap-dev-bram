import { Fragment, useMemo } from "react";
import { Badge, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTable, useFilters, usePagination, useSortBy } from "react-table";
import Pagination from "../../../components/components/elements/advance-table/Pagination";

export const ListSubmission = ({
  selectedItem,
  selectedSubmissionType,
  searchText,
  dataList,
  status,
}) => {
  // const [selectedDate, setSelectedDate] = useState("");

  const columns = useMemo(() => {
    const baseColumns = [
      { accessor: (row, index) => index + 1, Header: "NO" },
      { accessor: "nik", Header: "NIK" },
      { accessor: "name", Header: "NAME" },
      { accessor: "created_at", Header: "SUBMIT DATE" },
      { accessor: "submission_type", Header: "SUBMISSION TYPE" },
      {
        accessor: "trx_id",
        Header: "ACTION",
        Cell: ({ value }) => {
          return (
            <Link
              to={`/submission/detail-employee/${value}`}
              className="btn btn-xs btn-info text-white"
            >
              View Detail
            </Link>
          );
        },
      },
    ];

    if (status) {
      baseColumns.splice(5, 0, {
        accessor: "status",
        Header: "STATUS",
        Cell: ({ value }) => {
          return (
            <Fragment>
              <Badge
                bg={`${
                  value === "In Progress"
                    ? "warning"
                    : value === "Full Approved"
                    ? "success"
                    : value === "Open"
                    ? "secondary"
                    : value === "Reject"
                    ? "danger"
                    : "primary"
                } `}
              >
                {value}
              </Badge>
            </Fragment>
          );
        },
      });
    }

    return baseColumns;
  }, [status]);

  const filteredData = useMemo(() => {
    let result = dataList || [];
    if (selectedSubmissionType !== "") {
      result = result.filter(
        (submission) => submission.submission_type === selectedSubmissionType
      );
    }
    if (selectedItem !== "") {
      result = result.filter(
        (submission) => submission.status === selectedItem
      );
    }
    if (searchText !== "") {
      result = result.filter(
        (submission) =>
          submission.name.toLowerCase().includes(searchText.toLowerCase()) ||
          submission.nik.toLowerCase().includes(searchText.toLowerCase()) ||
          submission.created_at
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          submission.submission_type
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
    }
    return result;
  }, [dataList, selectedSubmissionType, selectedItem, searchText]);

  // const data = useMemo(() => dataList, [dataList]);

  const data = useMemo(() => {
    if (!filteredData) {
      return []; // or any other appropriate value for your use case
    }

    return filteredData;
  }, [filteredData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    state,
    gotoPage,
    pageCount,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        // sortBy: [{ id: "submission_id", desc: true }],
        hiddenColumns: columns?.map((column) => {
          if (column?.show === false) return column?.accessor || column?.id;
          else return false;
        }),
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const { pageIndex } = state;

  return (
    <Fragment>
      <div className="table-responsive border-0 overflow-y-hidden">
        <Table striped {...getTableProps()} className="text-nowrap">
          <thead className="table-dark">
            {headerGroups?.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
      <Pagination
        previousPage={previousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
      />
    </Fragment>
  );
};
