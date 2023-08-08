// import node module libraries
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProfileBackground from "../../assets/images/background/background_profile.svg";
import IleadImgSource from "../../assets/ezone/images/svg/ilead-point.svg";

export const ProfileCover = ({
  dashboardData,
  isEzone,
  className,
  IleadPointLogo,
  title,
  desc,
  isNotFold
}) => {
  return (
    <>
      {isEzone ? (
        <>
          <div className={className}>
            <div
              className="pt-16 rounded-top-md position-relative"
              style={{
                background: `url(${ProfileBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
              }}
            >
              {isNotFold && (
                <Image
                  src={IleadImgSource}
                  className="position-absolute"
                  height={100}
                  style={{ zIndex: "1", bottom: "-1px", left: "10px" }}
                />
              )}

              <div
                className="d-flex flex-column text-white justify-content-center position-absolute"
                style={{ zIndex: "99", right: "15px", top: "29px" }}
              >
                <p className="mb-0 h6 text-white">Score Kamu Sekarang:</p>
                <div className="d-flex flex-column align-items-start justify-content-start">
                  <h1 className="mb-0 text-white">
                    80<span className="h3 text-white"> Points</span>
                  </h1>
                  <p className="mb-0"></p>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-end justify-content-between bg-white px-4 py-4 rounded-bottom-md shadow-sm">
              <div className="d-flex align-items-center">
                <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5"></div>
                <div className="lh-1">
                  <h2
                    className="mb-1 text-gray-900"
                    style={{ fontSize: "19px", fontWeight: "600" }}
                  >
                    {title}
                  </h2>
                  <p
                    className="mb-0 d-block text-gray-900 h6 lh-1"
                    style={{ fontWeight: "400" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Row className="align-items-center mt-10">
          {dashboardData?.map((data) => {
            return (
              <Col xl={12} lg={12} md={12} sm={12} key={data?.unique_id}>
                <div
                  className="pt-16 rounded-top-md"
                  style={{
                    background: `url(${ProfileBackground})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                  }}
                ></div>
                <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                      <Image
                        src={data?.avatar}
                        className="avatar-xl rounded-circle border border-4 border-white position-relative"
                        alt="avatar"
                      />
                      {data?.verified ? (
                        <Link
                          to="#"
                          className="position-absolute top-0 end-0"
                          data-bs-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Verified"
                        >
                          <Image
                            src={ProfileBackground}
                            alt=""
                            height="30"
                            width="30"
                          />
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="lh-1">
                      <h2 className="mb-0">
                        {data?.name}{" "}
                        {/* <LevelIconWithTooltip level={dashboardData.level} />{' '} */}
                      </h2>
                      <p className="mb-0 d-block">{data?.username}</p>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};
