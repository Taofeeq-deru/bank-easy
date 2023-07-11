import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { read, utils } from "xlsx";
import Layout from "components/Layout/Layout";
import { InputField, PinInputField, SelectInputField } from "components/Inputs";

import ExcelBook from "assets/Sample file for bulk upload.xlsx";
import BankCodes from "assets/Bank Codes.pdf";
import ConfitmationImg from "assets/confirmation.png";

import "./style.scss";
import icons from "assets/icons";
import { formatNumber, validateSize } from "utils";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";

const SCREENS = ["PAYMENT_TYPES", "BULK_PAYMENT", "CONFIRMATION", "SUCCESS"];

const accounts = [{ name: "Ciroma Chidera", number: "1234567890" }];

const debitModes = ["Line by Line Debit", "Bulk Debit"];

function Payments() {
  const [screen, setScreen] = useState(SCREENS[0]);
  const [index, setIndex] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    accountToDebit: "",
    reason: "",
    debitMode: "",
    file: "",
    fileName: "",
    transactions: [],
  });

  const navigate = useNavigate();

  const handleContinue = () => {
    const newIndex = index + 1;
    setScreen(SCREENS[newIndex]);
    setIndex(newIndex);
  };

  const handleSuccess = () => {
    const { reason, transactions } = paymentDetails;
    const amount = transactions?.reduce(
      (a, b) => a + formatNumber.currencyToNumber(b?.Amount),
      0
    );
    const userData = JSON.parse(sessionStorage.getItem("user")) || {};
    const newData = {
      ...userData,
      balance: userData?.balance - amount,
      transactions: [
        ...userData?.transactions,
        { reason, amount: -amount, date: new Date() },
      ],
    };
    sessionStorage.setItem("user", JSON.stringify(newData));
    navigate(ROUTES.dashboard);
  };

  const renderBasedOnScreen = () => {
    switch (screen) {
      case "PAYMENT_TYPES":
        return <PaymentTypes {...{ handleContinue }} />;

      case "BULK_PAYMENT":
        return <BulkPayment {...{ handleContinue, setPaymentDetails }} />;

      case "CONFIRMATION":
        return <Confirmation {...{ handleContinue, paymentDetails }} />;

      case "SUCCESS":
        return <Success {...{ handleSuccess }} />;

      default:
        return <PaymentTypes {...{ handleContinue }} />;
    }
  };

  return <Layout>{renderBasedOnScreen()}</Layout>;
}

const PaymentTypes = ({ handleContinue }) => {
  return (
    <div className="payments">
      <h1 className="text-primary">Payments</h1>
      <div className="payment-types">
        <div className="payment-types__item">
          <p className="mb-0">Single Payments</p>
        </div>
        <div className="payment-types__item" onClick={handleContinue}>
          <p className="mb-0">Bulk Payments</p>
        </div>
      </div>
    </div>
  );
};

