import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faBookBookmark,
  faHouse,
  // faPeopleArrows,
  faUser,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Message } from "./Message";
import { Curriculum } from "./Curriculum";
import { Devices } from "./App";
import { Profile } from "./Profile";
import { TeacherSchedule } from "./TeacherSchedule";
import { faPaypal } from "@fortawesome/free-brands-svg-icons/faPaypal";
import { StudentSchedule } from "./StudentSchedule";
import { CreateClass } from "./CreateClass";
import { PaymentPage } from "./PaymentPage";
export const Application = ({ handleWheel, handleTarget }) => {
  const [activeLinkId, setActiveLinkId] = useState("");
  const { userData, signOutUser } = useContext(Devices);

  const handleClick = (e) => {
    let clickedElement = e.target.closest(".links");
    if (clickedElement) {
      const clickedElementId = clickedElement.id;
      setActiveLinkId(clickedElementId);
      sessionStorage.setItem("activeLinkId", clickedElementId);
      if (clickedElement.classList.contains("active")) {
        //   do nothing
      } else if (!clickedElement.classList.contains("active")) {
        const allLinks = Array.from(document.querySelectorAll(".links"));
        allLinks.map(
          (value) =>
            value.classList.contains("active") &&
            value.classList.remove("active")
        );

        clickedElement.classList.add("active");
      }
    }
    console.log(activeLinkId);
  };

  useEffect(() => {
    const storedId = sessionStorage.getItem("activeLinkId");
    if (storedId) {
      setActiveLinkId(storedId);
      const activeLinkElement = document.getElementById(storedId);
      console.log(storedId);
      console.log(activeLinkElement);
      if (activeLinkElement) {
        activeLinkElement.classList.add("active");
      }
    } else {
      setActiveLinkId("house");
      sessionStorage.setItem("activeLinkId", "house");
    }
  }, []);

  const AppSide = () => {
    return userData.accountType === "Teacher Account" ? (
      <TeacherSchedule />
    ) : (
      <StudentSchedule />
    );
  };

  return (
    <div className="application">
      <aside className="aside" onWheel={handleWheel}>
        <div className="logo" onClick={() => (window.location.href = "/")}>
          <img
            src={require("./images/Beige_Black_Bold_Minimalist_Brand_Signature_Logo-removebg-preview.png")}
            alt="logo"
          />
        </div>
        <div className="navs">
          <div
            className={`links ${activeLinkId === "house" ? "active" : ""}`}
            id="house"
            onClick={handleClick}
          >
            <FontAwesomeIcon
              icon={
                userData.accountType === "Teacher Account"
                  ? faChartLine
                  : faHouse
              }
              style={{
                color: activeLinkId === "house" ? "white" : "rgb(78, 78, 78)",
                fontSize: "17px",
              }}
            />
            <p>
              {userData.accountType === "Teacher Account"
                ? "dashboard"
                : "home"}
            </p>
          </div>

          <div className="links" id="message" onClick={handleClick}>
            <FontAwesomeIcon
              icon={faMessage}
              style={{
                color: activeLinkId === "message" ? "white" : "rgb(78, 78, 78)",
                fontSize: "17px",
              }}
            />
            <p>messages</p>
          </div>

          {userData.accountType === "Teacher Account" && (
            <div
              className={`links ${activeLinkId === "payment" ? "active" : ""}`}
              id="payment"
              onClick={handleClick}
            >
              <FontAwesomeIcon
                icon={faPaypal}
                style={{
                  color:
                    activeLinkId === "payment" ? "white" : "rgb(78, 78, 78)",
                  fontSize: "17px",
                }}
              />
              <p>payments</p>
            </div>
          )}

          <div className="links" id="book" onClick={handleClick}>
            <FontAwesomeIcon
              icon={faBookBookmark}
              style={{
                color: activeLinkId === "book" ? "white" : "rgb(78, 78, 78)",
                fontSize: "17px",
              }}
            />
            <p>
              {userData.accountType === "Teacher Account"
                ? "classes"
                : "curriculum"}
            </p>
          </div>

          <div className="links" id="profile" onClick={handleClick}>
            <FontAwesomeIcon
              icon={faUser}
              style={{
                color: activeLinkId === "profile" ? "white" : "rgb(78, 78, 78)",
                fontSize: "17px",
              }}
            />
            <p>profile</p>
          </div>

          {/* <div className="links" id="arrow" onClick={handleClick}>
            <FontAwesomeIcon
              icon={faPeopleArrows}
              style={{
                color: activeLinkId === "arrow" ? "white" : "rgb(78, 78, 78)",
                fontSize: "17px",
              }}
            />
            <p>Groups</p>
          </div> */}
        </div>

        <div className="logout" onClick={() => signOutUser()}>
          <p>log out</p>
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            style={{ color: "white", fontSize: "17px", paddingRight: "0.8em" }}
          />
        </div>
      </aside>
      {activeLinkId === "house" && <AppSide />}
      {activeLinkId === "message" && (
        <Message handleTarget={handleTarget} handleWheel={handleWheel} />
      )}
      {activeLinkId === "book" && <CreateClass />}
      {activeLinkId === "payment" && <PaymentPage />}
      {activeLinkId === "profile" && <Profile />}
    </div>
  );
};
