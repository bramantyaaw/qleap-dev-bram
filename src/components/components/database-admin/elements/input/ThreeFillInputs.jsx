import React from "react";
import IssueDropdown from "../../../dashboard/ticketing/elements/dropdown/IssueDropdown";
import DisabledInput from "../../../dashboard/ticketing/elements/input/DisabledInput";
import FillInput from "../../../dashboard/ticketing/elements/input/FillInput";
import TextForm from "../../../dashboard/ticketing/elements/text/TextForm";

const ThreeFillInput = ({
  text1,
  value1,
  text2,
  value2,
  text3,
  value3,
  isSecNull,
  isThirdNull,
  fillClassName1,
  classNameDiv,
  setState1,
  setState2,
  setState3,
  maxLength1,
  maxLength2,
  maxLength3,
}) => {
  return (
    <div
      className={`d-flex w-100 mb-3 flex-column flex-md-row ${classNameDiv}`}
    >
      <div className="w-100 w-md-50">
        <TextForm text={text1} />
        <FillInput
          type="text"
          placeholder={value1}
          value={value1}
          className={`py-1 ${fillClassName1}`}
          setState={setState1}
          maxLength={maxLength1}
        />
      </div>
      <div
        className={`mx-0 mx-md-3 w-100 w-md-50 ${
          isThirdNull ? "mt-3 mt-md-0" : "my-3 my-md-0"
        }`}
      >
        {isSecNull ? null : (
          <>
            <TextForm text={text2} />
            <FillInput
              type="text"
              placeholder={value2}
              value={value2}
              className="py-1"
              setState={setState2}
              maxLength={maxLength2}
            />
          </>
        )}
      </div>
      <div className="w-100 w-md-50">
        {isThirdNull ? null : (
          <>
            <TextForm text={text3} />
            <FillInput
              type="text"
              placeholder={value3}
              value={value3}
              className="py-1"
              setState={setState3}
              maxLength={maxLength3}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ThreeFillInput;
