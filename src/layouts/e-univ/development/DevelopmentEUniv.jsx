import React, { Fragment } from "react";
import MainNavbar from "../../navbars/MainNavbar";
import TicketPage from "../../../components/components/dashboard/ticketing/hero/TicketPage";
import { Link } from "react-router-dom";
import EUnivLayout from "../../navbars/EUnivLayout";

const DevelopmentEUniv = ({
  children,
  text1,
  text2,
  text4,
  link1,
  reverse,
}) => {
  return (
    <Fragment>
      <EUnivLayout>
        <div className="bg-gray-100" style={{ minHeight: "700px" }}>
          <div className="pt-2 d-flex px-4 flex-column flex-sm-row justify-content-between align-items-center mb-4 mb-sm-0 content-course">
            <TicketPage
              text2={text2}
              text1={text1}
              text4={text4}
              link1={link1}
              reverse={reverse}
            />
            <Link to="/e-univ">Back to Homepage E-University</Link>
          </div>

          {children}
        </div>
      </EUnivLayout>
    </Fragment>
  );
};

export default DevelopmentEUniv;
