import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

import {
  addCommas,
  removeNonNumeric,
  countedAsWords,
} from "../../../config/helper/utils";

const KoperasiForm = (props) => {
  const { setInputData, eligibility } = props;

  const months = [];
  const [month, getMonth] = useState(1);
  const [loan, setLoan] = useState(0);
  const [interest, setInterest] = useState(0);
  const [value, setValue] = useState(0);
  const [total, setTotal] = useState(0);
  const [counted, setcounted] = useState("");

  for (let index = 1; index <= 10; index++) {
    months.push(index);
  }

  const inputData = [
    {
      loan: value,
      period: month,
      counted: counted,
      interest: interest,
      total: total,
      totalCounted: countedAsWords(total),
    },
  ];

  const calcLoan = () => {
    let interestRate = 0;
    interestRate = removeNonNumeric(loan) * month * eligibility?.interest;
    setInterest(addCommas(interestRate));
    setTotal(
      addCommas(
        parseInt(removeNonNumeric(loan)) +
          parseInt(removeNonNumeric(interestRate))
      )
    );
  };

  useEffect(() => {
    setValue(addCommas(removeNonNumeric(loan)));
    calcLoan();
  }, [loan, month]);

  useEffect(() => {
    setcounted(countedAsWords(value));
  }, [value]);

  useEffect(() => {
    setInputData(inputData);
  }, [total]);

  return (
    <div>
      <Form>
        <Form.Group className="d-sm-flex w-100">
          <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
            <Form.Label htmlFor="employee-loan">
              Loan <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="employee-loan"
              name="employee-loan"
              value={value}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                if (
                  parseInt(removeNonNumeric(e.target.value)) >
                  parseInt(eligibility?.limit)
                ) {
                  e.preventDefault();
                } else {
                  setLoan(e.target.value);
                }
              }}
            />
            <span>* Your max loan: Rp {addCommas(eligibility?.limit)}</span>
          </Form.Group>
          <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
            <Form.Label>
              Loan Period <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              id="employee-period"
              name="employee-period"
              onChange={(e) => getMonth(e.target.value)}
            >
              {months.map((data, index) => {
                return (
                  <option key={index} value={data}>
                    {data}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form.Group>
        <Form.Group className="d-sm-flex w-100">
          <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
            <Form.Label htmlFor="employee-counted">
              Counted <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="employee-counted"
              name="employee-counted"
              placeholder={counted}
              value={counted}
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
            <Form.Label>
              Interest <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="employee-interest"
              name="employee-interest"
              placeholder={interest}
              value={interest}
              disabled
            />
          </Form.Group>
        </Form.Group>
        <Form.Group className="d-sm-flex w-100">
          <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
            <Form.Label htmlFor="employee-total">
              Total Payment<span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="employee-total"
              name="employee-total"
              placeholder={total}
              value={total}
              disabled
            />
          </Form.Group>
        </Form.Group>
      </Form>
    </div>
  );
};

export default KoperasiForm;
