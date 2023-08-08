import axios from "axios";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { Carousel, Container, Image } from "react-bootstrap";
import LoadingComponent from "../../components/components/elements/loading/LoadingComponent";
import { Link } from "react-router-dom";

const CarouselPart = (props) => {
  const { token, isCustom, arrCustom, className, style } = props;
  const [index, setIndex] = useState(0);
  const [banners, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const fetchBanner = async () => {
    try {
      setLoading(true);
      await axios
        .get(`/get-banner`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setBanner(res?.data?.data?.banners);
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    !isCustom && fetchBanner();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {isCustom ? (
        <div className={className} style={style}>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            className="carousel-custom"
            style={style}
          >
            {arrCustom?.map((data, key) => {
              return (
                <Carousel.Item key={key} className="position-relative">
                  <Image
                    className="d-block w-100"
                    src={data?.url_banner}
                    alt=""
                    style={style}
                  />
                  {data?.caption && (
                    <Carousel.Caption
                      className="position-absolute w-100 h-100 d-flex align-items-end py-0"
                      style={{
                        background:
                          "linear-gradient(176deg, rgba(78, 78, 78, 0) 39.04%, rgba(78, 78, 78, 0) 39.04%, #3b3b3b 89.08%)",
                        left: 0,
                        bottom: 0,
                        borderRadius: "15px",
                      }}
                    >
                      <p
                        className=" ps-4 w-100 lh-1 font-xssss text-white text-start pb-2"
                        style={{ marginBottom: "10px" }}
                      >
                        {data?.caption}
                      </p>
                    </Carousel.Caption>
                  )}
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="py-8 bg-gray-100">
          <Container>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <div className={className}>
                  <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    // className="carousel-custom"
                    style={style}
                  >
                    {banners?.map((data) => {
                      return (
                        <Carousel.Item
                          key={data?.id}
                          className=""
                          style={style}
                        >
                          {data?.address?.length === 0 ? (
                            <Image
                              className="w-100 h-100"
                              src={data?.url_banner}
                              variant="top"
                              alt=""
                              style={style}
                            />
                          ) : (
                            <Link to={data?.address} target="_blank">
                              <Image
                                className="w-100 h-100"
                                src={data?.url_banner}
                                variant="top"
                                alt=""
                                style={style}
                              />
                            </Link>
                          )}
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>
              </>
            )}
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default CarouselPart;
