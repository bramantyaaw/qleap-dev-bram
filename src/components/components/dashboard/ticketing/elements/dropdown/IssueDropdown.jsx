import React from "react";

const IssueDropdown = ({
  setSelected,
  data,
  disable,
  defaultValue,
  value,
  tunjangan,
  className,
  group
}) => {
  return (
    <>
      {
        group ? (
          <select
            className={`${className} form-select input-default`}
            aria-label="Default select example"
            defaultValue={""}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="" disabled></option>
            {group?.map((opt, idx) => {
              return (
                <optgroup key={idx} label={opt}>
                  {data?.filter(dat => dat?.group_pic_id === opt).map((value, key) => {
                    return (
                      <option key={key} value={value.id}>
                        {value.issue && value.issue}
                        {value.name && value.name}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
        ) :

          (disable ? (
            <>
              <select
                id="item-select"
                className={`${className} form-select input-default`}
                disabled
              >
                <option value={value}>{defaultValue}</option>
              </select>
            </>
          ) : defaultValue ? (
            <select
              className={`${className} form-select input-default`}
              aria-label="Default select example"
              defaultValue={defaultValue}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="" disabled>
                {defaultValue}
              </option>
              {tunjangan
                ? data?.map((data, id) => {
                  return (
                    <option key={id} value={data?.typeId}>
                      {data?.typeTunjangan}
                    </option>
                  );
                })
                : data?.map((data, id) => {
                  return (
                    <option key={id} value={data?.id}>
                      {data?.issue && data?.issue}
                      {data?.name && data?.name}
                    </option>
                  );
                })}
            </select>
          ) : (
            <select
              className={`${className} form-select input-default`}
              aria-label="Default select example"
              defaultValue={""}
              onChange={(e) => setSelected(e.target.value)}
            >
              <option value="" disabled></option>
              {tunjangan
                ? data?.map((data, id) => {
                  return (
                    <option key={id} value={data?.typeId}>
                      {data?.typeTunjangan}
                    </option>
                  );
                })
                : data?.map((data, id) => {
                  return (
                    <option key={id} value={data?.id}>
                      {data?.issue && data?.issue}
                      {data?.name && data?.name}
                    </option>
                  );
                })}
            </select>
          ))
      }
    </>
  );
};

export default IssueDropdown;
