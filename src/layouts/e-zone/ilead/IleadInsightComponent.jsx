import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import DummyPhoto from "../../../assets/ezone/images/dummy/dummy-bca1-compressed.jpg";
import Icon from "@mdi/react";
import { mdiImageMultiple as ImgIcon } from "@mdi/js";

const IleadInsightComponent = () => {
  const arrData = [
    {
      photo: DummyPhoto,
      title: "ZOOMPA PAKAR PRIME - VISIT BCA",
      caption:
        "Program yang bekolaborasi dengan BCA untuk field trip dan mengadakan sharing session sebagai benchmark program untuk menambah knowledge dan overview dari perusahaan lain.",
    },
    // {
    //   photo: DummyPhoto,
    //   title: "Gebyar BCA",
    //   caption:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aut sint reprehenderit, ea officia tempora eaque harum commodi",
    // },
    // {
    //   photo: DummyPhoto,
    //   title: "BCA Hore",
    //   caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    // },
    // {
    //   photo: DummyPhoto,
    //   title: "HUT BCA",
    //   caption:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aut sint reprehenderit, ea officia tempora eaque harum commodi, ad explicabo sit debitis minima doloremque rem vel qui minus, quo beatae voluptate in voluptatem quidem dolores ut veniam? Exercitationem eius, ea expedita animi quis, aspernatur nisi quibusdamcommodi tempora ab molestias.",
    // },
  ];

  return (
    <div>
      <Row>
        {arrData?.map((data, id) => {
          return (
            <Col lg={4} md={6} sm={12} className="mb-4" key={id}>
              <Link
                to={`/ezone/ilead/insight/detail`}
                className="text-kinda-dark rounded-3 h-100"
                role="button"
              >
                <Card
                  className={`mb-4 card-hover h-100 bg-ezone-light-primary rounded-bottom-md`}
                >
                  <div style={{ height: "300px" }}>
                    <Image
                      src={data?.photo}
                      alt=""
                      className="card-img-top rounded-top-md h-100"
                      style={{ objectFit: "cover", OObjectFit: "cover" }}
                    />
                  </div>

                  {/* Card body  */}
                  <Card.Body className=" text-white">
                    <div>
                      <h2
                        className="text-center text-white text-uppercase"
                        style={{ fontWeight: "700" }}
                      >
                        {data?.title}
                      </h2>
                      <p className="text-center mb-0 lh-sm">{data?.caption}</p>
                    </div>
                  </Card.Body>
                  <Card.Footer className="bg-ezone-light-primary d-flex justify-content-between text-white">
                    <div className="d-flex">
                      <Icon path={ImgIcon} size={0.8} />
                      <p className="mb-0 ms-2">5 Photos</p>
                    </div>
                    <p className="mb-0">4 Maret 2023</p>
                  </Card.Footer>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default IleadInsightComponent;
