import { Fragment, useState, useEffect } from "react";
import { Card, Col, Row, Form, Tab, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";

const TableList = ({ title, dataList }) => {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const ticketPerPage = 10;
  const pageVisited = pageNumber * ticketPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const newData = dataList?.filter((data) => {
    if (search === "") {
      return data;
    } else if (data?.title?.toLowerCase().includes(search.toLowerCase())) {
      return data;
    } else {
      return null;
    }
  });


  const action = (link) => {
    return (
      <Link to={link} target="_blank" className="btn btn-outline-info btn-sm">
        View Link
      </Link>
    );
  };

  const pageCount = Math.ceil(newData.length / ticketPerPage);
  const dataSliced = newData.slice(pageVisited, pageVisited + ticketPerPage);

  return (
    <Fragment>
      <div>
        <Card className="card-hover border">
          <Card.Header className="bg-white">
            <Row>
              <Col lg={6} md={6} xs={6}>
                <div className="d-flex">
                  {/* Status select */}
                  <div className="pe-md-0">
                    <Form.Group className="mb-3">
                      {/* <FormSelect options={statusOptions} placeholder="Status" /> */}
                      <Form.Control
                        //as={FormSelect}
                        type="text"
                        placeholder={`Enter ${title} name`}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <div className="table-responsive border-0 overflow-y-hidden">
                <Table className="text-nowrap">
                  <thead className="bg-colors-gradient text-white">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">{title.toUpperCase()} NAME</th>
                      <th scope="col">PUBLISH DATE</th>
                      <th scope="col">LINK</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSliced?.map((data, key) => {
                      return (
                        <tr key={key}>
                          <td>{data?.no}</td>
                          <td>
                            <Link to={data?.link} target="_blank">
                              {data?.title}
                            </Link>
                          </td>
                          <td>{data?.date}</td>
                          <td>{action(data?.link)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
              {/* <Pagination className="justify-content-end">
                <Pagination.Prev disabled>Previous</Pagination.Prev>
                <Pagination.Next disabled>Next</Pagination.Next>
              </Pagination> */}
              {/* <Pagination
                  previousPage={previousPage}
                  pageCount={pageCount}
                  pageIndex={pageIndex}
                  gotoPage={gotoPage}
                  nextPage={nextPage}
                /> */}
              <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
                <ReactPaginate
                  previousLabel={<ChevronLeft size="14px" />}
                  nextLabel={<ChevronRight size="14px" />}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"justify-content-center mb-0 pagination"}
                  previousLinkClassName={"page-link mx-1 rounded"}
                  nextLinkClassName={"page-link mx-1 rounded"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link mx-1 rounded"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"active"}
                />
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default TableList;
