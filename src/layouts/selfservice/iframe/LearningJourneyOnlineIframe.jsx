import React from "react";
import EUnivLayout from "../../navbars/EUnivLayout";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";

const LearningJourneyOnlineIframe = () => {
  return (
    <EUnivLayout>
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci/courses/courses/learningjourney`}
        className="w-100"
      />
    </EUnivLayout>
  );
};

export default LearningJourneyOnlineIframe;
