/**
 *
 * @param currencyList
 * @param currencyId
 * @param number
 * @returns {string}
 */
export function displayCurrency({
  currencyList = [],
  currencyId = "EUR",
  number = 0
}) {
  const displayedCurrency = currencyName({ currencyList, currencyId });
  const formatting = new Intl.NumberFormat("de-DE").format(number);

  return `${formatting} ${displayedCurrency}`;
}

/**
 *
 * @param currencyList
 * @param currencyId
 * @returns {*}
 */
export function currencyName({ currencyList = [], currencyId = "EUR" }) {
  return currencyList.find(currency => currency.id === currencyId).currencyName;
}

/**
 *
 * @param amount
 * @param data
 * @param mode
 * @returns {number}
 */
export function convert({ amount = 0, state = {}, mode ='from' }) {
  const rate = Object.values(state.data)[0];
  let result;

  if (mode === "from") {
    result = amount * rate;
  }
  if (mode === "to") {
    result = amount * (1 / rate);
  }

  return Math.round(result * 1000) / 1000;
}
