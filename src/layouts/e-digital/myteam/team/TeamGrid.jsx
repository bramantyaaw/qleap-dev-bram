// import node module libraries
import React, { Fragment, lazy, useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { Col, Row, Form, Button, Spinner } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-feather";

// import sub components
// import TeamGridCard from "./TeamGridCard";

// import data files
import { TeamData } from "../../../../data/dashboard/projects/TeamData";
import axios from "axios";
import NotifSuccessModal from "../../../../components/components/elements/modal/NotifSuccessModal";
import ErrorAlert from "../../../../components/components/dashboard/ticketing/elements/alerts/ErrorAlert";
import ProcessLoadingModal from "../../../../components/components/elements/modal/ProcessLoadingModal";
const TeamGridCard = lazy(() => import("./TeamGridCard"));

const TeamGrid = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [teamMembers, setTeamMembersList] = useState(dataList?.slice(0, 100));
  const [pageNumber, setPageNumber] = useState(0);
  const teamMembersPerPage = 16;
  const pagesVisited = pageNumber * teamMembersPerPage;
  const pageCount = Math?.ceil(dataList?.length / teamMembersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const filteredData = useMemo(() => {
    let result = dataList || [];

    if (searchTerm !== "") {
      result = result.filter(
        (submission) =>
          submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.job_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return result;
  }, [dataList, searchTerm]);

  const displayTeamMembers = filteredData
    ?.slice(pagesVisited, pagesVisited + teamMembersPerPage)
    ?.map((teamMembers, index) => {
      return (
        <Col xl={3} lg={6} md={6} sm={12} key={index} className="mb-3">
          <TeamGridCard item={teamMembers} />
        </Col>
      );
    });
  // end of paging

  // end of searching code
  const fetchData = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/team/list-my-team",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        // .then((res) => setDataList(res?.data?.data));
        .then((res) => {
          if (res?.status === 200) {
            setModalLoading(false);
            setDataList(res?.data?.data);
          } else if (res?.status === 500) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(res?.data?.message);
          } else if (res?.status === 429) {
            setWarning(true);
            setModalLoading(false);
            return setWarningMessage(
              "Too many request at one moment, please try again later.."
            );
          } else {
            setModalLoading(false);
          }
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, []);

  return (
    <Fragment>
      {modalLoading ? (
        <Button variant="primary" size="sm" className="rounded-3" disabled>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            className="me-2"
          />
          Loading...
        </Button>
      ) : (
        <>
          {/* search membmer */}
          <Row>
            <Col xxl={2} lg={3} md={12} xs={12} className="mb-4">
              <Form.Control
                type="search"
                placeholder="Search member"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
          </Row>

          {/* show team membmers in grid view */}
          <Row>
            {displayTeamMembers?.length > 0 ? (
              displayTeamMembers
            ) : (
              <Col>No matching team members found.</Col>
            )}
          </Row>

          {warning && (
            <NotifSuccessModal show={warning} setShow={setWarning}>
              <ErrorAlert
                setState={setWarning}
                text1={warningMessage}
                className="mb-0"
              />
            </NotifSuccessModal>
          )}

          {/* grid view pagination*/}
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
        </>
      )}
    </Fragment>
  );
};

export default TeamGrid;
