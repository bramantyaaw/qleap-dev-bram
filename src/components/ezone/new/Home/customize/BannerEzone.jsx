import React from "react";
import BannerImg from "../../../../../assets/ezone/images/svg/ezonebanner.svg";
import { Image } from "react-bootstrap";

const BannerEzone = () => {
  return (
    <div className="card w-100 shadow-xss rounded-4 border-0 mb-3">
      {/* <div className="card-body d-flex align-items-center p-4">
        <h4 className="fw-700 mb-0 font-xssss text-grey-900">Friend Request</h4>
        <a
          href="/defaultmember"
          className="fw-600 ms-auto font-xssss text-primary"
        >
          See all
        </a>
      </div> */}
      <Image src={BannerImg} alt="banner" className="rounded-4" />
    </div>
  );
};

export default BannerEzone;
