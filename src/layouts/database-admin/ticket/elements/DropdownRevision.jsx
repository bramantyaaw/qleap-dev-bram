import React from "react";

const DropdownRevision = ({
  setSelected,
  data,
  disable,
  defaultValue,
  value,
  tunjangan,
  className,
  isDisable,
  style,
}) => {
  return (
    <>
      {isDisable ? (
        <select
          id="item-select"
          className={`${className} form-select input-default`}
          disabled
          style={style}
        >
          <option value={defaultValue}>{defaultValue}</option>
        </select>
      ) : (
        <select
          className={`${className} form-select input-default`}
          aria-label="Default select example"
          defaultValue=""
          onChange={(e) => setSelected(e.target.value)}
          style={style}
        >
          <option value="" disabled>
            {defaultValue}
          </option>
          {data?.map((data, id) => {
            return (
              <option key={id} value={data?.id}>
                {data?.issue && data?.issue}
                {data?.name && data?.name}
              </option>
            );
          })}
        </select>
      )}
    </>
  );
};

export default DropdownRevision;
