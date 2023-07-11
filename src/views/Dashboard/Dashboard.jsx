import { useMemo, useState } from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import Layout from "components/Layout/Layout";

import "./style.scss";
import { calcDate, formatNumber, transactionsModel } from "utils";

function Dashboard() {
  const [showPwd, setShowPwd] = useState(false);

  const handleClickShowPassword = () => setShowPwd((show) => !show);
  const { balance, transactions } = JSON.parse(sessionStorage.getItem("user")) || {};

  const sortedTransactions = useMemo(
    () => transactionsModel(transactions),
    [transactions]
  );

  return (
    <Layout>
      <div className="dashboard">
        <div className="card bg-danger rounded">
          <p className="card__type">Current Account</p>
          <div className="card__amount">
            <h1>{showPwd ? formatNumber.ngnAmount(balance) : "NGN XXX.XX"}</h1>
            <div
              className="cursor-pointer"
              style={{ width: "14px", height: "14px" }}
              onClick={handleClickShowPassword}>
              {showPwd ? (
                <VisibilityOffOutlined
                  sx={{ width: "100%", height: "100%", verticalAlign: "unset" }}
                />
              ) : (
                <VisibilityOutlined
                  sx={{ width: "100%", height: "100%", verticalAlign: "unset" }}
                />
              )}
            </div>
          </div>
        </div>
        <h3 className="text-primary transactions-title">Transactions</h3>
        <div className="transactions">
          {sortedTransactions?.map(({ transactions, date }) => (
            <div className="transaction__group">
              <p className="transaction__date">{calcDate(date)}</p>
              <div className="transaction__inner">
                {transactions?.map(({ reason, amount }) => (
                  <div className="transaction__item">
                    <p className="transaction__title">{reason}</p>
                    <p
                      className={`transaction__amount text-${
                        amount < 0 ? "danger" : "success"
                      }`}>
                      {amount > 0 ? "+" : ""}
                      {formatNumber.ngnAmount(amount, "narrowSymbol")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
