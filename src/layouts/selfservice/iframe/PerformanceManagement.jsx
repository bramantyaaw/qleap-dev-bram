import React from "react";
import EdigitalLayout from "../../home/EDigitalLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const PerformanceManagement = () => {
  return (
    <EdigitalLayout className="p-0">
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8", height: "fitContent" }}
        src={`https://qleap.erajaya.com/qleapci/app/pms/home`}
        className="w-100"
      />
    </EdigitalLayout>
  );
};

export default PerformanceManagement;
