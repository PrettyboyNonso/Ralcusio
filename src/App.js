import "./App.css";
import { Application } from "./Application";
import { Home } from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "./backend";
import { useRef } from "react";
import Homepage from "./Homepage";
export const Devices = React.createContext();
function App() {
  const [targetElement, setTargetElement] = useState("");
  const [homeNavState, setHomeNavState] = useState(false);
  const [loginORsignup, setLoginOrSignup] = useState("login");
  const [userData, setUserdata] = useState({});
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [userIn, setUserIn] = useState(false);
  const [classView, setClassView] = useState(false);
  const [classViewLoading, setClassViewLoading] = useState(true);
  const [activeLinkId, setActiveLinkId] = useState("");
  const loginFormRef = useRef();
  const classFormRef = useRef();

  const handleTarget = (e) => {
    setTargetElement(e.target);
    console.log(targetElement);
  };

  const handleWheel = (e) => {
    if (targetElement) {
      const messageBody = document.querySelector(".messageBody");
      const chatComponent = document.querySelector(".chatcomponent-div");
      const aside = document.querySelector(".aside");
      const chatBrief = document.querySelector(".chatBrief");
      handleTarget(e);
      if (messageBody && chatBrief && aside && chatComponent) {
        if (messageBody.contains(targetElement)) {
          chatBrief.style.position = "static";
          chatBrief.style.overfolow = "auto";
          chatBrief.style.width = "90%";
          chatComponent.style.position = "fixed";
        } else if (aside.contains(targetElement)) {
          chatComponent.style.position = "fixed";
          chatBrief.style.position = "fixed";
          chatBrief.style.width = "50%";
        } else if (!messageBody.contains(targetElement)) {
          chatBrief.style.position = "fixed";
          chatBrief.style.width = "50%";
          chatComponent.style.position = "static";
        }
      }
    }
  };

  //this function logs a user in
  async function logUserIn(email, password) {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      setLoginErrorMessage("");
      loginFormRef.current.reset();
      const userReference = collection(database, "users");

      const q = query(userReference, where("id", "==", userCred.user.uid));

      const qSnapShots = await getDocs(q);

      qSnapShots.forEach((snap) => {
        sessionStorage.setItem("user", JSON.stringify(snap.data()));
        sessionStorage.setItem("userIn", "true");
      });

      window.location.href = "./Application";
    } catch (error) {
      setLoginErrorMessage(error.message);
    }
  }

  //this function signs a user out

  async function signOutUser() {
    await signOut(auth);
    sessionStorage.clear();
    window.location.href = "/";
  }

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
    const userFound = sessionStorage.getItem("user");
    const userIsLoggedIn = sessionStorage.getItem("userIn");
    const userFoundJson = JSON.parse(userFound);
    setUserdata(userFoundJson);
    setUserIn(userIsLoggedIn);
  }, []);
  return (
    <Devices.Provider
      value={{
        setHomeNavState,
        homeNavState,
        loginORsignup,
        setLoginOrSignup,
        userData,
        setUserdata,
        loginFormRef,
        logUserIn,
        loginErrorMessage,
        userIn,
        signOutUser,
        classFormRef,
        classView,
        setClassView,
        classViewLoading,
        setClassViewLoading,
        setActiveLinkId,
        activeLinkId,
        handleClick,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/Application"
              element={
                <Application
                  handleTarget={handleTarget}
                  handleWheel={handleWheel}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Devices.Provider>
  );
}

export default App;
