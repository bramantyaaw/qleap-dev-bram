// import node module libraries
import { Col, Row, Card, Image } from "react-bootstrap";

// import media files
import ILEADImg from "../../../../assets/ezone/images/svg/dummy-img-ilead-news.svg";

const NewsArticle = ({ arrDetailNews }) => {
  return (
    <>
      {arrDetailNews?.map((data) => {
        return (
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Card>
                  <Card.Body className="p-5">
                    <div className="d-flex justify-content-center mb-3">
                      <Image
                        src={data?.thumbnail}
                        className="rounded"
                        style={{ width: "100%", height: "fitContent" }}
                      />
                    </div>
                    {/* <div className="d-flex justify-content-start mt-5">
                      <p className="px-2 py-1 bg-light-danger text-danger rounded h6">
                        Lifestyle
                      </p>
                    </div> */}
                    <h1 style={{ fontWeight: "700" }}>{data?.title}</h1>
                    <div className="d-flex align-items-start mb-3">
                      <p className="text-grey-ezone me-6">
                        by {data?.created_by}
                      </p>
                      <p className="text-grey-ezone me-6">
                        {data?.created_date}
                      </p>
                      {/* <p className="text-grey-ezone">5 min ago</p> */}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: data?.content }} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        );
      })}
    </>
  );
};
export default NewsArticle;
