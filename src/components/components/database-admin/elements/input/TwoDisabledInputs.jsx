import React from "react";
import DisabledInput from "../../../dashboard/ticketing/elements/input/DisabledInput";
import TextForm from "../../../dashboard/ticketing/elements/text/TextForm";

const TwoDisabledInput = ({
  text1,
  value1,
  text2,
  value2,
  className1,
  className2,
  disabledClassName1,
  disableForm2,
}) => {
  return (
    <div className="d-flex w-100 mb-3 flex-column flex-md-row">
      <div className={`${className1}`}>
        <TextForm text={text1} />
        <DisabledInput
          type="text"
          placeholder={value1}
          value={value1}
          className={`py-1 ${disabledClassName1}`}
        />
      </div>
      {disableForm2 ? null : (
        <div className={`ms-0 ms-md-3 mt-3 mt-md-0  ${className2}`}>
          <TextForm text={text2} />
          <DisabledInput
            type="text"
            placeholder={value2}
            value={value2}
            className="py-1"
          />
        </div>
      )}
    </div>
  );
};

export default TwoDisabledInput;
