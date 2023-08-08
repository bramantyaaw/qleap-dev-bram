import React from "react";
import { Link } from "react-router-dom";
import RightSideEzoneComponent from "../../../components/ezone/new/components/RightSideEzoneComponent";
import ProfileBackground from "../../../assets/images/background/background_profile.svg";
import Footer from "../../footers/Footer";

const IleadMenu = ({ children }) => {
  const route = [
    {
      name: "ILEAD Diagnostic",
      link: "/ezone/ilead/diagnostic",
    },
    {
      name: "ILEAD Room",
      link: "/ezone/ilead/room",
    },
    {
      name: "ILEAD Insight",
      link: "/ezone/ilead/insight",
    },
  ];
  return (
    <RightSideEzoneComponent>
      <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3  overflow-hidden px-0">
        <div
          className="py-2 px-6 rounded-top-md position-relative w-100"
          style={{
            background: `url(${ProfileBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <h1 className="mb-0 text-white" style={{ fontWeight: "700" }}>
            ILEAD Zone
          </h1>
          <p className="mb-0 text-white">
            Here you can study learning about ILEAD and you can also do ILEAD
            quiz
          </p>
        </div>

        <div
          className="card-body d-block w-100 shadow-none mb-0 p-0 border-top-xs text-uppercase"
          style={{ fontWeight: "700", backgroundColor: "#E2E8F0" }}
        >
          <ul
            className="nav nav-tabs h55 d-flex product-info-tab border-bottom-0 ps-6"
            id="pills-tab"
            role="tablist"
          >
            {route?.map((data) => {
              return (
                <li
                  className={`list-inline-item me-5 ${
                    data?.link === window.location.pathname ? "active " : ""
                  }`}
                >
                  <Link
                    to={data?.link}
                    className={`fw-700 font-xssss pt-3 pb-1 ls-1 d-inline-block ${
                      data?.link === window.location.pathname ||
                      (data?.link === "/ezone/ilead/insight" &&
                        window.location.pathname ===
                          "/ezone/ilead/insight/detail")
                        ? "border-bottom border-primary text-primary"
                        : "text-kinda-dark"
                    }`}
                    data-toggle="tab"
                  >
                    {data?.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {children}
    </RightSideEzoneComponent>
  );
};

export default IleadMenu;
