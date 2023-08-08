import React from "react";
import { Col, Image, Modal, Row } from "react-bootstrap";
import PhotoImg from "../../../assets/images/avatar/avatar-11.jpg";
import NoArrComponent from "../../../components/components/marketing/talent-dashboard/NoArrComponent";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const ModalMemberCommunity = ({ show, setShow, arrData }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const ticketPerPage = 18;
  const pageVisited = pageNumber * ticketPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const pageCount = Math.ceil(arrData?.length / ticketPerPage);
  const dataSliced = arrData?.slice(pageVisited, pageVisited + ticketPerPage);

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      dialogClassName="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="font-md w-100" style={{ fontWeight: "700" }}>
          <p className="mb-0 text-center">Member List</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="pb-4">
          {arrData?.length > 0 ? (
            dataSliced?.map((data, id) => {
              return (
                <Col
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  key={id}
                  className="mt-4 align-items-start justify-content-start d-flex"
                >
                  <div className="align-items-start justify-content-start d-flex w-100">
                    <div
                      className="avatar avatar-md rounded-circle me-2"
                      style={{ border: "1px solid #FFFFFF" }}
                    >
                      <Image
                        alt=""
                        src={data?.photo}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                      <p
                        className="mb-1 lh-1 text-navy-ezone"
                        style={{ fontWeight: "600" }}
                      >
                        {data?.name}{" "}
                        <span
                          style={{
                            color: " rgba(33, 37, 41, 0.7)",
                            fontWeight: "400",
                          }}
                        >
                          - {data?.nik}
                        </span>
                      </p>
                      <p className="mb-0 lh-1">{data?.division}</p>
                    </div>
                  </div>
                </Col>
              );
            })
          ) : (
            <NoArrComponent text="Nobody has joined yet" />
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        {arrData?.length > 0 && (
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
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMemberCommunity;
