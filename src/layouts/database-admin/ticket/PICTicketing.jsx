import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";
import { CMSDashboard } from "../../../components/components/dashboard/cms/CMSDashboard";
import TransactionTicketing from "./elements/TransactionTicketing";
import SearchInput from "../../../components/components/dashboard/ticketing/elements/search/SearchInput";
// import SortByStatus from "../../../components/components/dashboard/ticketing/elements/dropdown/SortByStatus";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";

const PICTicketing = ({ isDatabase }) => {
  // const [selectedItem, setSelectedItem] = useState("");
  const [search, setSearch] = useState("");
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [arrPICData, setArrPICData] = useState([]);
  const [arrStatus, setArrStatus] = useState([]);
  const [status, setStatus] = useState("N");
  const [loading, setLoading] = useState(false);

  const getArrDataPIC = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          "/main-desk/get-ticket-list",
          {
            uid,
            status,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            const statusDataArr = res?.data?.data?.summary;
            setArrStatus(statusDataArr);
            // const numberTicket =
            const newData = res?.data?.data?.transaction;
            const newTicketArr = newData?.map((data) => {
              let obj = {
                ticket_number: data?.id,
                created_at: data?.created_at,
                div: data?.div,
                employee_name: data?.employee_name,
                employee_nik: data?.employee_nik,
                id: data?.id,
                issue_id: data?.issue_id,
                issue_name: data?.issue_name,
              };
              return obj;
            });
            setArrPICData(newTicketArr);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const newData = arrPICData?.sort((a, b) => b?.id - a?.id);

  // const filterByNotif = newData?.filter((data) => {
  //   const arr = [...selectedItem];

  //   if (selectedItem === "" || selectedItem === "All") {
  //     return data;
  //   } else if (data?.status?.toLowerCase().includes(arr[0].toLowerCase())) {
  //     return data;
  //   } else {
  //     return null;
  //   }
  // });

  const dataBySearch = newData?.filter((data) => {
    if (search === "") {
      return data;
    } else if (
      data?.issue_type?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.name_employee?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.div?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.nik?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.id?.toString()?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.created_date?.toLowerCase().includes(search?.toLowerCase()) ||
      data?.updated_date?.toLowerCase().includes(search?.toLowerCase())
    ) {
      return data;
    } else {
      return null;
    }
  });

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    getArrDataPIC();
    // eslint-disable-next-line
  }, [, status]);

  return (
    <div>
      <CMSDashboard
        isDatabase={isDatabase}
        arrStatus={arrStatus}
        status={status}
        setStatus={setStatus}
      />
      <Card className={`mb-3 pb-3 border-0 w-100`}>
        <Card.Header className="border-bottom px-3 py-3 d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold h4">Ticketing</h6>
          <div className="d-flex">
            <SearchInput setSearch={setSearch} />
            {/* <SortByStatus
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              title="Filter By Status"
              dataArrSort={[
                "All",
                "Open",
                "Revision",
                "Edited",
                "Process",
                "Closed",
              ]}
            /> */}
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <LoadingComponent />
          ) : (
            <TransactionTicketing dataArr={dataBySearch} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PICTicketing;
