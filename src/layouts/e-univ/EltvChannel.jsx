import React, { Fragment, useEffect, useState } from "react";
import EUnivLayout from "../navbars/EUnivLayout";

export const EltvChannel = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <div>
      <Fragment>
        <EUnivLayout>
          <div className="pb-0">
            <iframe
              src={` https://qleap.erajaya.com/qleapci/react_frame/learningtv?uid=${uid}`}
              allow="fullscreen"
              title="iframe-modal"
              className=""
              style={{
                width: "100%",
                height: "100vh",
              }}
            >
              <add name="X-Frame-Options" value="sameorigin" />
            </iframe>
          </div>
        </EUnivLayout>
      </Fragment>
    </div>
  );
};
