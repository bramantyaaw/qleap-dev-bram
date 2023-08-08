// import node module libraries
import { Fragment, useState, useEffect } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";

// import sub components
import BudgetCard from "./BudgetCard";
import ExpensesChartCard from "./ExpensesChartCard";
import BudgetCategoryCard from "./BudgetCategoryCard";
import BudgetDetailsCard from "./BudgetDetailsCard";
import FlatPickrRange from "../../../../components/components/dashboard/ticketing/elements/date/FlatPickrRange";
import ProcessLoadingModal from "../../../../components/components/elements/modal/ProcessLoadingModal";

const ProjectBudget = () => {
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [modalLoading, setModalLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState({});
  const [detail, setDetail] = useState([]);
  const [brand, setBrand] = useState({});

  const handleGetIncentive = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          "/sales/get-incentive",
          {
            uid: uid,
            from_date: startDate,
            to_date: endDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((data) => {
          setModalLoading(false);
          setSummary(data?.data?.data?.summary);
          setDetail(data?.data?.data?.detil);
          setBrand(data?.data?.data?.brand);
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    handleGetIncentive();
  }, [startDate, endDate]);

  useEffect(() => {
    setUid(localStorage.getItem("uid"));
    setToken(localStorage.getItem("access_token"));
  }, [localStorage]);

  return (
    <Fragment>
      {modalLoading && (
        <Button variant="primary" size="md" className="rounded-3" disabled>
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
      )}
      <div className="pb-2 mb-2 d-flex align-items-end justify-content-end w-100">
        <div className="d-flex ">
          <FlatPickrRange
            className="py-2 ps-3 pe-6 wc-250 "
            top="10.3"
            right="12"
            setNewStartDate={setStartDate}
            setNewEndDate={setEndDate}
          />
        </div>
      </div>
      {/* total budget, spend and remaining  */}
      <BudgetCard summary={summary} />

      {/* expenses chart and budget categories table cards */}
      <Row>
        <Col lg={6} className="mb-4">
          <ExpensesChartCard />
        </Col>
        <Col lg={6} className="mb-4">
          <BudgetCategoryCard brand={brand} />
        </Col>
      </Row>

      {/* budget details table card */}
      <BudgetDetailsCard arrData={detail} />
    </Fragment>
  );
};

export default ProjectBudget;
