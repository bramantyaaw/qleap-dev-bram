import React, { useState, useEffect } from "react";
import NavbarHelpCenter from "../navbars/NavbarHelpCenter";
import TicketHero from "../../components/components/dashboard/ticketing/hero/TicketHero";
import GKStepper from "../../components/components/dashboard/ticketing/elements/stepper/GKStepper";
import JenisTunjangan from "../../components/components/dashboard/ticketing/overview-steps/JenisTunjangan";
import FirstMarriage from "../../components/components/dashboard/ticketing/overview-steps/FirstMarriage";
import ChildBorn from "../../components/components/dashboard/ticketing/overview-steps/ChildBorn";
import SorrowComponent from "../../components/components/dashboard/ticketing/overview-steps/SorrowComponent";
import SorrowChild from "../../components/components/dashboard/ticketing/overview-steps/SorrowChild";
import Footer from "../footers/Footer";

const Tunjangan = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIdIssue, setSelectedIdIssue] = useState(0);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const text = "Any problem with the submission ?";

  const next = () => {
    setCurrentStep(currentStep === 2 ? 1 : currentStep + 1);
  };
  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  const conditionalSteps = (value) => {
    switch (value) {
      case "1":
        return (
          <FirstMarriage
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
          />
        );
      case "2":
        return (
          <ChildBorn
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
          />
        );
      case "3":
        return (
          <SorrowComponent
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            title="Detail Tunjangan Dukacita Meninggal Orang Tua Kandung (Ayah)"
            who="Ayah"
          />
        );
      case "4":
        return (
          <SorrowComponent
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            title="Detail Tunjangan Dukacita Meninggal Orang Tua Kandung (Ibu)"
            who="Ibu"
          />
        );
      case "5":
        return (
          <SorrowChild
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
          />
        );
      case "6":
        return (
          <SorrowComponent
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            title="Dukacita Meninggal Mertua (Ayah)"
            who="Mertua (Ayah)"
          />
        );
      case "7":
        return (
          <SorrowComponent
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            title="Dukacita Meninggal Mertua (Ibu)"
            who="Mertua (Ibu)"
          />
        );
      case "9":
        return (
          <SorrowComponent
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            title="Dukacita Meninggal Pasangan (Suami)"
            who="Suami"
          />
        );
      case "10":
        return (
          <SorrowComponent
            next={next}
            previous={previous}
            token={token}
            value={value}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            title="Dukacita Meninggal Pasangan (Istri)"
            who="Istri"
          />
        );
      default:
        return null;
    }
  };

  const steps = [
    {
      id: 1,
      title: "Pilih Jenis Tunjangan",
      content: (
        <JenisTunjangan
          next={next}
          selectedIdIssue={selectedIdIssue}
          setSelectedIdIssue={setSelectedIdIssue}
          token={token}
          uid={uid}
          text={text}
        />
      ),
    },
    {
      id: 2,
      title: "Submit Informasi Data",
      content: conditionalSteps(selectedIdIssue),
    },
  ];
  return (
    <div className="w-100 h-100">
      <NavbarHelpCenter className="bg-colors-default" />
      <div className="ticket-wrapper">
        <TicketHero
          classText="tunjangan-header"
          title="Tunjangan Suka Duka"
          desc="Tunjangan ini merupakan santunan yang diberikan perusahaan atas peristiwa sukacita maupun dukacita bagi karyawan"
        />
        <GKStepper
          currentStep={currentStep}
          steps={steps}
          success={success}
          text1="Home"
          text2="Service"
          text3="Self Service"
          text4="Tunjangan Suka Duka"
          link1="/"
          link2="/help"
          link3="/self-service"
          textsucc1="Selamat Tunjanganmu sudah ter-Submit, jika ingin melihat perkembangan pengajuan ini bisa melihat di :"
          spansucc1="“My Submission --> Self Service --> View Detail”."
          textsucc2="Jika ada kendala, kamu bisa lihat di halaman"
          spansucc2="Help Center"
          linksucc="/my-submission"
        />
      </div>
      <Footer />
    </div>
  );
};

export default Tunjangan;
