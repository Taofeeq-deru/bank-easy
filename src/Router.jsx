import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";

import Login from "views/Login/Login";
import Dashboard from "views/Dashboard/Dashboard";
import Payments from "views/Payments/Payments";
import ErrorPage from "views/ErrorPage/ErrorPage";

export default function Router(props) {
  const routes = [
    {
      path: ROUTES.login,
      component: <Login {...props} />,
    },
    {
      path: ROUTES.dashboard,
      component: <Dashboard {...props} />,
    },
    {
      path: ROUTES.payments,
      component: <Payments {...props} />,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component }, index) => (
          <Route key={index} path={path} element={component} />
        ))}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
