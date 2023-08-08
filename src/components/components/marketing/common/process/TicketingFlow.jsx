// import node module libraries
import { Col, Row, Container, Button } from "react-bootstrap";
import HeaderQR from "../../../../../assets/images/svg/header-qr-new.svg";

const TicketingFlow = ({ progressData, link }) => {
  const dataLength = progressData?.length;
  return (
    <>
      <div
        className="w-100"
        style={{
          height: "80px",
          background: `url(${HeaderQR})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
      ></div>

      <section
        className="py-lg-10 pt-6 py-8 bg-white"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <Container>
          <Row>
            <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
              <Row className="text-center">
                {/* col */}
                <Col md={12} className="px-lg-10 mb-8 mt-6">
                  <span
                    className="text-uppercase text-primary fw-semi-bold ls-md"
                    style={{ fontWeight: "700" }}
                  >
                    TICKETING
                  </span>
                  {/* heading */}
                  <p className="mb-0 mt-4 lh-sm" style={{ fontSize: "23px" }}>
                    Pengajuan Atas Nama,
                  </p>
                  <h1 className="fw-bold">
                    Muhammad Arsyad Nurzaky - 202300281
                  </h1>
                </Col>
              </Row>

              <Row className="gy-6">
                {/* col */}
                {progressData?.map((data, id) => {
                  let newId = id + 1;

                  return (
                    <Col
                      md={dataLength === 2 ? 5 : dataLength === 3 ? 4 : 3}
                      sm={12}
                      key={newId}
                    >
                      <div
                        className={`text-center d-flex justify-content-center flex-column align-items-center ${
                          data?.result === "-" && "opacity-50"
                        }`}
                      >
                        {/* icon */}
                        <div
                          className={`icon-shape icon-lg border border-2 fs-3 rounded-circle mb-2 ${
                            progressData?.length === newId
                              ? ""
                              : newId % 4 !== 0
                              ? "process-line"
                              : ""
                          } center ${
                            data?.result === "open"
                              ? "border-dark-info text-dark-info bg-light-info"
                              : data?.result === "process"
                              ? "border-warning text-warning bg-light-warning"
                              : data?.result === "revision"
                              ? "border-danger text-danger bg-light-danger"
                              : "border-gray-900 text-gray-900 bg-light-dark"
                          }`}
                        >
                          {newId}
                        </div>
                        {data?.result === "open" ? (
                          <p className="text-dark-info mb-4">Open</p>
                        ) : data?.result === "process" ? (
                          <p className="text-warning bg-light-warning border border-warning rounded px-2 mb-4">
                            Process
                          </p>
                        ) : data?.result === "revision" ? (
                          <p className="text-danger bg-light-danger border border-danger rounded px-2 mb-4">
                            Revision
                          </p>
                        ) : (
                          <p className="mb-0 mb-md-4 text-kinda-light-dark">
                            {data?.result ? data?.result : "&nbsp;&nbsp"}
                          </p>
                        )}

                        {/* heading */}
                        <h3 style={{ fontSize: "19px", fontWeight: "600" }}>
                          {data?.type}
                        </h3>
                        {/* text */}
                        <p className="mb-0 px-4">{data?.nama}</p>
                        <p className="mb-0 px-4" style={{ color: "#64748B" }}>
                          {data?.created_date}
                        </p>
                      </div>
                    </Col>
                  );
                })}

                <div className="text-center text-navy">
                  <h3 style={{ fontWeight: "400" }} className="mb-4">
                    Create Master Location Proint - HCIS
                  </h3>
                  <p
                    className="mb-0"
                    style={{ fontSize: "18px", fontWeight: "700" }}
                  >
                    Total Duration :
                  </p>
                </div>

                {/* button */}
                <Col sm={12} className="mt-3 text-center">
                  <Button
                    as="a"
                    href={link}
                    // target="_blank"
                    className="px-3 py-2"
                  >
                    View Detail
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TicketingFlow;
