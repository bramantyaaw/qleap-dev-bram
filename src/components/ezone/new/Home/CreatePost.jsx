import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import {
  mdiPencilOutline as CreateIcon,
  mdiImageMultiple as ImageIcon,
} from "@mdi/js";
import { Button, Image } from "react-bootstrap";

const Createpost = () => {
  const [photoProfile, setPhotoProfile] = useState(
    localStorage.getItem("photo")
  );

  useEffect(() => {
    setPhotoProfile(localStorage.getItem("photo"));
    // eslint-disable-next-line
  }, [localStorage]);

  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 ps-4 pt-4 pe-4 pb-3 mb-3">
      <div className="card-body p-0">
        <a
          href="/ezone"
          className="font-xssss fw-600 text-grey-500 card-body p-0 d-flex align-items-center"
        >
          <div className="btn-round-sm font-xs text-primary feather-edit-3 me-2 bg-greylight">
            <Icon path={CreateIcon} size={0.8} />
          </div>
          Create Post
        </a>
      </div>
      <div className="card-body p-0 mt-3 position-relative">
        <div
          className="avatar avatar-md avatar-indicators avatar-online  position-absolute ms-2 mt-1 top-5"
          style={{ height: "30px", width: "30px" }}
        >
          <Image alt="" src={photoProfile} className="rounded-circle" />
        </div>
        <textarea
          name="message"
          className="h100 bor-0 w-100 rounded-xxl p-2 ps-7 font-xssss text-grey-500 fw-500 border-light-md theme-dark-bg"
          cols="30"
          rows="10"
          placeholder="What's on your mind?"
        ></textarea>
      </div>
      <div className="card-body d-flex p-0 mt-0 d-flex justify-content-between align-items-center pt-2">
        <input
          type="file"
          id="uploadFoto"
          accept=".mp4, .jpg, .jpeg"
          className="d-none"
          // onChange={(e) => handleChange(e)}
        />
        <label
          htmlFor="uploadFoto"
          className="d-flex align-items-center font-xssss fw-600 ls-1 text-grey-700 text-dark pe-4 "
          role="button"
        >
          <div className="font-md text-success feather-image me-2 d-flex align-items-start">
            <Icon path={ImageIcon} size={0.8} />
          </div>
          <span className="d-none-xs">Photo/Video</span>
        </label>
        <Button variant="primary" className="py-1 px-3">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Createpost;
