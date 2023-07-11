import LogoImg from "assets/logo.svg";

function Logo({ size = "sm" }) {
  const width = size === "lg" ? "99.99px" : size === "md" ? "71.62px" : "32px";
  const height = size === "lg" ? "100px" : size === "md" ? "71.63px" : "32px";
  const fontSize = size === "lg" ? "24px" : size === "md" ? "17.19px" : "10.57px";
  return (
    <div className="d-flex flex-column align-items-center">
      <img src={LogoImg} alt="Bank Easy" className="logo" style={{ width, height }} />
      <h1 className="text-primary fw-bold" style={{ fontSize }}>
        Bank Easy
      </h1>
    </div>
  );
}

export default Logo;
