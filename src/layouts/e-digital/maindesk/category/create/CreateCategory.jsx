import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import ReactQuillEditor from "../../../../../components/components/elements/editor/ReactQuillEditor";
import FormSelect from "../../../../../components/components/elements/form-select/FormSelect";
import ReactQuill from "react-quill";
import axios from "axios";

export const CreateCategory = (props) => {
  const { next, previous, category, setCategory } = props;
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [title, setTitle] = useState("");

  const handleClick = () => {
    next();
  };

  const fetchCategory = async () => {
    try {
      await axios
        .get("/euniv/get-category", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.id,
              label: data?.name,
            };
            return obj;
          });
          setCategoryOption(newObjArr);
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, []);

  return (
    <Form>
      <div className="mb-4">
        <h4 className="mb-0 fw-bold">Create or Select Category</h4>
        <span className="fs-6">Tambahkan Category disini</span>
      </div>
      <Row>
        <Col md={12} xs={12} className="mb-4">
          <Form.Group>
            <Form.Label>Add From Existing</Form.Label>
            <Form.Control
              as={FormSelect}
              className="form-select-md"
              options={categoryOption}
              // placeholder="Select Category"
              // value={category.category_id}
              // defaultValue={
              //   categoryOption.find(
              //     (option) => option.value === category.category_id
              //   )?.label || "Select Category"
              // }
              placeholder={
                category.category_id
                  ? categoryOption.find(
                      (option) => option.value === category.category_id
                    )?.label || "Select Category"
                  : "Select Category"
              }
              onChange={(e) =>
                setCategory({
                  ...category,
                  category_id: e.target.value,
                  category_type: "existing",
                  category_name: "",
                })
              }
            />
            <Form.Text className="text-muted">
              Lakukan pencarian Category yang sudah ada disini
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <p className="text-center text-muted">or Add New</p>
        </Col>

        <Col md={12} xs={12} className="mb-4">
          <Form.Group>
            <Form.Label>
              Category Title <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={category.category_name}
              onChange={(e) =>
                setCategory({
                  ...category,
                  category_name: e.target.value,
                  category_type: "new",
                })
              }
              maxLength={60}
              disabled={
                category.category_id === 0 || category.category_id === ""
                  ? false
                  : true
              }
            />
            <Form.Text className="text-muted">
              Pastikan tidak melebihi dari 60 karakter dan tuliskan judul yang
              menggambarkan topik yang akan dibahas
            </Form.Text>
          </Form.Group>
        </Col>
        <Col xs={12} className="d-flex justify-content-between">
          {/* Button */}
          <Button
            className="rounded-3"
            variant="outline-secondary"
            onClick={previous}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            className="rounded-3"
            disabled={
              (category.category_id === 0 || category.category_id === "") &&
              category.category_name === ""
                ? true
                : false
            }
            onClick={handleClick}
          >
            Next
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
