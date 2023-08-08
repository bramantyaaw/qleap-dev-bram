import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const EditMatrix = (props) => {
  const {
    matrix,
    setMatrix,
    token,
    isAuthor,
    disableButton,
    exMatrix,
    setDeletedMatrixIds,
    deletedMatrixIds,
  } = props;

  const [compentencyIsOpen, setCompentencyIsOpen] = useState(false);
  const [verticalIsOpen, setVerticalIsOpen] = useState(false);
  const [businessUnitIsOpen, setBusinessUnitIsOpen] = useState(false);
  const [divisionIsOpen, setDivisionIsOpen] = useState(false);
  const [levelIsOpen, setLevelIsOpen] = useState(false);
  const [jobIsOpen, setJobIsOpen] = useState(false);

  const [loadingCompentency, setLoadingCompetency] = useState(false);
  const [loadingVertical, setLoadingVertical] = useState(false);
  const [loadingBusinessUnit, setLoadingBusinessUnit] = useState(false);
  const [loadingDivison, setLoadingDivison] = useState(false);
  const [loadingLevel, setLoadingLevel] = useState(false);
  const [loadingJob, setLoadingJob] = useState(false);

  const [selectedOptionBU, setSelectedOptionBU] = useState([]);
  const [selectedOptionDiv, setSelectedOptionDiv] = useState([]);
  const [selectedOptionLevel, setSelectedOptionLevel] = useState([]);
  const [selectedOptionJob, setSelectedOptionJob] = useState([]);

  const [competencyOptions, setCompetencyOptions] = useState([]);
  const [verticalOptions, setVerticalOptions] = useState([]);
  const [businessUnitOptions, setBusinessUnitOptions] = useState([]);

  const [levelOptions, setLevelOptions] = useState([]);
  const [divOptions, setDivOptions] = useState([]);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);

  const [search_term, setSearchTerm] = useState("");
  const [searchVertical, setSearchVertical] = useState("");
  const [searchBU, setSearchBU] = useState("");
  const [searchDiv, setSearchDiv] = useState("");
  const [searchLevel, setSearchLevel] = useState("");
  const [searchJob, setSearchJob] = useState("");

  const [competency, setCompetency] = useState([]);
  const [vertical, setVertical] = useState([]);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [buVertical, setBuVertical] = useState([]);
  const [div, setDiv] = useState([]);
  const [level, setLevel] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);

  const [combinedVertical, setCombinedVertical] = useState([]);

  const exBusiness = exMatrix
    ?.filter((item) => item?.type === 2)
    ?.flatMap((item) =>
      item?.value_matrix.map((matrix) => ({
        value: matrix?.id,
        label: matrix?.valueMatrix,
        id: matrix?.id,
      }))
    );

  const exCompetency = exMatrix
    ?.filter((item) => item?.type === 1)
    ?.flatMap((item) =>
      item?.value_matrix.map((matrix) => ({
        value: matrix.id,
        label: matrix.valueMatrix,
        id: matrix?.id,
      }))
    );
  const exDiv = exMatrix
    ?.filter((item) => item?.type === 3)
    ?.flatMap((item) =>
      item?.value_matrix.map((matrix) => ({
        value: matrix.id,
        label: matrix.alias,
        id: matrix?.id,
      }))
    );
  const exLevel = exMatrix
    ?.filter((item) => item?.type === 4)
    ?.flatMap((item) =>
      item?.value_matrix.map((matrix) => ({
        value: matrix.id,
        label: matrix.valueMatrix,
        id: matrix?.id,
      }))
    );
  const exJob = exMatrix
    ?.filter((item) => item?.type === 5)
    ?.flatMap((item) =>
      item?.value_matrix.map((matrix) => ({
        value: matrix.id,
        label: matrix.alias,
        id: matrix?.id,
      }))
    );

  const exVertical = exMatrix
    ?.filter((item) => item?.type === 6)
    ?.flatMap((item) =>
      item?.value_matrix.map((matrix) => ({
        value: matrix?.id,
        label: matrix?.alias,
        id: matrix?.id,
      }))
    );

  const handleChange = (selectedOption, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      // Handle the deselected option here
      const deselectedOption = actionMeta.removedValue;
      if (deselectedOption.id) {
        setDeletedMatrixIds((prevIds) => [...prevIds, deselectedOption.id]);
      }
    } else {
      const valuesToExclude = exCompetency?.map((item) => item.value);
      // remove default value from selected option
      const filteredOption = selectedOption?.filter(
        (item) => !valuesToExclude.includes(item.value)
      );
      const selectedValues = filteredOption?.map((option) => option?.value);
      return setCompetency(selectedValues);
    }
  };

  const handleVertical = (selectedOption, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      // Handle the deselected option here
      const deselectedOption = actionMeta.removedValue;
      if (deselectedOption.id) {
        setDeletedMatrixIds((prevIds) => [...prevIds, deselectedOption.id]);
      }
    } else {
      const valuesToExclude = exVertical?.map((item) => item.value);
      // remove default value from selected option
      const filteredOption = selectedOption?.filter(
        (item) => !valuesToExclude.includes(item.value)
      );
      const selectedValues = filteredOption?.map((option) => option?.value);
      return setVertical(selectedValues);
    }
  };

  const handleBusiness = (selectedOption, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      // Handle the deselected option here
      const deselectedOption = actionMeta.removedValue;
      if (deselectedOption.id) {
        setDeletedMatrixIds((prevIds) => [...prevIds, deselectedOption.id]);
      }
    } else {
      const valuesToExclude = exBusiness?.map((item) => item.value);
      // remove default value from selected option
      const filteredOption = selectedOption?.filter(
        (item) => !valuesToExclude.includes(item.value)
      );
      const selectedValues = filteredOption?.map((option) => option?.value);
      const selectedType = filteredOption?.map((option) => option?.type);
      setBuVertical(selectedType);
      setBusinessUnit(selectedValues);
      setSelectedOptionBU(selectedOption);
    }
  };

  const handleDivision = (selectedOption, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      // Handle the deselected option here
      const deselectedOption = actionMeta.removedValue;
      if (deselectedOption.id) {
        setDeletedMatrixIds((prevIds) => [...prevIds, deselectedOption.id]);
      }
    } else {
      const valuesToExclude = exDiv?.map((item) => item.value);
      // remove default value from selected option
      const filteredOption = selectedOption?.filter(
        (item) => !valuesToExclude.includes(item.value)
      );
      const selectedValues = filteredOption?.map((option) => option?.value);
      setDiv(selectedValues);
      setSelectedOptionDiv(selectedOption);
    }
  };

  const handleLevel = (selectedOption, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      // Handle the deselected option here
      const deselectedOption = actionMeta.removedValue;
      if (deselectedOption.id) {
        setDeletedMatrixIds((prevIds) => [...prevIds, deselectedOption.id]);
      }
    } else {
      const valuesToExclude = exLevel?.map((item) => item.value);
      // remove default value from selected option
      const filteredOption = selectedOption?.filter(
        (item) => !valuesToExclude.includes(item.value)
      );
      const selectedValues = filteredOption?.map((option) => option?.value);
      setLevel(selectedValues);
      setSelectedOptionLevel(selectedOption);
    }
  };

  const handleJob = (selectedOption, actionMeta) => {
    if (actionMeta.action === "remove-value") {
      // Handle the deselected option here
      const deselectedOption = actionMeta.removedValue;
      if (deselectedOption.id) {
        setDeletedMatrixIds((prevIds) => [...prevIds, deselectedOption.id]);
      }
    } else {
      const valuesToExclude = exJob?.map((item) => item.value);
      // remove default value from selected option
      const filteredOption = selectedOption?.filter(
        (item) => !valuesToExclude.includes(item.value)
      );
      const selectedValues = filteredOption?.map((option) => option?.value);
      setJobTitle(selectedValues);
      setSelectedOptionJob(selectedOption);
    }
  };

  useEffect(() => {
    const mixedValues = [
      ...vertical,
      ...buVertical.filter((item) => !vertical.includes(item)),
    ];
    setCombinedVertical(mixedValues);
  }, [vertical, buVertical]);

  const handleInputChange = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchTerm(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchTerm(inputValue);
    }
  };

  const handleInputVertical = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchVertical(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchVertical(inputValue);
    }
  };

  const handleInputBU = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchBU(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchBU(inputValue);
    }
  };

  const handleInputDiv = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchDiv(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchDiv(inputValue);
    }
  };
  const handleInputLevel = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchLevel(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchLevel(inputValue);
    }
  };

  const handleInputJob = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearchJob(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearchJob(inputValue);
    }
  };

  const fetchCompetency = async () => {
    try {
      setLoadingCompetency(true);
      await axios
        .get("/master/get-matrix-competency", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLoadingCompetency(false);
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.name,
              label: data?.name,
            };
            return obj;
          });
          function isValueInSecArr(value) {
            return exCompetency?.some((item) => item?.label === value);
          }
          // Filter out values from firstArr that don't exist in secArr labels
          const valuesNotInSecArr = newObjArr
            ?.filter((item) => !isValueInSecArr(item?.value))
            ?.map((item) => item);
          setCompetencyOptions(valuesNotInSecArr);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchVertical = async () => {
    try {
      setLoadingVertical(true);
      await axios
        .get("/master/get-vertical", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLoadingVertical(false);
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.name,
              label: data?.alias,
            };
            return obj;
          });
          function isValueInSecArr(value) {
            return exVertical?.some((item) => item?.label === value);
          }
          // Filter out values from firstArr that don't exist in secArr labels
          const valuesNotInSecArr = newObjArr
            ?.filter((item) => !isValueInSecArr(item?.value))
            ?.map((item) => item);
          setVerticalOptions(valuesNotInSecArr);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchBusinessUnit = async () => {
    try {
      setLoadingBusinessUnit(true);
      await axios
        .post(
          "/master/get-bu",
          {
            bu_vertical: vertical,
            search_term: searchBU,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoadingBusinessUnit(false);
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.name,
              label: data?.name,
              type: data?.type_vertical,
            };
            return obj;
          });
          function isValueInSecArr(value) {
            return exBusiness?.some((item) => item?.label === value);
          }
          // Filter out values from firstArr that don't exist in secArr labels
          const valuesNotInSecArr = newObjArr
            ?.filter((item) => !isValueInSecArr(item?.value))
            ?.map((item) => item);
          setBusinessUnitOptions(valuesNotInSecArr);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchDivision = async () => {
    try {
      setLoadingDivison(true);
      await axios
        .post(
          "/master/get-div",
          {
            matrix_competency: competency,
            bu_vertical: combinedVertical,
            search_term: searchDiv,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoadingDivison(false);
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.code,
              label: data?.name,
            };
            return obj;
          });
          function isValueInSecArr(value) {
            return exDiv?.some((item) => item?.label === value);
          }
          // Filter out values from firstArr that don't exist in secArr labels
          const valuesNotInSecArr = newObjArr
            ?.filter((item) => !isValueInSecArr(item?.value))
            ?.map((item) => item);
          setDivOptions(valuesNotInSecArr);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchLevel = async () => {
    try {
      setLoadingLevel(true);
      await axios
        .post(
          "/master/get-level",
          {
            matrix_competency: competency,
            bu_vertical: combinedVertical,
            div,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoadingLevel(false);
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.name,
              label: `Level ${data?.name}`,
            };
            return obj;
          });
          function isValueInSecArr(value) {
            return exLevel?.some((item) => item?.label === value);
          }
          // Filter out values from firstArr that don't exist in secArr labels
          const valuesNotInSecArr = newObjArr
            ?.filter((item) => !isValueInSecArr(item?.value))
            ?.map((item) => item);
          setLevelOptions(valuesNotInSecArr);
        });
    } catch (e) {
      return e;
    }
  };

  const fetchJobTitle = async () => {
    try {
      setLoadingJob(true);
      await axios
        .post(
          "/master/get-job-title",
          {
            matrix_competency: competency,
            bu_vertical: combinedVertical,
            div,
            level,
            search_term: searchJob,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setLoadingJob(false);
          const newData = res?.data?.data;
          const newObjArr = newData?.map((data) => {
            const obj = {
              value: data?.code,
              label: `Level ${data?.name}`,
            };
            return obj;
          });
          function isValueInSecArr(value) {
            return exJob?.some((item) => item?.label === value);
          }
          // Filter out values from firstArr that don't exist in secArr labels
          const valuesNotInSecArr = newObjArr
            ?.filter((item) => !isValueInSecArr(item?.value))
            ?.map((item) => item);
          setJobTitleOptions(valuesNotInSecArr);
        });
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    compentencyIsOpen === true && fetchCompetency();
  }, [compentencyIsOpen]);

  useEffect(() => {
    verticalIsOpen === true && fetchVertical();
  }, [verticalIsOpen]);

  useEffect(() => {
    businessUnitIsOpen === true && fetchBusinessUnit();
  }, [businessUnitIsOpen, searchBU]);

  useEffect(() => {
    divisionIsOpen === true && fetchDivision();
  }, [divisionIsOpen, searchDiv]);

  useEffect(() => {
    levelIsOpen === true && fetchLevel();
  }, [levelIsOpen]);

  useEffect(() => {
    jobIsOpen === true && fetchJobTitle();
  }, [jobIsOpen, searchJob]);

  useEffect(() => {
    const updatedMatrix = [];

    if (competency.length > 0) {
      updatedMatrix.push({
        type: 1,
        value_matrix: competency,
      });
    }

    if (businessUnit.length > 0) {
      updatedMatrix.push({
        type: 2,
        value_matrix: businessUnit,
      });
    }

    if (div.length > 0) {
      updatedMatrix.push({
        type: 3,
        value_matrix: div,
      });
    }

    if (level.length > 0) {
      updatedMatrix.push({
        type: 4,
        value_matrix: level,
      });
    }

    if (jobTitle.length > 0) {
      updatedMatrix.push({
        type: 5,
        value_matrix: jobTitle,
      });
    }

    if (vertical.length > 0) {
      updatedMatrix.push({
        type: 6,
        value_matrix: vertical,
      });
    }
    setMatrix(updatedMatrix);
    localStorage.setItem("matrix", JSON.stringify(updatedMatrix));
  }, [competency, vertical, businessUnit, div, level, jobTitle]);

  return (
    <>
      <Form>
        {/* row */}
        <Row>
          <Col md={6} xs={12} className="mb-3">
            <Form.Label>Competency</Form.Label>
            <Select
              isMulti
              name="colors"
              placeholder={
                loadingCompentency ? "Loading..." : "Select Competency"
              }
              options={competencyOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
              onInputChange={handleInputChange}
              isDisabled={isAuthor ? false : true}
              //   isDisabled={addProgram ? false : true}
              defaultValue={exCompetency ? exCompetency : []}
              onMenuOpen={() => setCompentencyIsOpen(true)}
            />
          </Col>
          <Col md={6} xs={12} className="mb-3">
            <Form.Label>Vertical</Form.Label>
            <Select
              isMulti
              name="colors"
              placeholder={loadingVertical ? "Loading..." : "Select Vertical"}
              options={verticalOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleVertical}
              onInputChange={handleInputVertical}
              defaultValue={exVertical ? exVertical : []}
              isDisabled={isAuthor ? false : true}
              onMenuOpen={() => setVerticalIsOpen(true)}
            />
          </Col>
          <Col md={6} xs={12} className="mb-3">
            <Form.Label>Business Unit</Form.Label>
            <Select
              isMulti
              name="colors"
              placeholder={
                loadingBusinessUnit ? "Loading..." : "Select Business Unit"
              }
              options={businessUnitOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleBusiness}
              onInputChange={handleInputBU}
              defaultValue={exBusiness ? exBusiness : []}
              isDisabled={isAuthor ? false : true}
              onMenuOpen={() => setBusinessUnitIsOpen(true)}
              onMenuClose={() => setBusinessUnitIsOpen(false)}
              //   value={selectedOptionBU}
            />
          </Col>
          <Col md={6} xs={12} className="mb-3">
            <Form.Label>Division</Form.Label>
            <Select
              isMulti
              name="colors"
              placeholder={loadingDivison ? "Loading..." : "Select Division"}
              options={divOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleDivision}
              onInputChange={handleInputDiv}
              defaultValue={exDiv ? exDiv : []}
              isDisabled={isAuthor ? false : true}
              onMenuOpen={() => setDivisionIsOpen(true)}
              onMenuClose={() => setDivisionIsOpen(false)}
              //   value={selectedOptionDiv}
            />
          </Col>
          <Col md={6} xs={12} className="mb-3">
            <Form.Label>Level</Form.Label>
            <Select
              isMulti
              name="colors"
              placeholder={loadingLevel ? "Loading..." : "Select Level"}
              options={levelOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleLevel}
              onInputChange={handleInputLevel}
              defaultValue={exLevel ? exLevel : []}
              isDisabled={isAuthor ? false : true}
              onMenuOpen={() => setLevelIsOpen(true)}
              onMenuClose={() => setLevelIsOpen(false)}
              //   value={selectedOptionLevel}
            />
          </Col>
          <Col md={6} xs={12} className="mb-3">
            <Form.Label>Job Tittle </Form.Label>
            <Select
              isMulti
              name="colors"
              // placeholder="Select Job Title"
              placeholder={loadingJob ? "Loading..." : "Select Job Title"}
              options={jobTitleOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleJob}
              onInputChange={handleInputJob}
              defaultValue={exJob ? exJob : []}
              isDisabled={isAuthor ? false : true}
              onMenuOpen={() => setJobIsOpen(true)}
              onMenuClose={() => setJobIsOpen(false)}
              //   value={selectedOptionJob}
            />{" "}
          </Col>
        </Row>
      </Form>
    </>
  );
};
