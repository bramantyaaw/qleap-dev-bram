import React from "react";
import HelpCenterLayout from "../../helpcenter/HelpCenterLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const DynamicIframe = ({ route }) => {
  return (
    <HelpCenterLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci${route}`}
        //   className="w-100 px-3 py-4"
      />
    </HelpCenterLayout>
  );
};

export default DynamicIframe;
