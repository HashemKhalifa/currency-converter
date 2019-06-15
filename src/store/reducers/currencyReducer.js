import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FROM_CHANGE_INPUT,
  TO_CHANGE_INPUT,
  FROM_CURRENCY_CHANGE,
  TO_CURRENCY_CHANGE,
  SWITCH_BETWEEN
} from "../actions/types";
import { convert } from "../../utils/currencyUtils";

export default function(state, { type, payload }) {
  switch (type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        data: payload,
        isFetched: true
      };
    case SWITCH_BETWEEN:
      return {
        ...state,
        to: state.from,
        from: state.to,
        convertTo: state.convertFrom,
        convertFrom: state.convertTo,
      };
    case HANDEL_ERROR:
      return {
        ...state,
        error: payload
      };
    case FROM_CHANGE_INPUT:
      return {
        ...state,
        to: payload
          ? convert({ amount: payload, state, mode: "from" })
          : payload,
        from: payload
      };
    case TO_CHANGE_INPUT:
      return {
        ...state,
        from: payload
          ? convert({ amount: payload, state, mode: "to" })
          : payload,
        to: payload
      };
    case TO_CURRENCY_CHANGE:
      return {
        ...state,
        convertTo: payload || state.convertTo
      };

    case FROM_CURRENCY_CHANGE:
      return {
        ...state,
        convertFrom: payload || state.convertFrom
      };

    default:
      return state || {};
  }
}
