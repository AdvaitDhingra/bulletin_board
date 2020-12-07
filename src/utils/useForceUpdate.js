import React from "react";

const useForceUpdate = () => {
  const [, forceUpdate] = React.useState();

  return React.useCallback(() => {
    forceUpdate((s) => !s);
  }, []);
};

export default useForceUpdate;
