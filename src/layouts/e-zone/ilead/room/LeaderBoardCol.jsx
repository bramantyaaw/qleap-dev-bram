import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import { useState } from "react";
import GoldAward from "../../../../assets/ezone/images/svg/gold-award.svg";
import SilverAward from "../../../../assets/ezone/images/svg/silver-award.svg";
import BronzeAward from "../../../../assets/ezone/images/svg/bronze-award.svg";
import LoadingComponent from "../../../../components/components/elements/loading/LoadingComponent";

const LeaderBoardCol = ({ arrDummy, arrColumn, length, loading }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const ticketPerPage = length;
  const pageVisited = pageNumber * ticketPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let sortArr = arrDummy?.sort((a, b) => a?.rank - b?.rank);
  const pageCount = Math.ceil(sortArr?.length / ticketPerPage);

  const dataSliced =
    arrDummy?.length <= length
      ? arrDummy
      : arrDummy?.slice(pageVisited, pageVisited + ticketPerPage);

  return (
    <div className="table-custom">
      <Row className="">
        <Col lg={1} md={1} sm={1} xs={1}></Col>
        <Col lg={11} md={11} sm={11} xs={11}>
          <Row className="border-bottom">
            {arrColumn?.map((data, id) => {
              return (
                <Col
                  lg={data?.lg}
                  md={data?.md}
                  sm={data?.sm}
                  xs={data?.xs}
                  key={id}
                >
                  <p className="mb-0 text-uppercase">{data?.colName}</p>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <div className="mb-4" style={{ overflowX: "auto" }}>
        {arrDummy ? (
          dataSliced?.map((data, id) => {
            const newId = id + 1 + pageVisited;

            let splitTime = data?.time?.split(" ");
            let min = splitTime ? splitTime[0] : "";
            let sec = splitTime ? splitTime[2] : "";
            let minInt = parseInt(min);
            let secInt = parseInt(sec);

            return (
              <Row
                className="mt-3"
                key={id}
                style={{
                  fontWeight:
                    newId === 1 || newId === 2 || newId === 3 ? "700" : "400",
                  width: "fitContent",
                  overflowX: "auto",
                }}
              >
                <Col lg={1} md={1} sm={1} xs={2} className="">
                  {newId === 1 || newId === 2 || newId === 3 ? (
                    <div className="d-flex align-items-center justify-content-start ps-0 ps-sm-2 pt-3 pt-sm-0">
                      <Image
                        src={
                          newId === 1
                            ? GoldAward
                            : newId === 2
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
                      {newId}
                    </div>
                  )}
                </Col>
                <Col lg={11} md={11} sm={11} xs={10}>
                  <Row
                    className={`d-flex align-items-center justify-content-center ${
                      newId === 1
                        ? "bg-kinda-gold"
                        : newId === 2
                        ? "bg-kinda-silver"
                        : newId === 3
                        ? "bg-kinda-bronze"
                        : "bg-white border border-gray-900"
                    }`}
                    style={{
                      borderRadius: "28px",
                      minHeight: "39px",
                      overflowX: "auto",
                    }}
                  >
                    <Col lg={4} md={4} sm={4} xs={4} className="ps-0">
                      <div className="d-flex align-items-center">
                        <div className="avatar avatar-md me-3">
                          <Image
                            alt=""
                            src={data?.photo}
                            className="rounded-circle"
                            height={39}
                            style={{
                              borderRadius: "50%",
                              border:
                                newId === 1 || newId === 2 || newId === 3
                                  ? "1px solid #FFFFFF"
                                  : "",
                            }}
                          />
                        </div>
                        <p className="mb-0">{data?.name}</p>
                      </div>
                    </Col>
                    <Col lg={4} md={4} sm={4} xs={4}>
                      <p className="mb-0">{data?.div}</p>
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <p className="mb-0">{`${minInt} min ${secInt} sec`}</p>
                      {/* <p className="mb-0">{data?.time}</p> */}
                    </Col>
                    <Col lg={2} md={2} sm={2} xs={2}>
                      <p className="mb-0">{data?.score}</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })
        ) : (
          <p className="mb-0 text-center text-secondary mt-3">No Data</p>
        )}
        {loading && <LoadingComponent className="mt-3" />}
      </div>
      {arrDummy && (
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
    </div>
  );
};

export default LeaderBoardCol;
