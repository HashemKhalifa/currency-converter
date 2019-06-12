import axios from "axios";
import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FROM_CHANGE_INPUT,
  TO_CHANGE_INPUT,
  FROM_CURRENCY_CHANGE,
  TO_CURRENCY_CHANGE
} from "./types";

/**
 * @description Action responsible for error handling
 * @param payload
 * @returns {{type: string, payload: *}}
 */
const handleError = payload => ({
  type: HANDEL_ERROR,
  payload
});

/**
 *
 * @param fromCurrency
 * @param toCurrency
 * @returns {Promise<AxiosResponse<T>>}
 */
export function getRateRequest(fromCurrency, toCurrency) {
  // Node API KEY
  const API = process.env.REACT_APP_API_SECERET;
  const url = `https://free.currconv.com/api/v7/convert?q=${fromCurrency}_${toCurrency}&compact=ultra&apiKey=${API}`;
  return axios.get(url);
}

/**
 *
 * @param fromCurrency
 * @param toCurrency
 * @returns {Function}
 */
export const getRate = (fromCurrency, toCurrency) => async dispatch => {
  try {
    const { data } = await getRateRequest(fromCurrency, toCurrency);
    dispatch({
      type: FETCH_CURRENCY,
      payload: data
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const fromChangeInput = payload => {
  return {
    type: FROM_CHANGE_INPUT,
    payload
  };
};

export const toChangeInput = payload => {
  return {
    type: TO_CHANGE_INPUT,
    payload
  };
};

/**
 *
 * @param payload
 * @returns {Function}
 */
export const fromCurrencyChange = payload => (dispatch, getState) => {
  getRateRequest(payload, getState().currency.convertTo).then(res => {
    dispatch({
      type: FETCH_CURRENCY,
      payload: res.data
    });

    dispatch({
      type: FROM_CURRENCY_CHANGE,
      payload: payload
    });

    dispatch({
      type: FROM_CHANGE_INPUT,
      payload: getState().currency.from
    });
  }).catch(error => {
    dispatch(handleError(error));
  });
};

/**
 *
 * @param payload
 * @returns {Function}
 */
export const toCurrencyChange = payload => (dispatch, getState) => {
  getRateRequest(getState().currency.convertFrom, payload)
    .then(res => {
      dispatch({
        type: FETCH_CURRENCY,
        payload: res.data
      });

      dispatch({
        type: TO_CURRENCY_CHANGE,
        payload: payload
      });

      dispatch({
        type: FROM_CHANGE_INPUT,
        payload: getState().currency.from
      });
    })
    .catch(error => {
      dispatch(handleError(error));
    });
};
