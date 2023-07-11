export default class FormatNumber {
  static digits(num) {
    const nfObject = new Intl.NumberFormat();
    return nfObject.format(num);
  }

  static ngnAmount(num, currencyDisplay = "code") {
    const nfObject = new Intl.NumberFormat("us-US", {
      style: "currency",
      currency: "NGN",
      currencyDisplay,
    });
    return nfObject.format(num);
  }

  static currencyToNumber(str) {
    if (!str) return;
    //ensure all commas are striped off
    str = String(str).replace(/,/g, "");
    return parseFloat(parseFloat(str).toFixed(2));
  }
}
