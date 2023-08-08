import React from "react";
import EUnivLayout from "../../navbars/EUnivLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";
import MainLayout from "../../home/MainLayout";

const OurInsIframe = () => {
  return (
    // <EUnivLayout>
    <MainLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci/courses/instructor`}
        className="w-100 pt-2 pt-md-9"
      />
    </MainLayout>
    // </EUnivLayout>
  );
};

export default OurInsIframe;
