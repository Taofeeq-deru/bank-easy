import { useState } from "react";
import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, Input, InputAdornment, TextField } from "@mui/material";
import Logo from "components/Logo/Logo";
import "./style.scss";
import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMssg, setErrMssg] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPwd((show) => !show);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username?.toLowerCase() !== "chidera@mail.com" || password !== "Test123$") {
      setErrMssg("Invalid username or password");
      return;
    }
    const user = JSON.stringify({
      username,
      balance: 12000000,
      transactions: [
        {
          reason: "Account Funding",
          amount: 12000000,
          date: new Date("April 21, 2023 14:00:00")
        }
      ]
    });
    sessionStorage.setItem("user", user);
    navigate(ROUTES.dashboard);
  };

  return (
    <div className="landing-page-container vh-100 vw-100 p-5">
      <div className="d-flex flex-column align-items-center w-100">
        <Logo size="md" />
        Login!!!!
        <form onSubmit={handleSubmit} className="mt-5 login-form">
          <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              placeholder="Username"
              variant="standard"
              type="text"
              name="username"
              sx={{ flexGrow: "1" }}
              value={username}
              onChange={({ target: { value } }) => {
                setErrMssg("");
                setUsername(value);
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "100%",
              marginTop: "16px"
            }}>
            <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <Input
              id="standard-adornment-password"
              type={showPwd ? "text" : "password"}
              sx={{ flexGrow: "1" }}
              value={password}
              name="password"
              onChange={({ target: { value } }) => {
                setErrMssg("");
                setPassword(value);
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}>
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Box>
          <p className="forgot-password">Can’t remember your password?</p>

          {errMssg ? (
            <Alert className="text-center mt-3" variant="danger">
              {errMssg}
            </Alert>
          ) : null}

          <div className="mt-5 d-flex flex-column align-items-center">
            <Button
              className="btn-size"
              variant="primary"
              type="submit"
              disabled={!username || !password}>
              Login
            </Button>
            <p className="new-user">
              New user? <span className="text-primary">Sign up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
