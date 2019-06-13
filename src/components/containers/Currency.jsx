import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import switchIco from "./switch.svg";

import {
  GlobalStyle,
  AppWrapper,
  Error,
  CurrencyConverter,
  CurrencyInfo,
  Input,
  Loading,
  Image
} from "../styles";

import { Select } from "../Select";

import {
  getRate,
  fromChangeInput,
  toChangeInput,
  fromCurrencyChange,
  toCurrencyChange,
  handleSwitch
} from "../../store/actions/currencyActions";

import currencyExchangeList from "../../consts/CurrencyCodes";
import { displayCurrency } from "../../utils/currencyUtils";

function Currency({
  error,
  isFetched,
  from,
  to,
  convertFrom,
  convertTo,
  fromChangeInput,
  fromCurrencyChange,
  toChangeInput,
  toCurrencyChange,
  handleSwitch,
  getRate
}) {
  useEffect(() => {
    getRate(convertFrom, convertTo);
  }, []);

  const currencyList = Object.values(currencyExchangeList);
  return (
    <Fragment>
      <GlobalStyle />
      {error && <Error>{error.message}</Error>}
      {!isFetched && !error && <Loading>Loading...</Loading>}
      {isFetched && (
        <AppWrapper>
          <CurrencyInfo>
            <p>
              {displayCurrency({
                currencyList,
                currencyId: convertFrom,
                number: from
              })}{" "}
              equals{" "}
            </p>
            <h4>
              {displayCurrency({
                currencyList,
                currencyId: convertTo,
                number: to
              })}
            </h4>
          </CurrencyInfo>

          <CurrencyConverter>
            <Input
              type="number"
              value={from}
              onChange={e => fromChangeInput(e.target.value)}
            />

            <Select
              value={convertFrom}
              onChange={e => fromCurrencyChange(e.target.value)}
              currencyList={currencyList}
            />
          </CurrencyConverter>
          <Image
              onClick={handleSwitch}
              width="50"
              src={switchIco}
              alt="Switch"
          />
          <CurrencyConverter>
            <Input
              type="number"
              value={to}
              onChange={e => toChangeInput(e.target.value)}
            />

            <Select
              value={convertTo}
              onChange={e => toCurrencyChange(e.target.value)}
              currencyList={currencyList}
            />
          </CurrencyConverter>
        </AppWrapper>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ currency }) => ({
  currency: currency.data,
  error: currency.error,
  isFetched: currency.isFetched,
  from: currency.from,
  to: currency.to,
  convertFrom: currency.convertFrom,
  convertTo: currency.convertTo,
  toChangeInput: currency.toChangeInput,
  fromChangeInput: currency.fromChangeInput,
  fromCurrencyChange: currency.fromCurrencyChange,
  toCurrencyChange: currency.toCurrencyChange,
  handleSwitch: currency.handleSwitch,
  getRate: currency.getRate
});

const mapDispatchToProps = dispatch => ({
  getRate: (fromCurrency, toCurrency) => {
    dispatch(getRate(fromCurrency, toCurrency));
  },
  toChangeInput: value => {
    dispatch(toChangeInput(value));
  },
  fromChangeInput: value => {
    dispatch(fromChangeInput(value));
  },
  fromCurrencyChange: payload => {
    dispatch(fromCurrencyChange(payload));
  },
  toCurrencyChange: payload => {
    dispatch(toCurrencyChange(payload));
  },
  handleSwitch: payload => {
    dispatch(handleSwitch(payload));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currency);
