import { React, Fragment, useEffect } from "react";
import { Button, Card, Image, Modal, ListGroup } from "react-bootstrap";
import { ProfileLayout } from "../ProfileLayout";
import { useState } from "react";
import { CardPopup } from "./CardPopup";
import { useSelector, useDispatch } from "react-redux";
import { eraFamilyAction } from "../../../redux/action/profileAction";
import MainLayout from "../../home/MainLayout";

export const EraFamily = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (itemId) => {
    setSelectedItemId(itemId);
    setShow(true);
  };

  const dispatch = useDispatch();
  const { erafamilyData } = useSelector((state) => state.profileReducer);
  const erafamData = erafamilyData?.data?.data;

  useEffect(() => {
    const win = window.localStorage;
    const token = win.getItem("access_token");
    const uid = win.getItem("uid");

    dispatch(eraFamilyAction(token, uid));
  }, []);

  return (
    <MainLayout>
      <ProfileLayout className="bg-wrapper">
        {/* Page Content section */}
        {/* Card */}
        <Card className="border-0">
          <Card.Header>
            <h3 className="mb-0">Card Information</h3>
            <span>These are the cards you have and can use</span>
          </Card.Header>
          <Card.Body className="pt-2">
            {/* List group */}
            <ListGroup variant="flush">
              {erafamData &&
                erafamData.map((data) => {
                  return (
                    <ListGroup.Item key={data.CardId} className="px-0 pb-3">
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <Image
                            src={data.CardImg}
                            alt=""
                            className="img-4by3-md me-3 rounded"
                          />
                          <div>
                            <h5 className="mb-0">{data.CardName}</h5>
                            <p className="mb-0 fs-6">{data.CardDesc}</p>
                          </div>
                        </div>
                        <div className="d-flex">
                          <Button
                            variant="outline-primary"
                            size="xs"
                            className="btn btn-xs btn-outline-primary me-1"
                            onClick={() => handleShow(data)}
                          >
                            View Detail
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  );
                })}
              {!erafamData && (
                <h5 className="text-muted pt-2 fst-italic">
                  No Data to Display
                </h5>
              )}
            </ListGroup>
          </Card.Body>
        </Card>
        {/* <!-- Card --> */}
        {/* Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedItemId?.CardName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CardPopup itemId={selectedItemId} />
          </Modal.Body>
        </Modal>
        {/* <!-- Modal --> */}
        {/* end of Page Content section*/}
      </ProfileLayout>
    </MainLayout>
  );
};
