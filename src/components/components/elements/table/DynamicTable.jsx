import React, { Fragment, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";

export const DynamicTable = (props) => {
  const { title, data, searchable } = props;

  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 10;
  const pageVisited = pageNumber * perPage;

  // get table column
  const column = data?.length > 0 ? Object.keys(data[0]) : [];

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const newData = data?.filter((data) => {
    if (search === "") {
      return data;
    } else if (data[searchable]?.toLowerCase().includes(search.toLowerCase())) {
      return data;
    } else {
      return null;
    }
  });

  const pageCount = Math.ceil(newData?.length / perPage);
  const dataSliced = newData?.slice(pageVisited, pageVisited + perPage);

  // get table heading data
  const ThData = () => {
    return column?.map((data) => {
      return <th key={data}>{data.replace("_", " ")}</th>;
    });
  };

  // get table row data
  const tdData = () => {
    return dataSliced?.map((data) => {
      return (
        <tr>
          {column?.map((v) => {
            return <td>{data[v]}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <Fragment>
      <Card>
        <Card.Header>
          <Row>
            <Col lg={6} md={6} xs={6}>
              <h4>List {title}</h4>
            </Col>
            <Col lg={6} md={6} xs={6}>
              <div className="d-flex justify-content-end">
                {/* Status select */}
                <div className="pe-md-0">
                  <Form.Group className="mb-3">
                    {/* <FormSelect options={statusOptions} placeholder="Status" /> */}
                    <Form.Control
                      //as={FormSelect}
                      type="text"
                      placeholder={`Search`}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table responsive className="text-nowrap">
            <thead className="table-light">
              <tr>{ThData()}</tr>
            </thead>
            <tbody>{tdData()}</tbody>
          </Table>
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
        </Card.Body>
      </Card>
    </Fragment>
  );
};
