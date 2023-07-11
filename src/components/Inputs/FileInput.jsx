import "./style.scss";

function FileInput({
  name,
  id,
  fileName,
  placeholder,
  labelClass,
  grpClass,
  isErr,
  errMssg,
  onChange,
  fileType,
  extraMssg,
}) {
  return (
    <div className={`${grpClass || ""}`}>
      <label htmlFor={id} className={`file-input-label cursor-pointer ${labelClass}`}>
        <p className="mb-0">{fileName || placeholder}</p>
      </label>
      <input
        type="file"
        id={id}
        name={name}
        className={`d-none ${isErr ? "is-invalid" : ""}`}
        accept={fileType}
        value=""
        onChange={onChange}
      />
      {extraMssg ? <div className="extra-input-message">{extraMssg}</div> : null}
      <div className="invalid-feedback">{errMssg}</div>
    </div>
  );
}

export default FileInput;
