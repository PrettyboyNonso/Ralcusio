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
import { useContext, useEffect } from "react";
import { Message } from "./Message";
import { Devices } from "./App";
import { Profile } from "./Profile";
import { TeacherSchedule } from "./TeacherSchedule";
import { StudentSchedule } from "./StudentSchedule";
import { CreateClass } from "./CreateClass";
import MessageClickProvider from "./MessageClickProvider";
import { FooterComponent } from "./FooterComponent";
import { StudentClass } from "./StudentClass";
import { EditProfile } from "./EditProfile";
import { SearchUser } from "./SearchUser";

export const Application = ({ handleWheel, handleTarget }) => {
  const {
    signOutUser,
    setActiveLinkId,
    activeLinkId,
    handleClick,
    invisible,
    userDataState,
    visible,
  } = useContext(Devices);

  // Handles Clicked SideBar
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
    if (userDataState.accountType === "Teacher Account") {
      if (visible) {
        return <SearchUser />;
      } else {
        return <TeacherSchedule />;
      }
    } else {
      if (visible) {
        return <SearchUser />;
      } else {
        return <StudentSchedule />;
      }
    }
  };

  return (
    <MessageClickProvider>
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
                  userDataState.accountType === "Teacher Account"
                    ? faChartLine
                    : faHouse
                }
                style={{
                  color: activeLinkId === "house" ? "white" : "rgb(78, 78, 78)",
                  fontSize: "17px",
                }}
              />
              <p>
                {userDataState.accountType === "Teacher Account"
                  ? "dashboard"
                  : "home"}
              </p>
            </div>

            <div className="links" id="message" onClick={handleClick}>
              <FontAwesomeIcon
                icon={faMessage}
                style={{
                  color:
                    activeLinkId === "message" ? "white" : "rgb(78, 78, 78)",
                  fontSize: "17px",
                }}
              />
              <p>messages</p>
            </div>

            <div className="links" id="book" onClick={handleClick}>
              <FontAwesomeIcon
                icon={faBookBookmark}
                style={{
                  color: activeLinkId === "book" ? "white" : "rgb(78, 78, 78)",
                  fontSize: "17px",
                }}
              />
              <p>classes</p>
            </div>

            <div className="links" id="profile" onClick={handleClick}>
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  color:
                    activeLinkId === "profile" ? "white" : "rgb(78, 78, 78)",
                  fontSize: "17px",
                }}
              />
              <p>profile</p>
            </div>
          </div>

          <div className="logout" onClick={() => signOutUser()}>
            <p>log out</p>
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              style={{
                color: "white",
                fontSize: "17px",
                paddingRight: "0.8em",
              }}
            />
          </div>
        </aside>

        <FooterComponent />
        {/* Replaces The Page Contents According To The ActiveLInkId */}
        {activeLinkId === "house" && <AppSide />}
        {activeLinkId === "message" && (
          <Message handleTarget={handleTarget} handleWheel={handleWheel} />
        )}
        {activeLinkId === "book" &&
          userDataState.accountType === "Teacher Account" && <CreateClass />}
        {activeLinkId === "book" &&
          userDataState?.accountType === "Student Account" && <StudentClass />}

        {invisible && activeLinkId === "profile" && <Profile />}
        {!invisible && <EditProfile />}
      </div>
    </MessageClickProvider>
  );
};
