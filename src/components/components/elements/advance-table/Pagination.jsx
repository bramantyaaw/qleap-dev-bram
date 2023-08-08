// import node module libraries
import React from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";

const Pagination = ({
  previousPage,
  pageCount,
  pageIndex,
  gotoPage,
  nextPage,
  euniv,
}) => {
  const visiblePages = 5; // Number of visible pages

  const getVisiblePageRange = () => {
    const halfVisiblePages = Math.floor(visiblePages / 2);
    const start = Math.max(pageIndex - halfVisiblePages, 0);
    const end = Math.min(start + visiblePages - 1, pageCount - 1);
    const adjustedStart = Math.max(end - visiblePages + 1, 0);
    return { start: adjustedStart, end };
  };

  const { start, end } = getVisiblePageRange();

  const handleFirstPageClick = () => {
    gotoPage(0);
  };

  const handleLastPageClick = () => {
    gotoPage(pageCount - 1);
  };

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <div className="pb-5">
          <nav>
            {euniv ? (
              <ListGroup
                as="ul"
                bsPrefix="pagination"
                className="justify-content-center mb-0"
              >
                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    onClick={() => handleFirstPageClick()}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevrons-left"></i>
                  </Button>
                </ListGroup.Item>

                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    onClick={() => previousPage()}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevron-left"></i>
                  </Button>
                </ListGroup.Item>

                {Array.from(Array(end - start + 1).keys()).map((page) => {
                  const pageNumber = page + start;
                  return (
                    <ListGroup.Item
                      as="li"
                      bsPrefix="page-item"
                      key={pageNumber}
                      className={`page-item ${
                        pageIndex === pageNumber ? "active" : ""
                      }`}
                    >
                      <Button
                        className="page-link mx-1 rounded"
                        onClick={() => gotoPage(pageNumber)}
                      >
                        {pageNumber + 1}
                      </Button>
                    </ListGroup.Item>
                  );
                })}

                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    onClick={() => nextPage()}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevron-right"></i>
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    onClick={() => handleLastPageClick()}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevrons-right"></i>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            ) : (
              <ListGroup
                as="ul"
                bsPrefix="pagination"
                className="justify-content-center mb-0"
              >
                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    onClick={() => previousPage()}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevron-left"></i>
                  </Button>
                </ListGroup.Item>

                {Array.from(Array(pageCount).keys()).map((page) => (
                  <ListGroup.Item
                    as="li"
                    bsPrefix="page-item"
                    key={page}
                    className={`page-item ${
                      pageIndex === page ? "active" : ""
                    }`}
                  >
                    <Button
                      className="page-link mx-1 rounded"
                      onClick={() => gotoPage(page)}
                    >
                      {page + 1}
                    </Button>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item as="li" bsPrefix="page-item">
                  <Button
                    onClick={() => nextPage()}
                    className="page-link mx-1 rounded"
                  >
                    <i className="fe fe-chevron-right"></i>
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            )}
          </nav>
        </div>
      </Col>
    </Row>
  );
};

export default Pagination;
