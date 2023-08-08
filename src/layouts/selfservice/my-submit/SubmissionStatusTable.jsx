import React, { useMemo } from "react";
import Pagination from "../../../components/components/elements/advance-table/Pagination";
import { Badge, Col, Image, ListGroup, Row, Table } from "react-bootstrap";
import { Submit as dataDummy } from "../../../data/submit/Submit";
import { Link } from "react-router-dom";
import { useTable, useFilters, usePagination } from "react-table";

const SubmissionStatusTable = () => {
  //   const [selectedItem, setSelectedItem] = useState("");
  //   const filterByNotif = data_?.filter((data) => {
  //     if (selectedItem === "" || selectedItem === "All") {
  //       return data;
  //     } else if (
  //       data?.status?.toLowerCase().includes(selectedItem.toLowerCase())
  //     ) {
  //       return data;
  //     } else {
  //       return null;
  //     }
  //   });

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = () => {
    return (
      <Link to="/my-submission/detail" className="btn btn-outline-primary">
        View Detail
      </Link>
    );
  };

  const columns = useMemo(
    () => [
      {
        accessor: "type",
        Header: "TYPE",
        Cell: ({ value, row }) => {
          let img = "";

          switch (row.original.type) {
            case "Tunjangan Suka Duka":
              img = "tunjangan-suka-duka-icon.svg";
              break;
            case "Reward Trip":
              img = "reward-trip-icon.svg";
              break;
            case "Offboarding":
              img = "offboarding-icon.svg";
              break;
            case "Digital Letter":
              img = "digital-letter-icon.svg";
              break;
            default:
              break;
          }

          return (
            <div className="d-lg-flex">
              <div>
                <Link to="#">
                  <Image
                    src={"/src/assets/images/icon/" + img}
                    alt=""
                    className="rounded img-4by3-sm"
                  />
                </Link>
              </div>
              <div className="ms-lg-3 mt-2 mt-lg-0">
                <h4 className="mb-1 h5 text-left">
                  <Link to="#" className="text-inherit">
                    {row.original.type}
                  </Link>
                </h4>
                <ListGroup
                  as="ul"
                  bsPrefix="list-inline"
                  className="fs-6 mb-0 text-left"
                >
                  <ListGroup.Item as="li" bsPrefix="list-inline-item">
                    ID #{row.original.letter_number}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>
          );
        },
      },
      {
        accessor: "submit-date",
        Header: "SUBMIT DATE",
        Cell: ({ value, row }) => {
          return row.original.submit_date;
        },
      },

      {
        accessor: "status-date",
        Header: "STATUS DATE",
        Cell: ({ value, row }) => {
          return row.original.status_date;
        },
      },

      {
        accessor: "status",
        Header: "STATUS",
        Cell: ({ value }) => {
          return (
            <Badge
              bg={`${
                value === "Process"
                  ? "warning"
                  : value === "Solved"
                  ? "success"
                  : value === "Reject"
                  ? "danger"
                  : "info"
              } `}
              className="badge-notif"
            >
              {value}
            </Badge>
          );
        },
      },
      {
        accessor: "action",
        Header: "",
        Cell: () => {
          return <ActionMenu />;
        },
      },
    ],
    []
  );

  //   const data = useMemo(() => filterByNotif, [selectedItem]);
  const data = useMemo(() => dataDummy, []);

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
    // setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 4,
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id;
          else return false;
        }),
      },
    },
    useFilters,
    // useGlobalFilter,
    usePagination
  );

  const { pageIndex } = state;
  return (
    <>
      {" "}
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="table-responsive ">
            <Table {...getTableProps()} className="text-nowrap">
              {/* <thead className="table-light text-left">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead> */}
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td className="text-left" {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Pagination
        previousPage={previousPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        gotoPage={gotoPage}
        nextPage={nextPage}
      />
    </>
  );
};

export default SubmissionStatusTable;
