import React, { useState, useEffect } from "react";
import TicketHero from "../../components/components/dashboard/ticketing/hero/TicketHero";
import GKStepper from "../../components/components/dashboard/ticketing/elements/stepper/GKStepper";
import RequestType from "../../components/components/dashboard/ticketing/steps/RequestType";
import SubmitData from "../../components/components/dashboard/ticketing/steps/SubmitData";
import GPSAbsensi from "../../components/components/dashboard/ticketing/steps/GPSAbsensi";
import Superior from "../../components/components/dashboard/ticketing/steps/Superior";
import PenggantianIDCard from "../../components/components/dashboard/ticketing/steps/PenggantianIDCard";
import MainNavbar from "../navbars/MainNavbar";
import Footer from "../footers/Footer";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";

const Ticketing = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedIdIssue, setSelectedIdIssue] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const text = "Problems related to ticketing";

  const next = () => {
    setCurrentStep(currentStep === 2 ? 1 : currentStep + 1);
  };
  const previous = () => {
    setCurrentStep(currentStep === 1 ? 1 : currentStep - 1);
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  const conditionalSteps = (value) => {
    switch (value) {
      case "1":
        return (
          <SubmitData
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
          <GPSAbsensi
            next={next}
            previous={previous}
            token={token}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
            value={value}
          />
        );
      case "3":
        return (
          <Superior
            previous={previous}
            next={next}
            token={token}
            uid={uid}
            setSuccess={setSuccess}
            text={text}
          />
        );
      // case "31":
      //   return (
      //     <PenggantianIDCard
      //       previous={previous}
      //       next={next}
      //       token={token}
      //       uid={uid}
      //       setSuccess={setSuccess}
      //       text={text}
      //     />
      //   );
      default:
        return null;
    }
  };

  const steps = [
    {
      id: 1,
      title: "Request Type",
      content: (
        <RequestType
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
      title: "Submit Data",
      content: conditionalSteps(selectedIdIssue),
    },
  ];

  return (
    <>
      <HelpCenterLayout>
        <div className="ticket-wrapper">
          <TicketHero
            classText="header-wrapper "
            title="Ticketing"
            desc="Ticketing adalah sistem untuk membantu karyawan dalam solving
                issue"
          />
          <GKStepper
            currentStep={currentStep}
            steps={steps}
            success={success}
            text1="Home"
            text2="Help Center"
            text4="Submit Ticket"
            link1="/"
            link2="/help"
            textsucc1="Yeah, your ticketing application has been successfully submitted to
              the relevant PIC. To find out the status of your ticketing submission
              process, you can check by going to the page"
            spansucc1="“Help Center--> Ticketing Status”"
            textsucc2="If you have problems, you can go to the page"
            spansucc2="Help Center"
            linksucc="/my-submission/ticket"
          />
        </div>
      </HelpCenterLayout>
    </>
  );
};

export default Ticketing;
