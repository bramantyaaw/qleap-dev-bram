// import node module libraries
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components
// import LevelIconWithTooltip from "components/marketing/common/miscellaneous/LevelIconWithTooltip";

// import media files
// import CheckedMark from 'assets/images/svg/checked-mark.svg';
import ProfileBackground from "../../assets/images/background/background_profile.svg";

export const ProfileCover = ({ dashboardData }) => {
  return (
    <Row className="align-items-center">
      {dashboardData?.map((data) => {
        return (
          <Col xl={12} lg={12} md={12} sm={12}>
            {/* <!-- Bg --> */}
            <div
              className="pt-16 rounded-top-md"
              style={{
                background: `url(${ProfileBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              {" "}
            </div>
            <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
              <div className="d-flex align-items-center">
                <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                  <Image
                    src={data?.avatar}
                    className="avatar-xl rounded-circle border border-4 border-white position-relative"
                    alt=""
                  />
                  {/* {dashboardData.verified ? (
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
              )} */}
                </div>
                <div className="lh-1">
                  <h2 className="mb-0 text-left">
                    {data?.name}{" "}
                    {/* <LevelIconWithTooltip level={dashboardData.level} />{' '} */}
                  </h2>
                  <p className="mb-0 d-block text-left">{data?.username}</p>
                </div>
              </div>
              {/* <div>
            <Link
              to={dashboardData.link}
              className={`btn btn${
                dashboardData.outlinebutton ? "-outline" : ""
              }-primary btn-sm d-none d-md-block`}
            >
              {dashboardData.linkname}
            </Link>
          </div> */}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};
