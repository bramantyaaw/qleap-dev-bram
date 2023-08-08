import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button } from "react-bootstrap";
import Illustration from "../../assets/images/svg/onboard-illustration.svg";
// import CardOnBoard from "../../components/components/dashboard/e-univ/on-board/CardOnBoard";
// import SoftIcon from "../../assets/images/svg/onboard-softcompetition-icon.svg";
// import TechnicalIcon from "../../assets/images/svg/onboard-technical-icon.svg";
// import DigitalIcon from "../../assets/images/svg/onboard-digital-icon.svg";
// import UpgradeExploreCard from "../../components/components/dashboard/e-univ/on-board/UpgradeExploreCard";

const NewJoiner = ({ className }) => {
  return (
    <div className={className}>
      <Card className="first-card-oboard">
        <Card.Body className="px-4 pt-4 pb-0 d-flex flex-xl-row flex-column w-100 align-items-end justify-content-center">
          <div className="leftside-onboard w-100 w-xl-70">
            <h1 className="fw-bold">Halo</h1>
            <p className="text-secondary ">
              Selamat kamu telah bergabung sebagai NEM, Klik
              <span className="fw-bold"> “Start On Bording” </span>
              untuk mulai
            </p>
          </div>
          <Image
            src={Illustration}
            className="rightside-onboard  w-100 w-xl-30"
          />
        </Card.Body>
      </Card>
      <Card className="d-flex flex-row justify-content-end align-items-center p-0 hero-onboard rounded-bottom py-2">
        <Link to="/e-univ/onboard">
          <Button
            variant="outline-primary"
            style={{
              fontSize: "10px",
              height: "34px",
              width: "179px",
              borderRadius: "8px",
            }}
            className="bg-white py-1 px-3 me-4 btn-start-boarding"
          >
            START ON BOARDING
          </Button>
        </Link>
      </Card>
      {/* <div className="mt-5 d-flex align-items-center justify-content-between flex-column flex-xl-row w-100">
        <CardOnBoard
          icon={SoftIcon}
          title="Soft Competency"
          text1="Mempelajari mengenai"
          span="Soft Skill"
          text2="dan penerapannya di perusahaan"
        />
        <CardOnBoard
          icon={TechnicalIcon}
          className="mx-0 mx-xl-3"
          title="Technical Competency"
          text1="Mempelajari"
          span="Technical Skill"
          text2="dan cara mengenai pengenalan produk"
        />
        <CardOnBoard
          icon={DigitalIcon}
          title="Digital Competency"
          text1="Mempelajari"
          span="Digital Knowledge"
          text2="untuk membuat pekerjaan lebih sistematis"
        />
      </div>
      <div>
        <p className="text-center text-kinda-light-dark">
          Upgrade and Explore more your skill here
        </p>
        <UpgradeExploreCard />
      </div> */}
    </div>
  );
};

export default NewJoiner;
