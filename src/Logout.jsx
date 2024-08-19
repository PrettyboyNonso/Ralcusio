import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export function Logout() {
  return (
    <div className="logout-responsive">
      <p>logout</p>
      <FontAwesomeIcon icon={faArrowRightToBracket} />
    </div>
  );
}
