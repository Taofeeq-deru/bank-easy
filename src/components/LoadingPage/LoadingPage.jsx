import Logo from "components/Logo/Logo";
import "./style.scss";

function LoadingPage() {
  return (
    <div className="loading-page landing-page-container vh-100 vw-100 d-flex justify-content-center py-5">
      <div className="logo-cont">
        <Logo size="lg" />
      </div>
    </div>
  );
}

export default LoadingPage;
