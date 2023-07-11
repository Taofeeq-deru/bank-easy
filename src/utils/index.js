export * from "./validations";
export { default as formatNumber } from "./formatNumber";

export const calcDate = (dateObj) => {
  let d = dateObj ? new Date(dateObj) : new Date();
  var options = {
    weekday: undefined,
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return d.toLocaleDateString("en-US", options);
};

export const transactionsModel = (transactions) => {
  let sortedList = groupArrays(groups(transactions));
  const res = sortedList.sort((b, a) => {
    a = new Date(a.nextDate);
    b = new Date(b.nextDate);
    return a > b ? -1 : a < b ? 1 : 0;
  });

  return res;
};

const groups = (arrayL) =>
  arrayL.reduce((groups, statement) => {
    const date = statement.date.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(statement);
    return groups;
  }, {});

//   // Edit: to add it in the array format instead
const groupArrays = (grpL) =>
  Object.keys(grpL).map((date) => {
    return {
      date,
      transactions: grpL[date],
    };
  });
