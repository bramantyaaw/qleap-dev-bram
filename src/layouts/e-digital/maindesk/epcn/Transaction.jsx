import React, { Fragment, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CMSDashboard } from "../../../../components/components/dashboard/cms/CMSDashboard";
import { approvalHCBP } from "../../../../redux/action/epcnAction";
import ListApproval from "../../myapproval/ListApproval";
import axios from "axios";

export const Transaction = () => {
  const dispatch = useDispatch();
  const { listApprovalHCBP } = useSelector((state) => state.epcnReducer);
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [selectedItem, setSelectedItem] = useState("");
  const [status, setStatus] = useState("");
  const [selectedSubmissionType, setSelectedSubmissionType] = useState("");
  const [dept, setDept] = useState(localStorage.getItem("sub_dept"));

  const dataList = listApprovalHCBP?.data?.data;
  const master = dataList?.summary;
  const transaction = dataList?.transaction;

  useEffect(() => {
    dispatch(approvalHCBP(token, uid, status));
  }, [status]);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
    setDept(localStorage.getItem("sub_dept"));
  }, [localStorage]);

  return (
    <Fragment>
      <Row>
        <CMSDashboard data={master} setStatus={setStatus} />
        <ListApproval
          approval_data={transaction}
          selectedItem={selectedItem}
          selectedSubmissionType={selectedSubmissionType}
          dept={dept}
        />
      </Row>
    </Fragment>
  );
};
