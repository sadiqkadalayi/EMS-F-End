import React from "react";

function AlertBox({alertMsg, clssName}) {
  return (
    <>
      <div className={`alert ${clssName}`} role="alert">
        {alertMsg}
      </div>
    </>
  );
}

export default AlertBox;
