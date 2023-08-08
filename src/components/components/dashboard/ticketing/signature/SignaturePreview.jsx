import React from "react";
import { Form } from "react-bootstrap";
import TextForm from "../elements/text/TextForm";
import SignatureComp from "../elements/signature-comp/SignatureComp";
import ImgSupervisor from "../../../../../assets/images/svg/signature.svg";

const SignaturePreview = () => {
  return (
    <>
      <Form.Group className="pb-2 signature-verif">
        <TextForm text="Tanda Tangan Verifikasi" />
      </Form.Group>
      <Form.Group className="mt-4 d-flex flex-sm-row flex-column justify-content-between">
        <SignatureComp
          src={ImgSupervisor}
          name="Rahmat maulana"
          position="Superior"
          date="24/02/2023"
          className="w-sm-50 w-100"
        />
        <SignatureComp
          // src={ImgSupervisor}
          name="Rahmat maulana"
          position="HCBP"
          date="-"
          className="w-sm-50 w-100 mx-0 mx-sm-3 my-3 my-sm-0"
        />
        <SignatureComp
          // src={ImgSupervisor}
          name="Rahmat maulana"
          position="HC Benefit"
          date="-"
          className="w-sm-50 w-100"
        />
      </Form.Group>
    </>
  );
};

export default SignaturePreview;
