import React from "react";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";
import EUnivLayout from "../../navbars/EUnivLayout";
import MainLayout from "../../home/MainLayout";

const OnBoardIframe = () => {
  // <CourseQuetions onboard />
  return (
    // <EUnivLayout>
    <MainLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci/courses/onboarding`}
        className="w-100 pt-2 pt-md-8"
      />
    </MainLayout>
    // </EUnivLayout>
  );
};

export default OnBoardIframe;
