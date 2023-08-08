import React from "react";
import EdigitalLayout from "../../home/EDigitalLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const Managerial = () => {
  return (
    <>
      <EdigitalLayout className="p-0" withoutFooter>
        <IframeLinkOutside
          style={{ backgroundColor: "#f5f4f8", height: "fitContent" }}
          // height="calc(100vh + 40px)"
          src={`https://qleap.erajaya.com/qleapci/managerial/main`}
          className="w-100"
        />
      </EdigitalLayout>
    </>
  );
};

export default Managerial;
