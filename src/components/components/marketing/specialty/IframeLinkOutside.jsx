import React, { useEffect, useState } from "react";

const IframeLinkOutside = ({ src, style, className, height, notCustom }) => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${day}`;

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [, localStorage]);

  const string = `${src};${uid};${today}`;
  const encodedString = window.btoa(string);

  const link = `https://qleap.erajaya.com/qleapci/login/react_frame?auth=${encodedString}`;

  const uidLink = `${src}/${uid}`;

  return (
    <div style={style} className={className}>
      <iframe
        src={notCustom ? uidLink : link}
        title=" "
        className="w-100"
        style={{ border: "none", height: "calc(100vh + 40px)" }}
        sandbox="allow-same-origin allow-scripts allow-downloads allow-popups"
      ></iframe>

      {/* <iframe
        src={notCustom ? uidLink : link}
        title=" "
        className="w-100"
        // style={{ border: "none", height: "calc(100vh + 40px)" }}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
          width: "100%",
          height: "100%",
          border: "none",
          margin: "0",
          padding: "0",
          overflow: "hidden",
          zIndex: "1",
          marginTop: "62px",
        }}
        sandbox="allow-same-origin allow-scripts"
      ></iframe> */}
    </div>
  );
};

export default IframeLinkOutside;
