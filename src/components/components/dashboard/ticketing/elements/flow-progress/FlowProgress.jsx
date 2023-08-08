import React, { useState } from "react";
import { Image } from "react-bootstrap";
import RejectReason from "../modal/RejectReason";

const FlowProgress = ({ src, text1, text2, status, textcolor, date }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="d-flex align-items-center w-100">
      <Image src={src} />
      <div className="flow-progress-name d-flex flex-column lh-sm ms-3 w-100">
        <div className="d-flex lh-sm justify-content-between w-100">
          <p className="text1">{text1}</p>
          {date ? (
            <span className="text-secondary">{date}</span>
          ) : (
            <p className={`text2 ${textcolor}`}>{status}</p>
          )}
        </div>
        {!date && (
          <>
            {status === "Reject" ? (
              <p
                role="button"
                className="text3 reject text-primary text-decoration-underline"
                onClick={() => setShow(true)}
              >
                Reject Reason
              </p>
            ) : (
              <p className="text3">{text2}</p>
            )}
            <RejectReason setShow={setShow} show={show} />
          </>
        )}
      </div>
    </div>
  );
};

export default FlowProgress;
