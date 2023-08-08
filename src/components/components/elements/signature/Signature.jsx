import { Fragment, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const Signature = () => {
  const sigCanvas = useRef();
  const [imageURL, setImageURL] = useState(null);

  const create = () => {
    const URL = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    setImageURL(URL);
    //setOpenModal(false);
  };

  return (
    <Fragment>
      <Row>
        <SignatureCanvas
          penColor="black"
          canvasProps={{
            // width: 500,
            // height: 200,
            className: "sigCanvas",
          }}
          ref={sigCanvas}
        />
      </Row>
      <Button onClick={() => create()}>Save</Button>
      <Button onClick={() => sigCanvas.current.clear()}>Clear</Button>
    </Fragment>
  );
};

export default Signature;