const BulkPayment = ({ handleContinue, setPaymentDetails }) => {
  const [payload, setPayload] = useState({
    accountToDebit: "",
    reason: "",
    debitMode: "",
    file: "",
    fileName: "",
    transactions: [],
  });
  const [errorObj, setErrorObj] = useState({
    accountToDebit: null,
    reason: null,
    debitMode: null,
    file: null,
  });
  const [errMssg, setErrMssg] = useState("");

  const { accountToDebit, reason, debitMode, fileName, transactions } = payload;

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = transactions?.reduce(
      (a, b) => a + formatNumber.currencyToNumber(b?.Amount),
      0
    );
    const userData = JSON.parse(sessionStorage.getItem("user")) || {};
    if (Object.values(errorObj)?.some((item) => item)) {
      return;
    }
    if (!accountToDebit || !reason || !debitMode || !fileName) {
      setErrorObj({
        accountToDebit: !accountToDebit ? "Please select account to debit" : null,
        reason: !reason ? "Please enter reason" : null,
        debitMode: !debitMode ? "Please select debit mode" : null,
        fileName: !fileName ? "Please select file" : null,
      });
      return;
    }
    if (userData?.balance < amount) {
      setErrMssg(
        `Transaction amount is greater than available balance (${formatNumber.ngnAmount(
          userData?.balance
        )})`
      );
      return;
    }
    setPaymentDetails(payload);
    handleContinue();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setErrMssg("");
    if (name === "bulkFile") {
      if (files?.length) {
        const file = files?.[0];
        const sizeTest = validateSize(file?.size);
        setPayload({ ...payload, fileName: file?.name, file });
        if (sizeTest === true) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;

            if (sheets.length) {
              const transactions = utils.sheet_to_json(wb.Sheets[sheets[0]]);

              const transactionsErr = transactions?.some(
                (item) =>
                  !item["Amount"] ||
                  !item["Bank Code"] ||
                  !item["Beneficiary Account Number"] ||
                  !item["Beneficiary Name"]
              );

              if (transactionsErr) {
                setErrorObj({
                  ...errorObj,
                  file: "Invalid file, please fill file details properly",
                });
              } else {
                setErrorObj({
                  ...errorObj,
                  file: null,
                });
                setPayload({ ...payload, fileName: file?.name, file, transactions });
              }
            }
          };
          reader.readAsArrayBuffer(file);
        } else {
          setErrorObj({
            ...errorObj,
            file: sizeTest,
          });
        }
      } else {
        return;
      }
    } else {
      setPayload({ ...payload, [name]: value });
      setErrorObj({
        ...errorObj,
        [name]: null,
      });
    }
  };

  return (
    <form className="bulk-payment" onSubmit={handleSubmit} noValidate>
      <h1 className="text-primary">Bulk Payment</h1>
      <div className="bulk-payment-cont">
        <div className="w-100">
          <a
            href={ExcelBook}
            className="w-100"
            rel="noopener noreferrer"
            target="_blank"
            download>
            <Button variant="primary" className="w-100 btn-height" disabled>
              Download File Format
            </Button>
          </a>
          <a
            href={BankCodes}
            className="text-primary text-center mt-2"
            rel="noopener noreferrer"
            target="_blank"
            download>
            Download Bank Codes
          </a>
        </div>
        <SelectInputField
          inputClassName="input-height"
          placeholder="Select an account to debit"
          options={accounts?.map(({ name, number }) => ({
            label: `${name}-${number}`,
            value: number,
          }))}
          name="accountToDebit"
          value={accountToDebit}
          onChange={handleChange}
          isErr={errorObj.accountToDebit}
          errMssg={errorObj.accountToDebit}
        />
        <InputField
          name="bulkFile"
          placeholder="Select a file to upload"
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          fileName={fileName}
          value=""
          onChange={handleChange}
          extraMssg={
            <>
              File format: CSV, XLS or XLSX
              <br />
              File size: Max size - 2MB
            </>
          }
          isErr={errorObj.file}
          errMssg={errorObj.file}
        />
        <SelectInputField
          inputClassName="input-height"
          placeholder="Select debit mode"
          name="debitMode"
          value={debitMode}
          options={debitModes?.map((item) => ({ label: item, value: item }))}
          onChange={handleChange}
          isErr={errorObj.debitMode}
          errMssg={errorObj.debitMode}
        />
        <InputField
          type="text"
          inputClassName="input-height"
          name="reason"
          placeholder="Reason"
          value={reason}
          onChange={handleChange}
          isErr={errorObj.reason}
          errMssg={errorObj.reason}
        />
      </div>
      {errMssg ? (
        <Alert className="text-center mt-3" variant="danger">
          {errMssg}
        </Alert>
      ) : null}
      <div className="d-flex justify-content-center mt-5">
        <Button className="btn-size" variant="primary" type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};

const Confirmation = ({ handleContinue, paymentDetails }) => {
  const [pin, setPin] = useState("");
  const [errMssg, setErrMssg] = useState("");

  const { accountToDebit, reason, transactions } = paymentDetails;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.length !== 4 || pin !== "2345") {
      setErrMssg("Please enter valid pin");
      return;
    }
    handleContinue();
  };

  const handleChange = (value) => {
    setErrMssg("");
    setPin(value);
  };

  const amount = transactions?.reduce(
    (a, b) => a + formatNumber.currencyToNumber(b?.Amount),
    0
  );

  return (
    <form className="confirmation" onSubmit={handleSubmit}>
      <h1 className="text-primary">Confirmation</h1>
      <div className="confirmation__top">
        <img src={ConfitmationImg} alt="Confirmation" width={64} height={64} />
        <p className="confirmation__title">You are about to make a bulk payment of:</p>
        <p className="confirmation__amount">{formatNumber.ngnAmount(amount)}</p>
        <div className="confirmation__details">
          <p>
            From: <strong>Account number - {accountToDebit}</strong>
          </p>
          <p>
            Reason: <strong>{reason}</strong>
          </p>
        </div>
      </div>
      <div className="confirmation__bottom">
        <p className="confirmation__title">Enter your PIN:</p>
        <PinInputField length={4} onChange={handleChange} />
        {errMssg ? (
          <Alert className="text-center" variant="danger">
            {errMssg}
          </Alert>
        ) : null}
      </div>
      <div className="d-flex justify-content-center  mt-5">
        <Button
          className="btn-size"
          variant="primary"
          type="submit"
          disabled={pin.length !== 4}>
          Make Payment
        </Button>
      </div>
    </form>
  );
};

const Success = ({ handleSuccess }) => {
  return (
    <div className="success">
      {icons.success}
      <h1>Great!</h1>
      <p>Your bulk payment went through.</p>
      <div className="d-flex justify-content-center  mt-5">
        <Button className="btn-size" variant="primary" onClick={handleSuccess}>
          Done
        </Button>
      </div>
    </div>
  );
};

export default Payments;
