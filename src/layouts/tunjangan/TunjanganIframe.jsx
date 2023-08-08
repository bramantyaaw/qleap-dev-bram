import React from "react";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import IframeLinkOutside from "../../components/components/marketing/specialty/IframeLinkOutside";

const TunjanganIframe = () => {
  // file tunjangan.jsx
  return (
    <HelpCenterLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        src={`https://qleap.erajaya.com/qleapci/app/tunjangan`}
        className="w-100"
      />
    </HelpCenterLayout>
  );
};

export default TunjanganIframe;
