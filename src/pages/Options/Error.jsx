import React from "react";
import Loader from "./Loader";
import ConnectionErrorAnimation from "./NoInternetConnection";

export default () => {
  return <Loader json={ConnectionErrorAnimation} text="Network Error!" />;
};
