import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Devices } from "./App";

export function Logout() {
  return (
    <div>
      {/* <p>logout</p> */}
      <FontAwesomeIcon
        icon={faArrowRightToBracket}
        style={{
          fontSize: "17px",
        }}
      />
    </div>
  );
}
