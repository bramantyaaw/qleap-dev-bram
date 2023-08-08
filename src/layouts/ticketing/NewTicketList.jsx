// import node module libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import NewProfileLayout from "../../components/components/dashboard/ticketing/ticket-list/NewProfileLayout";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import CloseTicket from "../../components/components/dashboard/ticketing/ticket-list/CloseTicket";
import SortByStatus from "../../components/components/dashboard/ticketing/elements/dropdown/SortByStatus";
import TicketListBadge from "../../components/components/dashboard/ticketing/elements/bagdes/TicketListBadge";
import SearchInput from "../../components/components/dashboard/ticketing/elements/search/SearchInput";

const NewTicketList = ({ arrPage, token, uid }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });

  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const ticketPerPage = 4;
  const pageVisited = pageNumber * ticketPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const newData = arrPage?.sort((a, b) => b.id - a.id);
  const filterByNotif = newData?.filter((data) => {
    const handleStatus = (status) => {
      switch (status) {
        case "S":
          return "O";
        case "P":
          return "P";
        case "A":
          return "S";
        case "F":
          return "C";
        default:
          return null;
      }
    };
    const arr = [...selectedItem];

    if (selectedItem === "" || selectedItem === "All") {
      return data;
    } else if (
      handleStatus(data?.status).toLowerCase().includes(arr[0].toLowerCase())
    ) {
      return data;
    } else {
      return null;
    }
  });

  const dataBySearch = filterByNotif?.filter((data) => {
    if (search === "") {
      return data;
    } else if (data?.issue_type?.toLowerCase().includes(search.toLowerCase())) {
      return data;
    } else {
      return null;
    }
  });

  const pageCount = Math.ceil(dataBySearch?.length / ticketPerPage);

  const dataSliced =
    dataBySearch?.length <= 4
      ? dataBySearch
      : dataBySearch?.slice(pageVisited, pageVisited + ticketPerPage);

  const notifSign = (value, time) => {
    switch (value) {
      case "S":
        return (
          <TicketListBadge time={time} className="open-badge" text="Open" />
        );
      case "R":
        return (
          <TicketListBadge time={time} className="bg-danger" text="Revisi" />
        );
      case "P":
        return (
          <TicketListBadge
            time={time}
            className="process-badge"
            text="Process"
          />
        );
      case "A":
        return (
          <TicketListBadge time={time} className="bg-success" text="Solved" />
        );
      case "F":
        return (
          <TicketListBadge time={time} className="closed-badge" text="Closed" />
        );
      case "RO":
        return (
          <TicketListBadge time={time} className="open-badge" text="Re-Open" />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <Card.Body className="card-body-ticketing p-0">
        {dataSliced?.map((data, id) => {
          return (
            <div className="border-bottom pt-0 pb-5" key={id}>
              <Row>
                <Col className="mb-2 mb-lg-0 ">
                  <p className="fs-6">Issue Type</p>
                  <p className="mb-0">{data?.issue_type}</p>
                  <p className="mb-0 id-text">{data?.id}</p>
                </Col>

                <Col className="mb-2 mb-lg-0 ms-5 submit-date">
                  <p className="fs-6">Submit Date</p>
                  <p className="mb-0">{data?.created_at}</p>
                </Col>
                <Col className="mb-2 mb-lg-0 ms-5">
                  <p className="fs-6">PIC</p>
                  <p className="mb-0">{data?.pic_group}</p>
                </Col>
                <Col className="mb-2 mb-lg-0 status-wrapper">
                  <p className="fs-6 lh-1">Status</p>
                  {notifSign(data?.status, data?.updated_at)}
                </Col>
                <CloseTicket
                  dataStatus={data?.status}
                  dataId={data?.id}
                  token={token}
                  uid={uid}
                />
              </Row>
            </div>
          );
        })}
        <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
          {dataBySearch?.length > 0 ? (
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
          ) : (
            <p className="text-secondary">No Data</p>
          )}
        </div>
      </Card.Body>

      {/* <HelpCenterLayout>
      <div className="subs-wrapper">
        <NewProfileLayout>
          <Card className="border-0">
            <Card.Header className="d-lg-flex justify-content-between align-items-center card-header-ticketing">
              <div className="mb-3 mb-lg-0">
                <p className="mb-0">Ticketing Status</p>
                <p className="mb-0">
                  Here is a list of tickets that you submitted
                </p>
              </div>
              <div className="d-flex search-ticket">
                <SearchInput setSearch={setSearch} />
                <SortByStatus
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  title="Sort By"
                  dataArrSort={["All", "Open", "Process", "Solved", "Closed"]}
                />
              </div>
            </Card.Header>
            <Card.Header>
              <SubmittionBadge />
            </Card.Header>
            <Card.Body className="card-body-ticketing">
              {dataSliced?.map((data, id) => {
                return (
                  <div className="border-bottom pt-0 pb-5" key={id}>
                    <Row>
                      <Col className="mb-2 mb-lg-0 ">
                        <p className="fs-6">Issue Type</p>
                        <p className="mb-0">{data?.issue_type}</p>
                        <p className="mb-0 id-text">{data?.id}</p>
                      </Col>

                      <Col className="mb-2 mb-lg-0 ms-5 submit-date">
                        <p className="fs-6">Submit Date</p>
                        <p className="mb-0">{data?.created_at}</p>
                      </Col>
                      <Col className="mb-2 mb-lg-0 ms-5">
                        <p className="fs-6">PIC</p>
                        <p className="mb-0">{data?.pic_group}</p>
                      </Col>
                      <Col className="mb-2 mb-lg-0 status-wrapper">
                        <p className="fs-6 lh-1">Status</p>
                        {notifSign(data?.status, data?.updated_at)}
                      </Col>
                      <CloseTicket
                        dataStatus={data?.status}
                        dataId={data?.id}
                        token={token}
                        uid={uid}
                      />
                    </Row>
                  </div>
                );
              })}
              <div className="my-2 page-wrapper d-flex flex-column flex-sm-row align-items-center justify-content-center">
                {dataBySearch ? (
                  <ReactPaginate
                    previousLabel={<ChevronLeft size="14px" />}
                    nextLabel={<ChevronRight size="14px" />}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={
                      "justify-content-center mb-0 pagination"
                    }
                    previousLinkClassName={"page-link mx-1 rounded"}
                    nextLinkClassName={"page-link mx-1 rounded"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link mx-1 rounded"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"active"}
                  />
                ) : (
                  <p className="text-secondary">No Data</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </NewProfileLayout>
      </div>
    </HelpCenterLayout> */}
    </>
  );
};

export default NewTicketList;
