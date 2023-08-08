// import node module libraries
import { Fragment } from "react";

// import sub components
import HeroGradientHeader from "../../layouts/helpcenter/HeroGradientHeader";
import HelpCenterFAQs from "../../layouts/helpcenter/HelpCenterFAQs";
import HelpCenterLayout from "./HelpCenterLayout";

const HelpCenter = () => {
  return (
    <HelpCenterLayout>
      <Fragment>
        {/* hero gradient header with features */}
        <HeroGradientHeader />

        {/* FAQs section  */}
        {/* <HelpCenterFAQs /> */}

        {/* contact / support section */}
        {/* <ContactSupportSection /> */}
      </Fragment>
    </HelpCenterLayout>
  );
};
export default HelpCenter;
