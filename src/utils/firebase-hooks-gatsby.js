import firebase from "gatsby-plugin-firebase";
import { useReducer, useEffect } from "react";

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

var defaultState = function (defaultValue) {
  return {
    loading: defaultValue === undefined || defaultValue === null,
    value: defaultValue,
  };
};
var reducer = function () {
  return function (state, action) {
    switch (action.type) {
      case "error":
        return __assign({}, state, {
          error: action.error,
          loading: false,
          value: undefined,
        });
      case "reset":
        return defaultState(action.defaultValue);
      case "value":
        return __assign({}, state, {
          error: undefined,
          loading: false,
          value: action.value,
        });
      default:
        return state;
    }
  };
};
var useLoadingValue = function (getDefaultValue) {
  var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
  var _a = useReducer(reducer(), defaultState(defaultValue)),
    state = _a[0],
    dispatch = _a[1];
  var reset = function () {
    var defaultValue = getDefaultValue ? getDefaultValue() : undefined;
    dispatch({ type: "reset", defaultValue: defaultValue });
  };
  var setError = function (error) {
    dispatch({ type: "error", error: error });
  };
  var setValue = function (value) {
    dispatch({ type: "value", value: value });
  };
  return {
    error: state.error,
    loading: state.loading,
    reset: reset,
    setError: setError,
    setValue: setValue,
    value: state.value,
  };
};

var useAuthState = function () {
  const auth = firebase.auth ? firebase.auth() : null;
  var _a = useLoadingValue(function () {
      return auth ? auth.currentUser : null;
    }),
    error = _a.error,
    loading = _a.loading,
    setError = _a.setError,
    setValue = _a.setValue,
    value = _a.value;
  useEffect(
    function () {
      if (!auth) return;
      var listener = auth.onAuthStateChanged(setValue, setError);
      return function () {
        listener();
      };
    },
    // eslint-disable-next-line
    [auth]
  );
  return [value, loading, error];
};

export { useAuthState };
