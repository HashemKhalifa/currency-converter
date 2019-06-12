import { displayCurrency, convert, currencyName } from "./currencyUtils";

const currencyExchangeList = {
  EUR: {
    currencyName: "Euro",
    currencySymbol: "€",
    id: "EUR"
  },
  USD: {
    currencyName: "United States Dollar",
    currencySymbol: "$",
    id: "USD"
  }
};

describe("Display Currency", () => {
  const currencyList = Object.values(currencyExchangeList);

  it("should display the amount and the currency name in de_DE locale", () => {
    expect(displayCurrency({currencyList, currencyId:"EUR", number: 10})).toBe(`10 ${currencyList[0].currencyName}`);
  });

  it("should return the Currency Name United States Dollar", () => {
    expect(currencyName({currencyList, currencyId:"USD"})).toEqual(currencyList[1].currencyName);
  });


});

describe("Convert", () => {
  const rate = {
    data: { EUR_USD: 1.126012 }
  };

  it("should convert from EUR to USD", () => {
    const convertFrom = convert(10, rate, "from");
    expect(convertFrom).toBe(11.26);
  });

  it("should convert from USD to EUR", () => {
    const convertTo = convert(10, rate, "to");
    expect(convertTo).toBe(8.881);
  });
});
