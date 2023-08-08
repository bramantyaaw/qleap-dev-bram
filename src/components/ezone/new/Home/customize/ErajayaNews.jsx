import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../../components/elements/loading/LoadingComponent";
import { Image } from "react-bootstrap";

const ErajayaNews = ({ token }) => {
  const newsArr = [
    {
      headline:
        "Ekspansif! Erajaya (ERAA) Tambah Lebih dari 600 Gerai Tahun Ini",
      time: "2 hr",
    },
    {
      headline:
        "Penjualan Naik, Laba Erajaya Swasembada Susut 5,41 Persen hingga September 2022",
      time: "3 hr",
    },
    {
      headline:
        "BANK INDONESIA PROJECTS 4.5-5.3% ECONOMIC GROWTH AND INFLATION TO RETURN TO THE 3.0%±1% TARGET RANGE IN 2023",
      time: "4 hr",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const handleFetchEzoneNews = async () => {
    try {
      setLoading(true);
      await axios
        .get(`/ezone/get-news/1`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((data) => {
          setLoading(false);
          if (data?.status === 200) {
            const newData = data?.data?.data;
            if (newData !== null) {
              const slice = newData?.news?.slice(0, 3);
              setNews(slice);
            }
          }
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    handleFetchEzoneNews();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4
            className="mb-0 font-xs text-kinda-dark"
            style={{ fontWeight: "600" }}
          >
            ILEAD News
          </h4>
          <Link to="/ezone/news">
            <p className="mb-0 font-xsssss text-decoration-underline">
              See More
            </p>
          </Link>
        </div>
        {news?.map((data, id) => {
          return (
            <div key={id}>
              {id === 0 ? (
                <Link to={`/ezone/news/${data?.id}`}>
                  <div className={`d-flex flex-column`}>
                    <Image
                      src={data?.thumbnail}
                      alt=""
                      className="w-100 rounded"
                    />
                    <p
                      className="mb-0 text-kinda-dark mt-2 "
                      style={{ fontWeight: "600", fontSize: "15px" }}
                    >
                      {data?.title}
                    </p>
                    <div className="mb-3 d-flex justify-content-start">
                      <p className={`text-gray-500 font-xssss mb-0`}>
                        {data?.created_date}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={`/ezone/news/${data?.id}`}>
                  <div
                    className={`d-flex ${
                      news?.length - 1 === id ? "mb-0" : "mb-3"
                    } `}
                  >
                    <Image
                      src={data?.thumbnail}
                      alt=""
                      height={70}
                      width={90}
                      className="rounded"
                    />
                    <div className="d-flex flex-column ms-2">
                      <p
                        className="mb-1 text-kinda-dark font-xssss"
                        style={{ fontWeight: "500" }}
                      >
                        {data?.title}
                      </p>
                      <p className={`text-gray-500 font-xsssss mb-0`}>
                        {data?.created_date}
                      </p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
        {loading && <LoadingComponent />}
      </div>
    </div>
  );
};

export default ErajayaNews;
