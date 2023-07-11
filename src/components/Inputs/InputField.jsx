import "./style.scss";

function InputField({
  inputClassName,
  label,
  value,
  onChange,
  name,
  type,
  placeholder,
  isErr,
  errMssg,
  isValid,
  isLoading,
  grpClassName,
  disabled,
  labelClass,
  autoComplete = "false",
  leftAddOn,
  rightAddOn,
  extraMssg,
  inputMode,
  accept,
  fileName,
}) {
  return (
    <div className={`form-group ${grpClassName || ""}`}>
      {type === "file" ? (
        <label
          className={`file-input-label cursor-pointer ${
            isLoading ? "is-loading" : isErr ? "is-invalid" : isValid ? "is-valid" : ""
          }`}
          htmlFor={name}>
          <p className="mb-0">{fileName || placeholder}</p>
        </label>
      ) : label ? (
        <label
          htmlFor={name}
          className={`form-label ${labelClass || ""} ${disabled ? "text-muted" : ""}`}>
          {label}
        </label>
      ) : null}
      <div className="input-group input-group-lg">
        {leftAddOn ? (
          <span className="input-group-text input-group-text__left">{leftAddOn}</span>
        ) : null}
        <input
          type={type}
          className={`form-control text-center ${inputClassName || ""} ${
            isLoading ? "is-loading" : isErr ? "is-invalid" : isValid ? "is-valid" : ""
          }`}
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          accept={accept}
        />
        {rightAddOn ? (
          <span className="input-group-text input-group-text__right">{rightAddOn}</span>
        ) : null}
      </div>
      <div className="invalid-feedback">{errMssg}</div>
      {extraMssg ? <div className="extra-input-message">{extraMssg}</div> : null}
    </div>
  );
}

export default InputField;
