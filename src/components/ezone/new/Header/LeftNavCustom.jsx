import React from "react";
import { Link, useParams } from "react-router-dom";

const LeftNavCustom = ({ navLeftCustom }) => {
  const location = window.location.pathname;
  const { id } = useParams();

  return (
    <nav
      className={`position-fixed nav-custom`}
      style={{
        left: "0",
        top: "80px",
        // padding: "0 15px 0 0",
      }}
    >
      <div className="container ps-0 pe-0">
        <div className="nav-content">
          <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pb-1 mb-2">
            <ul className="mb-1 top-content py-2">
              {navLeftCustom?.map((data, idData) => {
                return (
                  <li key={idData} className="mt-2">
                    <Link
                      to={data?.link}
                      className="nav-content-bttn open-font px-0 mx-2 py-0 h-100"
                      style={{
                        background:
                          (location === data?.link ||
                            (data?.link === "/ezone/community" &&
                              window.location.pathname ===
                                `/ezone/community/${id}`) ||
                            (data?.link === "/ezone/ilead/diagnostic" &&
                              (window.location.pathname ===
                                "/ezone/ilead/room" ||
                                window.location.pathname ===
                                  "/ezone/ilead/insight" ||
                                window.location.pathname ===
                                  "/ezone/ilead/insight/detail"))) &&
                          "rgba(217, 217, 217, .5)",
                        borderRadius: "30px",
                      }}
                    >
                      <i
                        className={`feather-tv btn-round-md me-3 d-flex align-items-center justify-content-center ${
                          data?.title === "ILEAD News"
                            ? "bg-red-gradiant"
                            : data?.title === "Erajaya Communities"
                            ? "bg-light-blue-gradiant"
                            : data?.title === "ILEAD Zone"
                            ? "bg-yellow-gradiant"
                            : "bg-blue-gradiant"
                        }`}
                      >
                        <div className="text-white d-flex align-items-center justify-content-center">
                          {data?.icon}
                        </div>
                      </i>
                      <span>{data?.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LeftNavCustom;
