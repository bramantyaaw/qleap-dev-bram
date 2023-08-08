import React from "react";
import { Modal, Button } from "react-bootstrap";
import ButtonBadgePIC from "../../../../layouts/database-admin/ticket/elements/ButtonBadgePIC";
import LoadingComponent from "../../elements/loading/LoadingComponent";

const ModalPICTicket = (props) => {
  const {
    setShow,
    show,
    buttonClassName,
    onClick,
    title,
    className,
    detail,
    isOneButton,
    loading,
  } = props;

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header>
        <Modal.Title className={`text-darkest fw-bold ${className}`}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {isOneButton ? (
          loading ? (
            <LoadingComponent />
          ) : (
            <ButtonBadgePIC
              text="Yes"
              className="mb-0"
              onClick={(e) => onClick(e, detail)}
            />
          )
        ) : (
          <>
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Button
                  variant="outline-primary"
                  onClick={() => setShow(false)}
                  className={buttonClassName}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={(e) => onClick(e, detail)}
                  className={buttonClassName}
                >
                  Yes
                </Button>
              </>
            )}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPICTicket;
