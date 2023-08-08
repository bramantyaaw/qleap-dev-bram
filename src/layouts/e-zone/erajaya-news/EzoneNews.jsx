import React, { Fragment, useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import CourseCard from "../../../components/ezone/new/components/CourseCard";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import HeaderILEADNewsImg from "../../../assets/ezone/images/png/header-ilead-news.png";
import axios from "axios";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";

const EzoneNews = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [arrNews, setNews] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFetchEzoneNews = async () => {
    try {
      setModalLoading(true);
      await axios
        .get(`/ezone/get-news/${page}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;
            if (newData !== null) {
              setTotalPage(newData?.total_page);
              setNews(newData?.news);
            }
          } else if (data?.status === 404) {
            setErrorModal(true);
            setErrorMessage(data?.data);
          } else {
            setErrorModal(true);
            setErrorMessage(data?.data?.message);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const changePage = ({ selected }) => {
    // setPageNumber(selected);
    setPage(selected + 1);
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    handleFetchEzoneNews();
    // eslint-disable-next-line
  }, [, page]);

  return (
    <div>
      <Fragment>
        <RightSideEzoneComponent>
          <div className="mb-5">
            <Image
              src={HeaderILEADNewsImg}
              className="w-100 border img-fluid"
              style={{ borderRadius: "9px" }}
            />
          </div>
          <Row className="pe-2 pe-md-0">
            {arrNews?.map((data, index) => {
              return (
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  key={index}
                  className="pe-1 pe-md-0"
                >
                  <CourseCard
                    item={data}
                    viewby="list"
                    link={`/ezone/news/${data?.id}`}
                  />
                </Col>
              );
            })}
            {modalLoading && <LoadingComponent className="mb-3" />}
            {arrNews ? (
              <ReactPaginate
                previousLabel={<ChevronLeft size="14px" />}
                nextLabel={<ChevronRight size="14px" />}
                pageCount={totalPage}
                onPageChange={changePage}
                containerClassName={"justify-content-center mb-0 pagination"}
                previousLinkClassName={"page-link mx-1 rounded"}
                nextLinkClassName={"page-link mx-1 rounded"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link mx-1 rounded"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"active"}
              />
            ) : (
              <p className="text-secondary">No Data</p>
            )}
          </Row>
        </RightSideEzoneComponent>
      </Fragment>

      {errorModal && (
        <NotifSuccessModal show={errorModal} setShow={setErrorModal}>
          <ErrorAlert
            setState={setErrorModal}
            text1={errorMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
    </div>
  );
};

export default EzoneNews;
