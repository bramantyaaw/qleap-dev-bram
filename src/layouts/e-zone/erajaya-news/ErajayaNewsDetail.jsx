import React, { Fragment, useEffect, useState } from "react";
import NewsArticle from "../../../components/ezone/new/components/NewsArticle";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";
import NewEzoneLayout from "../../../components/ezone/new/Header/NewEzoneLayout";

const ErajayaNewsDetail = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [arrDetailNews, setArrDetailNews] = useState([]);

  const [modalLoading, setModalLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const handleFetchDetailNews = async () => {
    try {
      setModalLoading(true);
      await axios
        .get(`/ezone/read-news/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setModalLoading(false);
          if (data?.status === 200) {
            setArrDetailNews(data?.data?.data);
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

  useEffect(() => {
    handleFetchDetailNews();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <div className="bg-gray-100">
      <Fragment>
        <NewEzoneLayout>
          <div className="py-3 container">
            {modalLoading && (
              <div className="d-flex justify-content-center pt-14">
                <LoadingComponent className="mb-3" />
              </div>
            )}
            <main
              className="bg-wrapper d-flex flex-column flex-lg-row pt-14 pt-lg-9 "
              style={{ maxHeight: "100%" }}
            >
              <NewsArticle arrDetailNews={arrDetailNews} />
            </main>
          </div>
        </NewEzoneLayout>
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

export default ErajayaNewsDetail;
