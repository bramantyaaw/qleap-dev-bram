import React, { Fragment } from "react";
import { Col, Card, Row } from "react-bootstrap";
import TicketHero from "../../components/components/dashboard/ticketing/hero/TicketHero";
import TicketPage from "../../components/components/dashboard/ticketing/hero/TicketPage";
import DetailPengajuan from "./DetailPengajuan";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import ProgressDetailTunjangan from "./ProgressDetailTunjangan";

const DetailTicketTunjangan = () => {
  return (
    <div className="w-100 h-100">
      <HelpCenterLayout>
        <div className="ticket-wrapper">
          <TicketHero
            classText="tunjangan-header"
            title="Tunjangan Suka Duka"
            desc="Tunjangan ini merupakan santunan yang diberikan perusahaan atas peristiwa sukacita maupun dukacita bagi karyawan"
          />
          <Fragment>
            <div className="pb-12 fragment-body">
              <div className="stepper">
                <Col lg={{ span: 10, offset: 1 }} md={12} sm={12}>
                  <TicketPage
                    text1="My Submit"
                    text4="View Detail"
                    link1="/my-submission"
                  />
                  <div className="d-flex flex-column flex-md-row w-100">
                    <DetailPengajuan className="w-100 w-md-75" />
                    <ProgressDetailTunjangan className="w-100 w-md-25" />
                  </div>
                </Col>
              </div>
            </div>
          </Fragment>
        </div>
      </HelpCenterLayout>
    </div>
  );
};

export default DetailTicketTunjangan;
