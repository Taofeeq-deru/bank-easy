import { useEffect, useRef } from "react";
import PinInputComponent from "react-pin-input";

import "./style.scss";

function PinInput({
  length = 6,
  secret = true,
  onChange,
  onComplete,
  containerJustifyContent = "center",
  disabled,
  emptyPin,
}) {
  const pinRef = useRef();

  useEffect(() => {
    if (emptyPin) {
      pinRef.current.clear();
    }
  }, [emptyPin]);

  return (
    <PinInputComponent
      length={length}
      secret={secret}
      onChange={onChange}
      ref={(n) => (pinRef.current = n)}
      type="numeric"
      inputMode="number"
      style={{
        margin: "10px 0px",
        display: "flex",
        flexFlow: "row nowrap",
        gap: "4px",
        justifyContent: containerJustifyContent,
      }}
      inputStyle={{
        borderWidth: "0px 0px 1px 0px",
        borderColor: "#000",
        borderRadius: "0",
        background: "#fff",
        width: `${100 / length}%`,
      }}
      inputFocusStyle={{ borderColor: "#6351A8" }}
      onComplete={onComplete}
      autoSelect={true}
      regexCriteria={/^[0-9]*$/}
      disabled={disabled}
    />
  );
}

export default PinInput;
