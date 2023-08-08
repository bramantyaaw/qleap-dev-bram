import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMagnify as SearchIcon } from "@mdi/js";
import { Card, Image } from "react-bootstrap";
import SelectAutocorrect from "../../../components/components/dashboard/ticketing/elements/form-select/SelectAutocorrect";
import FileAvatar from "../../../assets/images/svg/dummyavatar.svg";
import NoDataComponent from "../../../components/components/marketing/talent-dashboard/NoDataComponent";

const TalentProfile = ({
  arrEmployee,
  setSearch,
  setSelectedUid,
  selectedUid,
  arrGeneralData,
  search,
}) => {
  const [picSource, setPicSource] = useState("");
  const [arrProfileData, setArrProfileData] = useState([]);

  const handleChangeEmployee = (selectedOption) => {
    setSelectedUid(selectedOption?.value);
  };

  const handleInputChange = (inputValue) => {
    if (inputValue?.length <= 14) {
      if (inputValue?.length % 3 === 0) {
        setSearch(inputValue);
      }
    } else if (inputValue?.length >= 14) {
      setSearch(inputValue);
    }
  };

  useEffect(() => {
    const img = arrGeneralData ? arrGeneralData[0]?.photo : "-";
    setPicSource(img);

    const firstElement = arrGeneralData ? arrGeneralData[0] : null;
    let arr = [];
    arr?.push(firstElement);
    setArrProfileData(arr);
  }, [arrGeneralData]);

  return (
    <Card className="mb-3 border-0 ">
      <Card.Body className="p-0 ">
        <div className="px-3 ">
          <div className="w-100 d-flex flex-column  justify-content-center align-items-center ">
            <Image
              src={
                selectedUid
                  ? picSource !== "-"
                    ? picSource
                    : FileAvatar
                  : FileAvatar
              }
              className="rounded-circle p-4"
              height={219}
              width={219}
            />
          </div>
          <Form className="position-relative">
            <Icon
              path={SearchIcon}
              size={1}
              className="position-absolute custom-absolute-search text-kinda-grey"
            />
            {search === "" ? (
              <SelectAutocorrect
                isCustom={true}
                handleInputChange={handleInputChange}
                handleChange={handleChangeEmployee}
                // arrData={arrEmployee}
                placeholder="Search NIK/Name Here"
                className="h-25 border-light-white"
                paddingLeft="30px"
              />
            ) : (
              <SelectAutocorrect
                isCustom={true}
                handleInputChange={handleInputChange}
                handleChange={handleChangeEmployee}
                arrData={arrEmployee}
                placeholder="Search NIK/Name Here"
                className="h-25 border-light-white"
                paddingLeft="30px"
              />
            )}
          </Form>
        </div>

        <div className="py-4 border-bottom px-3 w-100">
          <p className="mb-0 text-kinda-dark h5 fw-bold text-center">
            Profile Information
          </p>
        </div>
        {selectedUid !== "" ? (
          arrProfileData?.map((data, id) => {
            return (
              <div key={id}>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">NIK • Nama</p>
                  <p className="mb-0 text-kinda-dark h5 ">
                    {data?.nik ? data?.nik : <NoDataComponent />} •{" "}
                    {data?.name ? data?.name : <NoDataComponent />}
                  </p>
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">
                    Job Title • Job Level
                  </p>
                  <p className="mb-0 text-kinda-dark h5 ">
                    {data?.job_title ? data?.job_title : <NoDataComponent />} •{" "}
                    {data?.level ? data?.level : <NoDataComponent />}
                  </p>
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">
                    Group Directorate
                  </p>
                  <p className="mb-0 text-kinda-dark h5 ">
                    {data?.comp_code ? data?.comp_code : <NoDataComponent />}
                  </p>
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">Division</p>
                  <p className="mb-0 text-kinda-dark h5 ">
                    {data?.div ? data?.div : <NoDataComponent />}
                  </p>
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">Join Date</p>
                  {data?.join_date ? (
                    <>
                      <p className="mb-0 text-kinda-dark h5 ">
                        {data?.join_date}
                      </p>
                      <p className="mb-0 text-kinda-dark h5 ">
                        {data?.after_join}
                      </p>
                    </>
                  ) : (
                    <NoDataComponent />
                  )}
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">Education</p>
                  {data?.edu_level_name ? (
                    <>
                      <p className="mb-0 text-kinda-dark h5 ">
                        {data?.edu_level_name} {data?.edu_major_name}
                      </p>
                      <p className="mb-0 text-kinda-dark h5 ">
                        {data?.edu_institution_name}
                      </p>
                    </>
                  ) : (
                    <NoDataComponent />
                  )}
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">Age</p>
                  {data?.age ? (
                    <>
                      <p className="mb-0 text-kinda-dark h5 ">
                        {parseInt(data?.age) < 2
                          ? `${data?.age} year`
                          : `${data?.age} years`}
                        <span>
                          {" "}
                          {data?.month < 2
                            ? `${data?.month} month`
                            : `${data?.month} months`}
                        </span>
                      </p>
                      {data?.until_retired !== "-" && (
                        <p className="mb-0 text-danger">
                          {data?.until_retired}
                        </p>
                      )}
                    </>
                  ) : (
                    <NoDataComponent />
                  )}
                </div>
                <div className="py-4 border-bottom px-3 w-100">
                  <p className="mb-1 text-kinda-light-dark h6">
                    Marital Status
                  </p>
                  <p className="mb-0 text-kinda-dark h5 ">
                    {data?.martial_status ? (
                      data?.martial_status
                    ) : (
                      <NoDataComponent />
                    )}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">NIK • Nama</p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">
                Job Title • Job Level
              </p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Group Directorate</p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Division</p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Join Date</p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Degree</p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Age</p>
              <NoDataComponent />
            </div>
            <div className="py-4 border-bottom px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Marital Status</p>
              <NoDataComponent />
            </div>
            <div className="py-4 px-3 w-100">
              <p className="mb-1 text-kinda-light-dark h6">Profile DISC</p>
              <NoDataComponent />
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TalentProfile;
