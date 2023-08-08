import React from "react";
import HelpCenterLayout from "../HelpCenterLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const MemoIframe = () => {
  // MemoMain.jsx
  return (
    <HelpCenterLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci/plans/selfservice/memo`}
        className="w-100"
      />
    </HelpCenterLayout>
  );
};

export default MemoIframe;
