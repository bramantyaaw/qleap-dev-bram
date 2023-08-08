import React, { useEffect, useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import SubmittionBadges from "../../components/components/dashboard/ticketing/elements/bagdes/SubmittionBadges";
import NewProfileLayout from "../../components/components/dashboard/ticketing/ticket-list/NewProfileLayout";
import HelpCenterLayout from "../helpcenter/HelpCenterLayout";
import SearchInput from "../../components/components/dashboard/ticketing/elements/search/SearchInput";
import NewTicketList from "./NewTicketList";
import axios from "axios";

const TicketListLayout = () => {
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [arrPage, setArrPage] = useState([]);
  const [arrRevision, setArrRevision] = useState([]);

  const fetchListTicket = async () => {
    try {
      await axios
        .post(
          `/services/ticketing/get-ticket-list`,
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newArr = res?.data?.data;
            const arr = newArr?.filter((data) => data?.status !== "R");
            const revision = newArr?.filter((data) => data?.status === "R");

            setArrPage(arr);
            setArrRevision(revision);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const dataBySearch = arrPage?.filter((data) => {
    const handleStatus = (status) => {
      switch (status) {
        case "S":
          return "Open";
        case "P":
          return "Process";
        case "A":
          return "Solved";
        case "F":
          return "Closed";
        default:
          return null;
      }
    };
    if (search === "") {
      return data;
    } else if (
      data?.issue_type?.toLowerCase().includes(search?.toLowerCase()) ||
      handleStatus(data?.status)
        ?.toLowerCase()
        .includes(search?.toLowerCase()) ||
      data?.created_at?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.pic_group?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.updated_at
        ?.toString()
        ?.toLowerCase()
        .includes(search?.toLowerCase())
    ) {
      return data;
    } else {
      return null;
    }
  });

  const dataRevisionBySearch = arrRevision?.filter((data) => {
    if (search === "") {
      return data;
    } else if (
      data?.issue_type?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.status?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.created_at?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.pic_group?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.updated_at
        ?.toString()
        ?.toLowerCase()
        .includes(search?.toLowerCase())
    ) {
      return data;
    } else {
      return null;
    }
  });

  useEffect(() => {
    fetchListTicket();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);
  return (
    <>
      <HelpCenterLayout>
        <div className="subs-wrapper">
          <NewProfileLayout>
            <Card className="border-0">
              <Card.Header>
                <SubmittionBadges
                  title="TICKETING"
                  secStatus="SOLVED"
                  thirdStatus="REVISION"
                />
              </Card.Header>
              <Card.Body className="p-0">
                <Tab.Container defaultActiveKey="Ticketing Status">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center border-bottom border-gray-300 pb-2 pb-md-0">
                    <Nav
                      className="nav-lb-tab"
                      style={{ borderBottom: "none" }}
                    >
                      <Nav.Item>
                        <Nav.Link
                          eventKey="Ticketing Status"
                          className="mb-sm-3 mb-md-0"
                        >
                          Ticketing Status
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="Need To Response"
                          className="mb-sm-3 mb-md-0"
                        >
                          <div className="d-flex align-items-center justify-content-center">
                            <p className="mb-0 me-2">Need To Response</p>

                            {arrRevision?.length > 0 && (
                              <div
                                className="bg-danger text-white rounded-circle text-center"
                                style={{
                                  top: "5px",
                                  right: "3px",
                                  width: "fitContent",
                                  fontSize:
                                    arrRevision?.length > 1 ? "8px" : "10px",
                                  padding: "2px 7px",
                                }}
                              >
                                {arrRevision?.length}
                              </div>
                            )}
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <SearchInput setSearch={setSearch} />
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey="Ticketing Status">
                      <div className="mt-3">
                        <NewTicketList
                          arrPage={dataBySearch}
                          token={token}
                          uid={uid}
                        />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="Need To Response">
                      <NewTicketList
                        arrPage={dataRevisionBySearch}
                        token={token}
                        uid={uid}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </NewProfileLayout>
        </div>
      </HelpCenterLayout>
    </>
  );
};

export default TicketListLayout;
