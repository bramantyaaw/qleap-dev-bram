import React, { Fragment, useEffect, useMemo, useState } from "react";
import GKAccordionActions from "../../../../../components/components/marketing/common/accordions/GKAccordionActions";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { AddNewModal } from "../../category/modal/AddNewModal";
import axios from "axios";
import { FlatPickrTime } from "../../../../../components/components/elements/flat-pickr/FlatPickrTime";
import NotifSuccessModal from "../../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../../components/components/elements/modal/ProcessLoadingModal";
import FormSelect from "../../../../../components/components/elements/form-select/FormSelect";
import Pagination from "../../../../../components/components/elements/advance-table/Pagination";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";

export const ListSyllabus = (props) => {
  const { program_id, fetchSilabus, silabus, loadingSyllabus } = props;
  const idProgram = parseInt(program_id, 10);

  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));

  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [flow, setFlow] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  const [searchText, setSearchText] = useState("");

  const filteredData = useMemo(() => {
    let result = silabus || [];
    if (searchText !== "") {
      result = result?.filter((submission) =>
        submission.name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return result;
  }, [silabus, searchText]);

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * itemsPerPage;

  // console.log(pageNumber);
  const dataSliced = filteredData?.slice(
    pageVisited,
    pageVisited + itemsPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleFlowChange = (event) => {
    setFlow(event.target.id);
  };

  const submitSilabus = async () => {
    try {
      setModalLoading(true);
      setDisableButton(true);
      const res = await axios.post(
        "/euniv/submit-syllabus",
        {
          program_id: idProgram,
          uid: uid,
          name: title,
          syllabus_flow: flow,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res?.status === 200) {
        await fetchSilabus();
        setShowAdd(false);
        setModalLoading(false);
        setDisableButton(false);
      } else if (res?.status === 500) {
        setWarning(true);
        setModalLoading(false);
        setDisableButton(false);
        return setWarningMessage(res?.data?.message);
      } else if (res?.status === 429) {
        setWarning(true);
        setModalLoading(false);
        setDisableButton(false);
        return setWarningMessage(
          "Too many request at one moment, please try again later.."
        );
      } else {
        setModalLoading(false);
        setDisableButton(false);
      }
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <Fragment>
      <Card className="rounded-top-left-0 rounded-top-end-0">
        <Row className="p-4 pb-0">
          <Col xl={8} lg={8} md={6} sm={12} className="mb-2 mb-lg-0">
            <Form.Control
              type="text"
              className="form-control-sm"
              placeholder="Search syllabus name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xl={2} lg={2} md={3} sm={6} xs={6} className="mb-2 mb-lg-0">
            <FormSelect
              options={["Month", "Year"]}
              placeholder="Month"
              className="form-select-sm"
              // onChange={(e) => setMonth(e.target.value)}
            />
          </Col>
          <Col xl={2} lg={2} md={3} sm={6} xs={6} className="mb-2 mb-lg-0">
            <FormSelect
              options={["Month", "Year"]}
              placeholder="Year"
              className="form-select-sm"
              // onChange={(e) => setYear(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="m-4">
          <div className="bg-light rounded p-4">
            <GKAccordionActions
              // accordionItem={dataSliced}
              accordionItem={filteredData}
              onClick={setShowAdd}
              uid={uid}
              token={token}
              idProgram={idProgram}
              fetchSilabus={fetchSilabus}
              loadingSyllabus={loadingSyllabus}
              itemsPerPage={itemsPerPage}
              pageNumber={pageNumber}
            />
          </div>

          {/* <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
            <ReactPaginate
              previousLabel={<ChevronLeft size="14px" />}
              nextLabel={<ChevronRight size="14px" />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"justify-content-center mb-0 pagination"}
              previousLinkClassName={"page-link mx-1 rounded"}
              nextLinkClassName={"page-link mx-1 rounded"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link mx-1 rounded"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"active"}
            />
          </div> */}
        </Row>
      </Card>

      {showAdd && (
        <AddNewModal
          size="lg"
          setShow={setShowAdd}
          show={showAdd}
          buttonClassName="py-2 px-3 rounded-3"
          text1="Cancel"
          text2="Add"
          variant1="outline-primary"
          variant2="primary"
          disabled={
            !title || !flow || (startDate && !endDate) || disableButton
              ? true
              : false
          }
          title="Add New Syllabus"
          onClick={submitSilabus}
          onHide={() => {
            setShowAdd(false);
            setFlow("");
            setTitle("");
          }}
        >
          <Row>
            <Col md={12} xs={12} className="mb-3">
              <Form.Label>Syllabus Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Text>
                Pastikan tidak melebihi dari 60 karakter dan tuliskan judul yang
                menggambarkan topik yang akan dibahas
              </Form.Text>
            </Col>
            <Col md={12} xs={12} className="mb-4">
              <Form.Label className="d-block">Syllabus Flow</Form.Label>
              <Form.Check
                type="radio"
                id="serial"
                label="Serial (Pengerjaan sesuai urutan)"
                className="form-check-inline"
                onClick={handleFlowChange}
                checked={flow === "serial"}
                onChange={() => null}
              />
              <Form.Check
                type="radio"
                id="partial"
                label="Partial (Pengerjaan bebas/tidak sesuai urutan)"
                className="form-check-inline"
                onClick={handleFlowChange}
                checked={flow === "partial"}
                onChange={() => null}
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                Start Date <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                as={FlatPickrTime}
                setDate={setStartDate}
                minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
              />
            </Col>
            <Col md={6} xs={12} className="mb-3">
              <Form.Label>
                End Date <span className="text-muted">(optional)</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                as={FlatPickrTime}
                setDate={setEndDate}
                minDate={startDate ? new Date(startDate) : null}
              />
            </Col>
          </Row>
        </AddNewModal>
      )}

      {warning && (
        <NotifSuccessModal show={warning} setShow={setWarning}>
          <ErrorAlert
            setState={setWarning}
            text1={warningMessage}
            className="mb-0"
          />
        </NotifSuccessModal>
      )}
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </Fragment>
  );
};
