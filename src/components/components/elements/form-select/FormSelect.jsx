// import node module libraries
import { Fragment } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export const FormSelect = (props) => {
  const {
    placeholder,
    defaultselected,
    options,
    id,
    name,
    onChange,
    className,
    disabled,
    style,
  } = props;

  return (
    <Fragment>
      <Form.Select
        defaultValue={defaultselected}
        id={id}
        name={name}
        onChange={onChange}
        className={className}
        disabled={disabled}
        style={style}
      >
        {placeholder ? (
          <option value="" className="text-muted">
            {placeholder}
          </option>
        ) : (
          ""
        )}
        {options?.map((item, index) => {
          return (
            <option key={index} value={item?.value} className="text-dark">
              {item?.label}
            </option>
          );
        })}
      </Form.Select>
    </Fragment>
  );
};

FormSelect.propTypes = {
  placeholder: PropTypes.string.isRequired,
  defaultselected: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};

FormSelect.defaultProps = {
  placeholder: "",
  defaultselected: "",
  id: "",
  name: "",
};

export default FormSelect;
