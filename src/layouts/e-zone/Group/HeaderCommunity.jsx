import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ModalMemberCommunity from "./ModalMemberCommunity";

const HeaderCommunity = ({ setIsClickJoin, isClickJoin, arrData }) => {
  const [modal, setModal] = useState(false);

  return (
    <>
      {arrData?.map((data, id) => {
        return (
          <div
            key={id}
            className="card d-block border-0 shadow-xss  overflow-hidden mb-0 pt-3 px-3 position-relative rounded-4"
          >
            <div
              // className="card-body position-relative p-0 rounded-4"
              className="card-body position-relative bg-image-cover bg-image-center  rounded-4"
              style={{
                backgroundImage: `url(${data?.community_banner})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "200px",
              }}
            ></div>
            <div className="card-body w-100 pl-10 pb-0  pe-0 pt-0 text-left">
              <figure
                className="avatar position-absolute w75 z-index-1 left-15 ms-3"
                style={{ marginTop: `-40px`, height: "75px" }}
              >
                <img
                  src={data?.community_pic}
                  alt=""
                  className="float-right bg-white rounded-circle w-100 "
                />
              </figure>
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center align-items-start">
                <div className="pb-0 pb-sm-4">
                  <h2
                    className="fw-700 font-xss mt-3 mb-0"
                    style={{ fontWeight: "700" }}
                  >
                    {data?.community_name}
                  </h2>
                  <p
                    className="fw-500 font-xsssss text-gray-500 mt-0 mb-0 lh-3"
                    style={{ fontWeight: "600" }}
                    role="button"
                    onClick={() => setModal(true)}
                  >
                    {data?.member} {data?.member > 1 ? "members" : "member"}
                  </p>
                </div>
                {data?.isJoined === 0 && (
                  <span className="d-flex align-items-center pb-4 pb-sm-0 mt-2 mt-sm-0">
                    <Button
                      onClick={() => setIsClickJoin(true)}
                      className={`text-center px-3 px-sm-2 py-3 text-uppercase lh-24 ls-3 d-inline-block rounded font-xsssss fw-700 ls-lg text-white ${
                        isClickJoin
                          ? "bg-kinda-grey border-kinda-grey"
                          : "bg-primary border-primary"
                      }`}
                      disabled={isClickJoin ? true : false}
                    >
                      Join community
                    </Button>
                  </span>
                )}
              </div>
            </div>
            {modal && (
              <ModalMemberCommunity
                setShow={setModal}
                show={modal}
                arrData={data?.members}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default HeaderCommunity;
