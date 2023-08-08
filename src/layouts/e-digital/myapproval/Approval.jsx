import { Fragment, useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Form, Nav, Row, Tab } from "react-bootstrap";
import ListApproval from "./ListApproval";
import EdigitalLayout from "../../home/EDigitalLayout";
import { useSelector } from "react-redux";
import { getListApproval } from "../../../redux/action/epcnAction";
import { whatsappAction } from "../../../redux/action/profileAction";
import { useDispatch } from "react-redux";
import FormSelect from "../../../components/components/elements/form-select/FormSelect";
import { CMSDashboard } from "../../../components/components/dashboard/cms/CMSDashboard";
import NotifSuccessModal from "../../../components/components/elements/modal/NotifSuccessModal";
import { FlatPickr } from "../../../components/components/dashboard/ticketing/elements/date/FlatPickr";
import GeneralApproval from "./GeneralApproval";
import axios from "axios";
import FlatPickrRange from "../../../components/components/dashboard/ticketing/elements/date/FlatPickrRange";

export const Approval = () => {
  const dispatch = useDispatch();
  const { listApprovalData } = useSelector((state) => state.epcnReducer);
  const [show, setShow] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubmissionType, setSelectedSubmissionType] = useState("");
  const [status, setStatus] = useState("");

  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  const dataList = listApprovalData?.data?.data;
  const master = dataList?.summary;
  const transaction = dataList?.transaction;

  const handleClick = async () => {
    try {
      const { data } = await dispatch(whatsappAction());

      if (data?.status === true) {
        setShow(true);
      }
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    dispatch(getListApproval(token, uid, status));
  }, [status]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  const programOptions = [
    { value: "E-PCN", label: "E-PCN" },
    { value: "epp", label: "EPP" },
  ];

  const statusOptions = [
    { value: "Open", label: "Open" },
    { value: "Full Approved", label: "Full Approve" },
    { value: "In Progress", label: "In Progress" },
    { value: "Reject", label: "Rejected" },
  ];

  return (
    <EdigitalLayout>
      <Fragment>
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-2 mb-4 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Approval</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/main-desk">E-Digital</Breadcrumb.Item>
                  <Breadcrumb.Item active>Approval</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </Col>
        </Row>

        <div className="mt-3 mb-0">
          <CMSDashboard data={master} setStatus={setStatus} />
        </div>
        <Row>
          <Col>
            <div className="d-flex justify-content-end">
              <div className="pe-md-2">
                {/* <Button onClick={handleClick} size="sm" variant="info">
                Reminder
              </Button> */}
              </div>
              <div className="pe-md-2">
                {/* Program select */}
                {/* <Form.Group className="mb-3">
                <FormSelect
                  options={programOptions}
                  placeholder="All Program Type"
                  className="form-select-sm"
                  value={selectedSubmissionType}
                  onChange={(e) => setSelectedSubmissionType(e.target.value)}
                />
              </Form.Group> */}
              </div>
              <div className="pe-md-2">
                {/* Program select */}
                {/* <Form.Group className="mb-3">
                <FormSelect
                  options={statusOptions}
                  placeholder="Status"
                  className="form-select-sm"
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                />
              </Form.Group> */}
              </div>
              {/* Status select */}
              <div className="pe-md-0">
                <Form.Group className="mb-4">
                  {/* <Form.Control
                    // as={FlatPickr}
                    placeholder="Select Date"
                    options={statusOptions}
                    className="form-select-sm"
                  /> */}
                  <FlatPickrRange
                    className="py-2 ps-3 pe-6 wc-250 "
                    top="10.3"
                    right="12"
                    setNewStartDate={setNewStartDate}
                    setNewEndDate={setNewEndDate}
                    placeholderText="Select Date"
                  />
                </Form.Group>
              </div>
            </div>
          </Col>
        </Row>
        <GeneralApproval
          approval_data={transaction}
          selectedItem={selectedItem}
          selectedSubmissionType={selectedSubmissionType}
          newStartDate={newStartDate}
          newEndDate={newEndDate}
        />
        <NotifSuccessModal
          show={show}
          setShow={setShow}
          text="The reminder has sent!"
        />
      </Fragment>
    </EdigitalLayout>
  );
};
