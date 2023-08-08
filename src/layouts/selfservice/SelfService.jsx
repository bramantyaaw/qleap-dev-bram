import { Fragment } from "react";
import SelfServiceHeader from "../../layouts/selfservice/SelfServiceHeader";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";

const SelfService = () => {
  return (
    <HelpCenterLayout>
      <Fragment>
        <SelfServiceHeader />
      </Fragment>
    </HelpCenterLayout>
  );
};
export default SelfService;
