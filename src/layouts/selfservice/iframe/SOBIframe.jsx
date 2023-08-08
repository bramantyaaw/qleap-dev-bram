import React from "react";
import EUnivLayout from "../../navbars/EUnivLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";
import MainLayout from "../../home/MainLayout";

const SOBIframe = () => {
  return (
    <MainLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci/corporateuniversity/school/view/b`}
        className="w-100 pt-0 pt-md-8"
      />
    </MainLayout>
  );
};

export default SOBIframe;
