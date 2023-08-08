import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import FormSelect from "../../../../components/components/elements/form-select/FormSelect";
import {
  addCommas,
  numberWithCommas,
  removeNonNumeric,
} from "../../../../config/helper/utils";

export const AdjustmentSalary = ({ data, setSalary }) => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [option, setOption] = useState([]);

  const apptype = data?.app_type;
  const adjustment_salary = data?.adjustment_salary;

  const [rows, setRows] = useState(apptype === "pr" ? adjustment_salary : []);

  const selectedItem = rows.map((data) => data?.salary_item_code);

  const handleAddRow = () => {
    if (apptype === "pr") {
      setRows([
        ...rows,
        { salary_item_id: 0, salary_item_code: "", salary_item_value: "" },
      ]);
    } else {
      setRows([...rows, { salary_item_code: "", salary_item_value: "" }]);
    }
  };

  const handleChange = (e, index) => {
    const { id, value } = e.target;
    let parsedValue = value.replace(/[,.]/g, "");

    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[index] = {
        ...newRows[index],
        [id]: parsedValue,
      };
      return newRows;
    });
  };

  const handleDeleteRow = () => {
    const newRows = [...rows];
    setRows(newRows.slice(0, -1));
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.post(
        "/epcn/get-adjustment-salary",
        {
          selected_salary_code: selectedItem,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newData = data?.data;
      const newObjArr = newData?.map((data) => {
        const obj = {
          value: data?.salary_item_code,
          label: data?.salary_item_name,
        };
        return obj;
      });
      setOption(newObjArr);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  const newRows = rows?.map(
    ({ salary_item_id, salary_item_code, salary_item_value }) => ({
      salary_item_id,
      salary_item_code,
      salary_item_value,
    })
  );

  useEffect(() => {
    // setSalary(rows);
    if (apptype === "pr") {
      setSalary(newRows);
    } else {
      setSalary(rows);
    }
  }, [rows]);

  return (
    <div>
      {adjustment_salary?.length > 0 ? (
        <p className="fst-italic mt-3 mb-1">Adjustment Salary</p>
      ) : null}

      {apptype === "bp" && data?.status_approve ? (
        <div>
          <p className="fst-italic mt-3 mb-1">Adjustment Salary</p>
          <Row class="d-flex justify-content-start mt-3">
            {rows.map((row, index) => (
              <div key={index} className="d-flex mb-2 align-items-center">
                <FormSelect
                  className="form-select-sm me-2 "
                  id="salary_item_code"
                  type="text"
                  size="sm"
                  placeholder="Select"
                  value={row?.salary_item_code}
                  onChange={(e) => handleChange(e, index)}
                  options={option}
                />
                <Form>
                  <span className="position-absolute ps-2 pt-2 search-icon">
                    Rp.
                  </span>
                  <Form.Control
                    id="salary_item_value"
                    value={addCommas(
                      (row?.salary_item_value)
                        .toString()
                        .replace(/[^-0-9]/g, "")
                    )}
                    onChange={(e) => handleChange(e, index)}
                    type="text"
                    placeholder="Nominal"
                    className="ps-5"
                    size="sm"
                  />
                </Form>
              </div>
            ))}
          </Row>
          <div>
            <Button variant="primary" size="xs" onClick={handleAddRow}>
              Add
            </Button>
            <Button
              variant="secondary"
              size="xs"
              className="ms-2"
              onClick={handleDeleteRow}
            >
              Delete
            </Button>
            <p className="text-success pt-2 fst-italic fs-6">
              Note : Hanya diisi jumlah perubahan (penambahan / pengurangannya
              saja)
            </p>
          </div>
        </div>
      ) : apptype === "pr" && data?.status_approve ? (
        <div>
          <Row class="d-flex justify-content-start mt-3">
            {rows?.map((row, index) => (
              <div key={index} className="d-flex mb-2 align-items-center">
                <FormSelect
                  className="form-select-sm me-2 "
                  id="salary_item_code"
                  type="text"
                  size="sm"
                  placeholder={
                    row?.salary_item_name ? row?.salary_item_name : "Select"
                  }
                  value={row?.salary_item_code}
                  onChange={(e) => handleChange(e, index)}
                  options={option}
                  disabled={row?.salary_item_name ? true : false}
                />
                <Form>
                  <span className="position-absolute ps-2 pt-2 search-icon">
                    Rp.
                  </span>
                  <Form.Control
                    id="salary_item_value"
                    value={addCommas(
                      (row?.salary_item_value)
                        .toString()
                        .replace(/[^-0-9]/g, "")
                    )}
                    onChange={(e) => handleChange(e, index)}
                    type="text"
                    placeholder="Nominal"
                    className="ps-5"
                    size="sm"
                  />
                </Form>
              </div>
            ))}
          </Row>
          <div>
            <Button variant="primary" size="xs" onClick={handleAddRow}>
              Add
            </Button>
            <p className="text-success pt-2 fst-italic fs-6">
              Note : Hanya diisi jumlah perubahan (penambahan / pengurangannya
              saja)
            </p>
          </div>
        </div>
      ) : (
        <ul className="ps-0">
          {adjustment_salary?.map((item, index) => (
            <Row>
              <div key={index} className="d-flex mb-2 align-items-center">
                <Form.Control
                  className="form-control-sm me-2 "
                  id="salary_item_code"
                  type="text"
                  size="sm"
                  value={item?.salary_item_name}
                  disabled
                />
                <Form>
                  <span className="position-absolute ps-2 pt-2 search-icon">
                    Rp.
                  </span>
                  <Form.Control
                    id="salary_item_value"
                    value={addCommas(
                      item?.salary_item_value.toString().replace(/[^-0-9]/g, "")
                    )}
                    type="text"
                    size="sm"
                    className="ps-5"
                    disabled
                  />
                </Form>
              </div>
            </Row>
          ))}
        </ul>
      )}
    </div>
  );
};
