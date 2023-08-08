import React from "react";
import EdigitalLayout from "../../home/EDigitalLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const ContentManagement = () => {
  return (
    <EdigitalLayout className="p-0">
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8", height: "fitContent" }}
        src={`https://qleap.erajaya.com/qleapci/app/cm/shortener/index`}
        className="w-100"
      />
    </EdigitalLayout>
  );
};

export default ContentManagement;
