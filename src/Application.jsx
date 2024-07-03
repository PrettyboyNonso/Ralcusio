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
import MessageClickProvider from "./MessageClickProvider";
import { FooterComponent } from "./FooterComponent";
import { StudentClass } from "./StudentClass";

export const Application = ({ handleWheel, handleTarget }) => {
  const { userData, signOutUser, setActiveLinkId, activeLinkId, handleClick } =
    useContext(Devices);

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

  const AccountType = () => {
    return (
      <div className="account-type">
        <div className="set-up-steps">
          <p>step 2/3</p>
        </div>
        <div className="setup-div-head">
          <p>choose your preferred account type</p>
        </div>
        <div className="type-of-account-div">
          <div className="type-of-account-child">
            <div>
              <img
                src={require("./images/undraw_mathematics_4otb-removebg-preview.png")}
                alt=""
              />
            </div>
            <p>learner account</p>
          </div>
          <div className="type-of-account-child">
            <div>
              <img
                src={require("./images/undraw_Teacher_re_sico-removebg-preview.png")}
                alt=""
              />
            </div>
            <p>tutor account</p>
          </div>
        </div>
        <button>continue</button>
      </div>
    );
  };

  const ProfileImageSetUp = () => {
    return (
      <div className="profile-setup-div">
        <div className="set-up-steps">
          <p>step 3/3</p>
        </div>
        <div className="profile-image-head">
          <p>add a profile picture</p>
        </div>
        <div className="profile-picture-placeholder">
          <img
            src={require("./images/966-9665317_placeholder-image-person-jpg-removebg-preview.png")}
            alt=""
          />
        </div>
        <div className="profile-btns">
          <button>skip</button>
          <button>continue</button>
        </div>
      </div>
    );
  };

  const NameHeadline = () => {
    return (
      <div className="name-headline-div">
        <div className="profile-image-head">
          <p>start by telling us your name</p>
        </div>
        <div className="set-up-steps">
          <p>step 1/3</p>
        </div>
        <div className="name-headline">
          <form action="">
            <div>
              <label htmlFor="">first name</label>
              <input type="text" placeholder="First name" />
            </div>
            <div>
              <label htmlFor="">last name</label>
              <input type="text" placeholder="Last name" />
            </div>
            <div>
              <label htmlFor="">headline</label>
              <input
                type="text"
                placeholder="Write a brief description about yourself "
              />
            </div>
            <button>continue</button>
          </form>
        </div>
      </div>
    );
  };

  const FinishSetup = () => {
    return (
      <div className="finish-setup">
        <div className="setup-div">
          <h2>finish setting up your account</h2>
          <div className="flex-item">
            <NameHeadline />
            <AccountType />
            <ProfileImageSetUp />
          </div>
        </div>
      </div>
    );
  };

  return (
    <MessageClickProvider>
      <div className="application">
        <FinishSetup />
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
                  color:
                    activeLinkId === "message" ? "white" : "rgb(78, 78, 78)",
                  fontSize: "17px",
                }}
              />
              <p>messages</p>
            </div>

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
              style={{
                color: "white",
                fontSize: "17px",
                paddingRight: "0.8em",
              }}
            />
          </div>
        </aside>
        <FooterComponent />
        {activeLinkId === "house" && <AppSide />}
        {activeLinkId === "message" && (
          <Message handleTarget={handleTarget} handleWheel={handleWheel} />
        )}
        {activeLinkId === "book" &&
          userData.accountType === "Teacher Account" && <CreateClass />}
        {activeLinkId === "book" &&
          userData?.accountType === "Student Account" && <StudentClass />}
        {activeLinkId === "payment" && <PaymentPage />}
        {activeLinkId === "profile" && <Profile />}
      </div>
    </MessageClickProvider>
  );
};
