import "./style.scss";

function SelectInput({
  inputClassName,
  label,
  value,
  onChange,
  name,
  placeholder = "Select one",
  isErr,
  errMssg,
  isValid,
  isLoading,
  grpClassName,
  disabled,
  labelClass,
  options,
  extraMssg,
}) {
  return (
    <div className={`form-group ${grpClassName || ""}`}>
      {label ? (
        <label
          htmlFor={name}
          className={`form-label ${labelClass || ""} ${disabled ? "text-muted" : ""}`}>
          {label}
        </label>
      ) : null}
      <select
        className={`form-select form-select-lg text-center ${inputClassName || ""} ${
          isLoading ? "is-loading" : isErr ? "is-invalid" : isValid ? "is-valid" : ""
        }`}
        aria-label={name}
        name={name}
        value={value || placeholder}
        onChange={onChange}>
        <option value={placeholder}>{placeholder}</option>
        {options?.map(({ label, value }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{errMssg}</div>
      {extraMssg ? <div className="extra-input-message">{extraMssg}</div> : null}
    </div>
  );
}

export default SelectInput;
