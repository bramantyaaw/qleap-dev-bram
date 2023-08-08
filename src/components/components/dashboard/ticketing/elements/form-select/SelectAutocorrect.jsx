import React from "react";
import Select from "react-select";

const SelectAutocorrect = ({
  handleChange,
  arrData,
  placeholder,
  borderColor,
  fontSize,
  isCustom,
  className,
  handleInputChange,
  paddingLeft,
  border,
  padding,
  style,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: borderColor ? borderColor : "#aaa",
      minHeight: "32px",
      height: "32px",
      boxShadow: state.isFocused ? null : null,
      fontSize: fontSize ? fontSize : "12px",
      paddingLeft: isCustom ? paddingLeft : "10px",
      border: border,
      padding: padding,
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "32px",
    }),

    input: (provided) => ({
      ...provided,
      // margin: "7px 20px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "32px",
    }),
  };

  return (
    <>
      {isCustom ? (
        <Select
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={arrData}
          placeholder={placeholder}
          isSearchable
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={customStyles}
          className={className}
          style={style}
        />
      ) : (
        <Select
          onChange={handleChange}
          options={arrData}
          placeholder={placeholder}
          isSearchable
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          styles={customStyles}
          style={style}
        />
      )}
    </>
  );
};

export default SelectAutocorrect;
