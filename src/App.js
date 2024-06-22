import "./App.css";
import { Application } from "./Application";
import { Home } from "./Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "./backend";
import { useRef } from "react";
export const Devices = React.createContext();
function App() {
  const [targetElement, setTargetElement] = useState("");
  const [homeNavState, setHomeNavState] = useState(false);
  const [loginORsignup, setLoginOrSignup] = useState("login");
  const [permission, setpermission] = useState(false);
  const [microphonesState, setMicrophone] = useState([]);
  const [speakerState, setSpeaker] = useState([]);
  const [videoState, setVideo] = useState([]);
  const [userData, setUserdata] = useState({});
  const [userId, setUserId] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [userIn, setUserIn] = useState(false);
  const [emptyField, setEmptyField] = useState("");
  const [classSuccess, setclassSuccess] = useState("");
  const [classError, setclassError] = useState("");
  const [classList, setclassList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [classLoaded, setClassLoaded] = useState(false);
  const [classView, setClassView] = useState(false);
  const [classViewLoading, setClassViewLoading] = useState(true);
  const [activeLinkId, setActiveLinkId] = useState("");
  const loginFormRef = useRef();
  const classFormRef = useRef();

  async function classToDB(category, className, userId, firstname, lastname) {
    try {
      const classref = await addDoc(collection(database, "classes"), {
        category: category,
        className: className,
        userId: userId,
        firstname: firstname,
        lastname: lastname,
        Studentcount: 0,
        createdAt: serverTimestamp(),
      });
      console.log(classref);
      setclassError("");
      setclassSuccess("Class has been added successfully");
    } catch (err) {
      console.log(err);
      setclassSuccess("");
      setclassError(err.message);
    }
  }

  // Function to set up a real-time listener to the classes collection
  async function listenToClasses() {
    const userData = sessionStorage.getItem("user");
    const dataJson = await JSON.parse(userData);
    const dataId = dataJson.id;
    const classCollectionRef = collection(database, "classes");
    const q = query(
      classCollectionRef,
      where("userId", "==", dataId),
      orderBy("createdAt", "desc")
    );
    let classData = [];

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        classData = [];
        snapshot.docs.map((doc, index) => {
          if (index === 0) {
            sessionStorage.setItem("element-clicked-Id-curri", doc.id);
          }
          const dataGotten = doc.data();
          const dataGottenId = doc.id;
          const dataObject = {
            id: dataGottenId,
            ...dataGotten,
          };
          classData.push(dataObject);
          console.log(classList);
        });
        setclassList(classData);
        setClassViewLoading(false);
      },
      (error) => {
        console.error("Error listening to classes collection:", error);
      }
    );

    return unsubscribe;
  }

  useEffect(() => {
    if (userIn) {
      listenToClasses();
    }
  }, [userIn]);

  const handleClassAdd = (e) => {
    e.preventDefault();
    setClassLoaded(true);
    if (
      classFormRef.current.className.value === "" ||
      classFormRef.current.classCategory.value === ""
    ) {
      setTimeout(() => {
        setClassLoaded(false);
        setEmptyField("Fill all input fields");
      }, 1000);
    } else {
      setEmptyField("");
      classToDB(
        classFormRef.current.classCategory.value,
        classFormRef.current.className.value,
        userData.id,
        userData.firstname,
        userData.lastname
      );

      setTimeout(() => {
        setClassLoaded(false);
      }, 1000);

      setTimeout(() => {
        setClassView(false);
        setclassSuccess("");
      }, 3000);
    }
  };

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

  const promptUser = async () => {
    const constraints = {
      audio: "true",
      video: "false",
    };
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      mediaStream.getTracks().forEach((track) => track.stop());

      setpermission(true);
      console.log(permission);
    } catch (err) {
      console.log(err);
      setpermission(false);
    }
  };

  //this function logs a user in
  async function logUserIn(email, password) {
    setIsLoading(true);
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

      listenToClasses();
      window.location.href = "./Application";
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setLoginErrorMessage(error.message);
    }
  }

  //this function signs a user out

  async function signOutUser() {
    await signOut(auth);
    // sessionStorage.removeItem("userIn");
    // sessionStorage.removeItem("user");
    // sessionStorage.removeItem("element-clicked-Id-curri");
    sessionStorage.clear();
    window.location.href = "/";
  }

  //this function gets the user's devices
  async function getDevice() {
    let microphones = [];
    let video = [];
    let speaker = [];
    const devices = await navigator.mediaDevices.enumerateDevices();
    devices.forEach((device) => {
      if (device.kind === "audioinput") {
        microphones.push(device.label);
      } else if (device.kind === "audiooutput") {
        speaker.push(device.label);
      } else if (device.kind === "videoinput") {
        video.push(device.label);
      }
    });
    if (JSON.stringify(microphones) !== JSON.stringify(microphonesState)) {
      setMicrophone(microphones);
    } else if (JSON.stringify(speaker) !== JSON.stringify(speakerState)) {
      setSpeaker(speaker);
    } else if (JSON.stringify(video) !== JSON.stringify(videoState)) {
      setVideo(video);
    }

    // console.log(microphonesState, speakerState, videoState);
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
    getDevice();
  }, []);
  return (
    <Devices.Provider
      value={{
        microphonesState,
        speakerState,
        videoState,
        permission,
        setHomeNavState,
        homeNavState,
        loginORsignup,
        setLoginOrSignup,
        promptUser,
        userData,
        setUserdata,
        loginFormRef,
        logUserIn,
        loginErrorMessage,
        userIn,
        signOutUser,
        classFormRef,
        emptyField,
        handleClassAdd,
        classSuccess,
        classError,
        listenToClasses,
        classList,
        isLoading,
        classLoaded,
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
