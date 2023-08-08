// import { useEffect, useState } from "react";
// import { Card, Row } from "react-bootstrap";
// import { EmbedPdf } from "../../../components/components/elements/embed/EmbedPdf";
// import { SelfServiceTemplate } from "../SelfServiceTemplate";
// import { LetterForm } from "./LetterForm";
import IframeLinkOutside from "../../../components/components/marketing/specialty/IframeLinkOutside";
import HelpCenterLayout from "../../helpcenter/HelpCenterLayout";

export const DigitalLetter = () => {
  // const [token, setToken] = useState(localStorage.getItem("access_token"));
  // const [uid, setUid] = useState(localStorage.getItem("uid"));

  // const [letterData, setLetterData] = useState([]);
  // const [letterName, setLetterName] = useState("");

  // useEffect(() => {
  //   setToken(localStorage.getItem("access_token"));
  //   setUid(localStorage.getItem("uid"));
  // }, [localStorage]);

  return (
    <HelpCenterLayout>
      {/* <Card className="mb-3 border-0">
        <Card.Body className="px-4">
          <LetterForm
            token={token}
            uid={uid}
            getItem={setLetterData}
            setLetterName={setLetterName}
          />
          <hr />
          <Row>
            {letterData && (
              <>
                <a
                  className="btn btn-primary mb-5"
                  href={`data:application/pdf;base64,${letterData}`}
                  download={letterName?.replace(/ /g, "_") + `.pdf`}
                >
                  <i className="fa fa-download" />
                  &nbsp; Generate PDF
                </a>
                <EmbedPdf base64STR={letterData} />
              </>
            )}
          </Row>
        </Card.Body>
      </Card> */}
      <IframeLinkOutside
        style={{ backgroundColor: "#f5f4f8" }}
        height="calc(100vh + 40px)"
        src={`https://qleap.erajaya.com/qleapci/react_frame/selfservice/digitalletter`}
        className="w-100"
      />
    </HelpCenterLayout>
  );
};
