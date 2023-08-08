import { Fragment } from "react";
import { Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import TicketHero from "../../components/components/dashboard/ticketing/hero/TicketHero";
import GKBreadcrumb from "../../components/components/marketing/common/breadcrumb/GKBreadcrumb";
import HeaderBreadcrumb from "../../components/components/marketing/pages/help-center/HeaderBreadcrumb";
import NavbarHelpCenter from "../navbars/NavbarHelpCenter";
import Footer from "../footers/Footer";

export const SelfServiceTemplate = (props) => {
  const location = useLocation();

  const title = [
    {
      link: "/self-service/koperasi",
      title: "Koperasi",
      description: "Here is your koperasi letter",
    },
    {
      link: "/self-service/digital-letter",
      title: "Digital Letter",
      description: "You can print out your most needed letters here !",
    },
  ];

  const breadcrumb = [
    {
      page: "Home",
      link: "/",
    },
    {
      page: "Self Service",
      link: "/self-service",
    },
  ];

  const titleName = title?.map((value) => {
    if (value?.link.toString() === location.pathname.toString()) {
      breadcrumb.push({ page: value.title, link: value.link });

      return value.title;
    }
  });

  const description = title?.map((value) => {
    if (value?.link.toString() === location.pathname.toString()) {
      return value.description;
    }
  });

  return (
    <div className="w-100 h-100 p-0">
      <NavbarHelpCenter className="bg-colors-default" />
      {/* <div className="ticket-wrapper">
        <TicketHero
          classText="tunjangan-header"
          title={titleName}
          desc={description}
        />
        <Fragment>
          <div className="pb-12 fragment-body">
            <div className="stepper bg-wrapper">
              <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                <GKBreadcrumb breadcrumb={breadcrumb} />
                <div className="stepper">
                  <div className="bg-wrapper">
                    <Fragment>{props.children}</Fragment>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </Fragment>
      </div> */}
      {props.children}
      <Footer />
    </div>
  );
};
