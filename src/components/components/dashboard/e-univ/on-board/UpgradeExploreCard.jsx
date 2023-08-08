import React from "react";
import { mdiArrowRight, mdiAccountCashOutline, mdiLaptop } from "@mdi/js";
import { Card } from "react-bootstrap";
import TechnicalExpertIcon from "../../../../../assets/images/svg/onboard-technicalexpert-icon.svg";
import BusinessIcon from "../../../../../assets/images/svg/onboard-business-icon.svg";
import CardBodyUpgrade from "./CardBodyUpgrade";
// import Icon from '@mdi/react';

const UpgradeExploreCard = ({ className, notDisabled }) => {
  return (
    <>
      {notDisabled ? (
        <Card
          className={`mb-3 mb-4 attention-onboard second-card-onboard d-flex flex-column flex-xl-row  ${className} w-100`}
        >
          <CardBodyUpgrade
            src={mdiLaptop}
            srcColor="warning"
            icon={mdiArrowRight}
            title="Digital Savvy Academy"
            text1="Kembangkan"
            span="Technical Skill"
            text2="kamu lewat sertifikasi"
            className="border-end border-kinda-grey pe-3"
            notDisabled
          />
          <CardBodyUpgrade
            src={mdiAccountCashOutline}
            icon={mdiArrowRight}
            srcColor="success"
            title="Business Academy"
            text1="Kembangkan"
            span="Business Academy"
            text2="kamu lewat sertifikasi"
            className="border-top border-xl-0 border-kinda-grey ps-0"
            notDisabled
          />
        </Card>
      ) : (
        <Card
          className={`mb-3 mb-4 attention-onboard second-card-onboard card-onboard d-flex flex-column flex-xl-row  ${className} w-100`}
        >
          <CardBodyUpgrade
            src={TechnicalExpertIcon}
            icon={mdiArrowRight}
            title="Technical Expert"
            text1="Kembangkan"
            span="Technical Skill"
            text2="kamu lewat sertifikasi"
            className="border-end border-kinda-grey"
          />
          <CardBodyUpgrade
            src={BusinessIcon}
            icon={mdiArrowRight}
            title="Business Academy"
            text1="Kembangkan"
            span="Business Academy"
            text2="kamu lewat sertifikasi"
            className="border-top border-xl-0 border-kinda-grey"
          />
        </Card>
      )}
    </>
  );
};

export default UpgradeExploreCard;
