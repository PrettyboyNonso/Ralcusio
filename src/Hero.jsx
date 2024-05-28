import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faPlus,
  faVideo,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import undraw_one from "./images/undraw_Learning_re_32qv.png";
import undraw_two from "./images/undraw_Knowledge_re_5v9l.png";
import undraw_three from "./images/undraw_Graduation_re_gthn.png";
import undraw_four from "./images/undraw_Online_learning_re_qw08.png";
import undraw_five from "./images/undraw_Teaching_re_g7e3.png";
import undraw_six from "./images/undraw_Developer_activity_re_39tg.png";
import undraw_seven from "./images/undraw_Youtube_tutorial_re_69qc.png";
import React, { useContext, useEffect, useRef, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./backend";
import { database } from "./backend";
import { Devices } from "./App";
import { ColorRing } from "react-loader-spinner";
import { LoginForm, SecondSignupForm, SignupForm } from "./Forms";
import { settings } from "firebase/analytics";
export const LoginStateHandler = React.createContext();
export const Hero = () => {
  const [translate, setTranslate] = useState(0);
  const [visibility, setVisibility] = useState("visible");
  const [inputIn, setInputIn] = useState(true);
  const [meetingClicked, setMettingCliked] = useState(false);
  const [incorrectEmail, setIncorrectEmail] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState("");
  const [incorrectSignup, setIncorrectSignup] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [firestoreErrorMessage, setfirestoreErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [secondSignupState, setSecondSignup] = useState(false);
  const [firstSignupDataState, setFirstSignupData] = useState({});
  const [signupIsloading, setSignupIsloading] = useState(false);
  const [signupSuccessfully, setsignupSuccessfully] = useState(false);

  const inputRef = useRef();
  const signupRef = useRef();
  const secondSignupRef = useRef();
  const { homeNavState, loginORsignup, loginFormRef, logUserIn, isLoading } =
    useContext(Devices);

  // function that checks if a user is currently in the website tab
  document.addEventListener("visibilitychange", () => {
    setVisibility(document.visibilityState);
  });

  // this useeffect controls the automatic scroll on the homepage using the visibility and translate state
  useEffect(() => {
    if (translate < 600 && visibility === "visible") {
      const setIntervalId = setInterval(() => {
        setTranslate(translate + 100);
      }, 3000);

      return () => {
        clearInterval(setIntervalId);
      };
    }
  }, [translate, visibility]);

  // this function controls the meeting link input, it activates the button if an input has a value
  const ListenInput = () => {
    if (inputRef.current.value === "") {
      setInputIn(true);
    } else {
      setInputIn(false);
    }
    console.log(inputIn);
  };

  // this function controls the meetingButton, it displayes and removes an item from the DOM
  const handleMeetingClick = () => {
    setMettingCliked(!meetingClicked);
  };

  //this function sends signup data to my database
  async function sendSignupSubmit(
    firstname,
    lastname,
    email,
    DOB,
    password,
    accountType
  ) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((createdUser) => {
        if (createdUser) {
          addDoc(collection(database, "users"), {
            id: createdUser.uid,
            firstname: firstname,
            lastname: lastname,
            email: email,
            DOB: DOB,
            password: password,
            accountType: accountType,
            createdAt: serverTimestamp(),
          })
            .then(() => {
              console.log("user created");
              setfirestoreErrorMessage("");
              setSuccessMessage(
                "Your account has been created, proceed to login"
              );
              signupRef.current.reset();
            })
            .catch((err) => console.log(err));
        }
      });
    } catch (err) {
      setfirestoreErrorMessage(err.message);
      // console.log(err.message);
      setSuccessMessage("");
    }
  }

  //this function handles the LoginForm
  const loginSubmit = (e) => {
    let emptyEmail = true;
    let emptyPassword = true;
    e.preventDefault();
    if (loginFormRef.current.loginEmail.value === "") {
      emptyEmail = true;
      setIncorrectEmail(true);
    } else if (loginFormRef.current.loginEmail.value !== "") {
      emptyEmail = false;
      setIncorrectEmail(false);
    }
    if (loginFormRef.current.loginPassword.value === "") {
      emptyPassword = true;
      setIncorrectPassword(true);
    } else if (loginFormRef.current.loginPassword.value !== "") {
      emptyPassword = false;
      setIncorrectPassword(false);
    }

    if (!emptyEmail && !emptyPassword) {
      logUserIn(
        loginFormRef.current.loginEmail.value,
        loginFormRef.current.loginPassword.value
      );
    }
  };

  //this function handles the first signup form

  const signupSubmit = (e) => {
    e.preventDefault();
    setSignupIsloading(true);
    let hasEmptyField = false;
    const firstSignupData = {
      firstname: "",
      lastname: "",
      email: "",
      accountType: "",
    };

    if (
      signupRef.current.firstname.value === "" ||
      signupRef.current.lastname.value === "" ||
      signupRef.current.signupEmail.value === "" ||
      signupRef.current.accountType.value === ""
    ) {
      hasEmptyField = true;
      setIncorrectSignup(true);
    } else {
      setIncorrectSignup(false);
    }

    if (!hasEmptyField) {
      firstSignupData.firstname = signupRef.current.firstname.value;
      firstSignupData.lastname = signupRef.current.lastname.value;
      firstSignupData.email = signupRef.current.signupEmail.value;
      firstSignupData.accountType = signupRef.current.accountType.value;
      setFirstSignupData(firstSignupData);
    }
    setTimeout(() => {
      setSignupIsloading(false);
      setSecondSignup(true);
    }, 1000);
  };

  // this function completes the signup form

  const secondSignupSubmit = (e) => {
    let emptyForms = true;
    let passwordAreTheSame = false;
    e.preventDefault();
    setsignupSuccessfully(true);
    console.log(firstSignupDataState);
    if (
      secondSignupRef.current.date.value === "" ||
      secondSignupRef.current.password.value === "" ||
      secondSignupRef.current.confirmpassword.value === ""
    ) {
      setTimeout(() => {
        setsignupSuccessfully(false);
        setIncorrectSignup(true);
      }, 1000);
    } else {
      setIncorrectSignup(false);
      emptyForms = false;
    }
    if (
      secondSignupRef.current.password.value !==
      secondSignupRef.current.confirmpassword.value
    ) {
      setTimeout(() => {
        setsignupSuccessfully(false);
        setPasswordMatch("Both Passwords Must Be A Match");
      }, 1000);
    } else {
      setPasswordMatch("");
      passwordAreTheSame = true;
    }

    if (!emptyForms && passwordAreTheSame) {
      sendSignupSubmit(
        firstSignupDataState.firstname,
        firstSignupDataState.lastname,
        firstSignupDataState.email,
        secondSignupRef.current.date.value,
        secondSignupRef.current.password.value,
        firstSignupDataState.accountType
      );
      setTimeout(() => {
        setsignupSuccessfully(false);
      }, 1000);
    }
  };

  return (
    <section className="hero-section">
      {homeNavState &&
      (loginORsignup === "login" || loginORsignup === "signup") ? (
        <div className="login-signup">
          <div className="login-head">
            <h2>welcome</h2>
            <p>please enter your details and start working</p>
          </div>

          <div className="login-signup-body">
            <div className="scroll-login">
              <p>log in</p>
              <p>sign up</p>
            </div>
            <div className="scrollbar">
              <div
                className="scrollbar-one"
                style={{
                  backgroundColor:
                    loginORsignup === "login" ? "#ed7014" : "#cfcfcf",
                }}
              ></div>
              <div
                className="scrollbar-two"
                style={{
                  backgroundColor:
                    loginORsignup === "signup" ? "#ed7014" : "#cfcfcf",
                }}
              ></div>
            </div>
            <div className="login-scroll-body">
              <LoginStateHandler.Provider
                value={{
                  incorrectEmail,
                  incorrectPassword,
                  loginSubmit,
                  signupRef,
                  signupSubmit,
                  firestoreErrorMessage,
                  successMessage,
                  incorrectSignup,
                  secondSignupRef,
                  secondSignupSubmit,
                  passwordMatch,
                  signupIsloading,
                  signupSuccessfully,
                }}
              >
                {loginORsignup === "login" ? (
                  <LoginForm />
                ) : (
                  <>
                    {secondSignupState ? <SecondSignupForm /> : <SignupForm />}
                  </>
                )}
              </LoginStateHandler.Provider>
            </div>
          </div>
        </div>
      ) : (
        <div className="first-hero-div">
          <h2>empower learning, anywhere, anytime</h2>
          <p>
            Welcome to our online virtual classroom, where learning is limitless
            and completely free. Access high-quality resources, engage in
            interactive lessons, and connect with educators and peers globally.
            Join us today and start your educational journey!
          </p>
          <div className="btn-for-hero">
            <button onClick={handleMeetingClick}>
              <FontAwesomeIcon
                icon={faVideo}
                style={{
                  color: "white",
                  marginRight: ".5em",
                  fontSize: "17px",
                }}
              />
              <p>start a meeting</p>
            </button>
            <form action="" style={{ display: "flex" }}>
              <input
                type="text"
                placeholder="Enter code to join "
                ref={inputRef}
                onChange={ListenInput}
              />
              <button
                className="second-btn"
                disabled={inputIn}
                style={{
                  color: inputIn ? "rgb(150, 150, 150)" : "rgb(237, 112, 20)",

                  cursor: inputIn ? "text" : "pointer",
                }}
              >
                join meeting
              </button>
            </form>
          </div>
          <div
            className="meeting-box"
            style={{ display: meetingClicked ? "flex" : "none" }}
          >
            <FontAwesomeIcon
              icon={faX}
              style={{
                alignSelf: "flex-end",

                paddingTop: ".5em",
                paddingRight: ".8em",
                cursor: "pointer",
              }}
              onClick={handleMeetingClick}
            />
            <div className="meeting-type">
              <FontAwesomeIcon icon={faLink} />
              <p>create meeting for later</p>
            </div>
            <div className="meeting-type">
              <FontAwesomeIcon icon={faPlus} />
              <p>start instant meeting</p>
            </div>
          </div>
          <div className="learn-more">
            <p>
              <a href="google">learn more about</a> ralcusio
            </p>
          </div>
        </div>
      )}

      <div className="second-hero-div">
        <div className="undraw-flex">
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_one} alt="learning person" />
            <h4>Flexible Learning Opportunities</h4>
            <p>
              Embrace diverse educational experiences that adapt to your needs.
            </p>
          </div>
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_two} alt="learning person" />
            <h4>Global Collaboration Platform</h4>
            <p>
              Connect with learners worldwide and foster cross-cultural
              understanding.
            </p>
          </div>
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_three} alt="learning person" />
            <h4>Tech-Enhanced Learning</h4>
            <p>
              Harness technology to maximize learning outcomes and engagement.
            </p>
          </div>
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_four} alt="learning person" />
            <h4>Remote Access Education</h4>
            <p>
              Access educational resources and instruction from any location.
            </p>
          </div>
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_five} alt="learning person" />
            <h4>Virtual Classroom Experience</h4>
            <p>Engage in interactive learning environments from anywhere.</p>
          </div>
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_six} alt="learning person" />
            <h4>Self-Paced Study Experience</h4>
            <p>
              Customize your learning journey to suit your schedule and
              preferences.
            </p>
          </div>
          <div className="undraw" style={{ translate: `-${translate}%` }}>
            <img src={undraw_seven} alt="learning person" />
            <h4>E-Learning Revolution</h4>
            <p>
              Join the digital evolution of education for innovative learning
              opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
