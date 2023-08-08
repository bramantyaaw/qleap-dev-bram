import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EdigitalLayout from "../../home/EDigitalLayout";
import PembuatanLokasi from "./details-ticket/PembuatanLokasi";
import CreateGPSAbsensi from "./details-ticket/CreateGPSAbsensi";
import UpdateSuperior from "./details-ticket/UpdateSuperior";
// import ApprovalAbsensi from "./details-ticket/ApprovalAbsensi";
import PenggantianIDCardPIC from "./details-ticket/PenggantianIDCardPIC";
import TicketPage from "../../../components/components/dashboard/ticketing/hero/TicketPage";
import SuccessAlert from "../../../components/components/dashboard/ticketing/elements/alerts/SuccessAlert";
import LoadingComponent from "../../../components/components/elements/loading/LoadingComponent";

const TicketDetailAdmin = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [dataDetail, setDataDetail] = useState([]);
  const [reOpenDetail, setReOpenDetail] = useState([]);
  const [newData, setNewData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [listRegion, setListRegion] = useState([]);
  const [loading, setLoading] = useState(false);

  const [permissionUpdate, setPermissionUpdate] = useState(false);
  const [uidInCharge, setUidInCharge] = useState("");
  const { idTicket } = useParams();

  const getArrDataPIC = async () => {
    try {
      setLoading(true);
      await axios
        .post(
          "/services/ticketing/get-ticket-detail",
          {
            id: parseInt(idTicket),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoading(false);
          if (res?.status === 200) {
            setNewData(res?.data?.data);
            setReOpenDetail(res?.data?.data?.re_open_log);
            setDataDetail(res?.data?.data?.ticket_detail);
          }
        });
    } catch (err) {
      return err;
    }
  };

  const fetchPermissionsList = async () => {
    try {
      await axios
        .post(
          "/main-desk/get-data",
          {
            uid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            const newData = res?.data?.data?.detail;
            let filtered = newData?.filter(
              (data) => data?.function_name === "ticketing"
            );
            filtered?.map((data) => {
              if (data?.update === true) {
                return setPermissionUpdate(true);
              } else {
                return setPermissionUpdate(false);
              }
            });
          } else {
            return res;
          }
        });
    } catch (e) {
      return e;
    }
  };

  const fetchListRegion = async () => {
    try {
      const { data } = await axios.get("/master/get-region-id", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const newData = data?.data;
      const objData = newData?.map((data) => {
        return {
          id: data?.regionId,
          name: data?.regionName,
        };
      });

      setListRegion(objData);
    } catch (err) {
      return err;
    }
  };

  const conditionalComponent = (value) => {
    const newValue = value?.toString();
    switch (newValue) {
      case "1":
        return (
          <PembuatanLokasi
            title="CREATE MASTER LOCATION PROINT"
            arrData={dataDetail}
            idTicket={idTicket}
            token={token}
            uid={uid}
            setSuccess={setSuccess}
            reOpenDetail={reOpenDetail}
            permissionUpdate={permissionUpdate}
            uidInCharge={uidInCharge}
            regionList={listRegion}
          />
        );
      case "2":
        return (
          <CreateGPSAbsensi
            arrData={dataDetail}
            idTicket={idTicket}
            token={token}
            uid={uid}
            setSuccess={setSuccess}
            reOpenDetail={reOpenDetail}
            permissionUpdate={permissionUpdate}
            uidInCharge={uidInCharge}
          />
        );
      // case "29":
      //   return (
      //     <UpdateSuperior
      //       arrData={dataDetail}
      //       idTicket={idTicket}
      //       token={token}
      //       uid={uid}
      //       setSuccess={setSuccess}
      //       reOpenDetail={reOpenDetail}
      //       permissionUpdate={permissionUpdate}
      //       uidInCharge={uidInCharge}
      //     />
      //   );

      // case "31":
      //   return (
      //     <PenggantianIDCardPIC
      //       arrData={dataDetail}
      //       idTicket={idTicket}
      //       token={token}
      //       uid={uid}
      //       setSuccess={setSuccess}
      //       reOpenDetail={reOpenDetail}
      //       permissionUpdate={permissionUpdate}
      //       uidInCharge={uidInCharge}
      //     />
      //   );
      default:
        return null;
    }
  };

  useEffect(() => {
    getArrDataPIC();
    fetchPermissionsList();
    fetchListRegion();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    //eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    const uid = newData?.ticket_detail ? dataDetail[0]?.uid_in_charge : "-";
    setUidInCharge(uid);
  }, [dataDetail, newData]);

  return (
    <EdigitalLayout>
      <div className="lh-sm">
        <h3 className="fw-bold mb-1 lh-sm">Ticketing</h3>
        <div className="border-bottom border-w-5 mb-4 bottom-light-dark lh-sm ">
          <TicketPage
            text1="Ticketing"
            text4="View Detail"
            link1="/main-desk/ticket"
          />
        </div>
      </div>
      {success && (
        <SuccessAlert
          text1="Yes, this ticket has been successfully handled by you. The system will send an email to the user to ensure that this issue has been resolved and close this ticket"
          isLinkNull={true}
        />
      )}
      {loading ? (
        <LoadingComponent />
      ) : (
        conditionalComponent(
          dataDetail?.length > 0 ? dataDetail[0]?.issue_id : 0
        )
      )}
    </EdigitalLayout>
  );
};

export default TicketDetailAdmin;
