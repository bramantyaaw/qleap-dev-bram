// import node module libraries
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components

const ProfileCoverTicket = ({ dashboardData }) => {
  return (
    <Row className="align-items-center position-relative">
      {dashboardData?.map((data, id) => {
        return (
          <Col key={id} xl={12} lg={12} md={12} sm={12} className="w-100">
            <div className="position-relative">
              <div
                className="pt-16 rounded-top header-img position-absolute"
                style={{
                  background: `url(${data?.background})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className="d-flex justify-content-between bg-white px-4 pt-2 pb-3 rounded-bottom shadow-sm first-header-wrapper profile-cover-ticket ">
              <div className="d-flex align-items-center ">
                <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                  <Image
                    src={data?.avatar}
                    className="avatar-xl rounded-circle border border-4 border-white position-relative"
                    alt="avatar"
                    height={80}
                    width={80}
                  />
                </div>
                <div className="lh-sm header-name">
                  <p className="mb-0">{data?.name}</p>
                  <p className="mb-0 d-block">{data?.username}</p>
                </div>
              </div>
              <div className="wrapper-btn-submit">
                <Link to={data?.link} className="btn-submit-header">
                  {data?.linkname}
                </Link>
              </div>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default ProfileCoverTicket;
