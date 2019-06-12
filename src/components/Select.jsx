import React from "react";

import { SelectCurrency } from "./styles";

export const Select = ({ value, onChange, currencyList = [] }) => (
  <SelectCurrency defaultValue={value} onChange={onChange} name="currencyList">
    {currencyList.map(currency => (
      <option key={currency.id} value={currency.id}>
        {currency.currencyName}
      </option>
    ))}
  </SelectCurrency>
);
