import { faAngleLeft, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReducer, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Homepage() {
  const [dateState, setDateState] = useState(new Date());
  const [accountTypeState, setAccountType] = useState("");
  const [nameError, setNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [accountTypeError, setAccountTypeError] = useState(false);
  const [FinishError, setFinishError] = useState(false);
  const [state, dispatch] = useReducer(reducerFn, { activeBar: "login" });
  const firstNameRef = useRef(null);
  const lastnameRef = useRef(null);
  const genderRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [UserState, dispatchUserState] = useReducer(userStateReducer, {
    userUniqueId: "",
    firstName: "",
    lastName: "",
    gender: "",
    accountType: "",
    dateOfBirth: "",
    emailAddress: "",
    password: "",
    profileUrl: "",
    coverUrl: "",
    followers: "",
    following: "",
    bio: "",
    headline: "",
    education: "",
  });

  const [marginState, dispatchMargin] = useReducer(reducerMarginFn, {
    margin: 0,
  });

  function userStateReducer(state, action) {
    switch (action.type) {
      case "FIRST":
        state.firstName = firstNameRef.current.value;
        state.lastName = lastnameRef.current.value;
        return state;
      case "SECOND":
        state.gender = genderRef.current.querySelector(
          'input[name="gender"]:checked'
        )?.value;
        return state;
      case "THIRD":
        state.accountType = accountTypeState;
        return state;
      case "FOURTH":
        state.dateOfBirth = dateState;
        return state;
      case "FIFTH":
        state.emailAddress = emailRef.current.value;
        state.password = passwordRef.current.value;
        return state;
      default:
        return state;
    }
  }

  const ValidateFirst = () => {
    if (firstNameRef.current.value !== "" && lastnameRef.current.value !== "") {
      setNameError(false);
      return true;
    } else {
      setNameError(true);
    }
  };

  const ValidateSecond = () => {
    if (
      genderRef.current.querySelector('input[name="gender"]:checked')?.value
    ) {
      setGenderError(false);
      return true;
    } else {
      setGenderError(true);
    }
  };

  const ValidateThird = () => {
    if (accountTypeState) {
      setAccountTypeError(false);
      return true;
    } else {
      setAccountTypeError(true);
    }
  };

  const ValidateFifth = () => {
    if (
      passwordRef.current.value === confirmPasswordRef.current.value &&
      (passwordRef.current.value !== "") & (emailRef.current.value !== "")
    ) {
      setFinishError(false);
      return true;
    } else {
      setFinishError(true);
      return false;
    }
  };

  const NameFunc = () => {
    const Validate = ValidateFirst();
    if (Validate) {
      dispatchUserState({ type: "FIRST" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const GenderFunc = () => {
    const ValidateGender = ValidateSecond();
    if (ValidateGender) {
      dispatchUserState({ type: "SECOND" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const StateFunc = () => {
    const ValidateAccountType = ValidateThird();
    if (ValidateAccountType) {
      dispatchUserState({ type: "THIRD" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const DateFunc = () => {
    dispatchUserState({ type: "FOURTH" });
    dispatchMargin({ type: "INCREASE" });
  };

  const FinishFunc = () => {
    const validateFinish = ValidateFifth();
    if (validateFinish) {
      dispatchUserState({ type: "FIFTH" });
      console.log(UserState);
    }
  };
  function reducerMarginFn(state, action) {
    switch (action.type) {
      case "INCREASE":
        if (state.margin < 500) {
          return { margin: state.margin + 100 };
        } else {
          return { margin: 500 };
        }

      case "DECREASE":
        if (state.margin >= 100) {
          return { margin: state.margin - 100 };
        } else {
          return { margin: state.margin };
        }
      case "RESET":
        return { margin: 0 };

      default:
        return state;
    }
  }

  function reducerFn(state, action) {
    switch (action.type) {
      case "LOGIN":
        return { activeBar: "login" };
      case "REGISTER":
        return { activeBar: "register" };
      default:
        return state;
    }
  }

  const loginFunc = () => {
    dispatch({ type: "LOGIN" });
    dispatchMargin({ type: "RESET" });
  };

  const AccountType = () => {
    const ClickedTutorType = () => {
      setAccountType("Teacher Account");
    };
    const ClickedStudentType = () => {
      setAccountType("Student Account");
    };
    return (
      <div className="account-type">
        <div className="type-of-account-div">
          <div className="type-of-account-child" onClick={ClickedStudentType}>
            <div
              style={{
                border:
                  accountTypeState === "Student Account"
                    ? "1px solid green"
                    : "1px solid white",
              }}
            >
              <img
                src={require("./images/undraw_mathematics_4otb-removebg-preview.png")}
                alt=""
              />
            </div>
            <p>learner account</p>
          </div>
          <div className="type-of-account-child" onClick={ClickedTutorType}>
            <div
              style={{
                border:
                  accountTypeState === "Teacher Account"
                    ? "1px solid green"
                    : "1px solid white",
              }}
            >
              <img
                src={require("./images/undraw_Teacher_re_sico-removebg-preview.png")}
                alt=""
              />
            </div>
            <p>tutor account</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="homepage-login-div">
      <div className="log-in-signup-div">
        {state.activeBar === "login" && (
          <div className="login-side">
            <div className="login-form-head">
              <h2>login</h2>
              <p>login into your account</p>
            </div>
            <form action="">
              <div>
                <label htmlFor="">email</label>
                <div className="input-icons">
                  <input placeholder="Enter your email address" type="email" />
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      position: "absolute",
                      top: "0.8em",
                      left: "0.3em",
                      color: "#ed7014",
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="">password</label>
                <div className="input-icons">
                  <input placeholder="Enter your password" type="password" />
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{
                      position: "absolute",
                      top: "0.8em",
                      left: "0.3em",
                      color: "#ed7014",
                    }}
                  />
                </div>
              </div>
              <button>login</button>
              <p>forgot password?</p>
            </form>
          </div>
        )}
        {state.activeBar === "register" && (
          <div className="signin-side">
            <div
              className="register-child"
              style={{ marginLeft: `-${marginState.margin}%` }}
            >
              <div className="sign-in-head">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{
                    marginBottom: "1em",
                    fontSize: "20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={loginFunc}
                />
                <h2>register</h2>
                <p>
                  register and explore a unique learning system, connect with
                  best tutors, friends and learning communities
                </p>
              </div>
              <div className="signin-btn">
                <button onClick={() => dispatchMargin({ type: "INCREASE" })}>
                  get started
                </button>
              </div>
            </div>
            <div className="register-child">
              <div className="sign-in-head">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{
                    marginBottom: "1em",
                    fontSize: "20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatchMargin({ type: "DECREASE" })}
                />
                <h2>what is your name?</h2>
                <form action="" className="name-form">
                  <input
                    type="text"
                    placeholder="First name"
                    ref={firstNameRef}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    ref={lastnameRef}
                  />
                </form>
                <p
                  style={{
                    color: "red",
                    textTransform: "unset",
                    display: nameError ? "block" : "none",
                  }}
                >
                  You can not have an empty field!
                </p>
              </div>
              <div className="signin-btn">
                <button onClick={NameFunc}>continue</button>
              </div>
            </div>
            <div className="register-child">
              <div className="sign-in-head">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{
                    marginBottom: "1em",
                    fontSize: "20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatchMargin({ type: "DECREASE" })}
                />
                <h2>tell us your gender</h2>
                <form action="" className="gender-form" ref={genderRef}>
                  <div>
                    <label htmlFor="">male</label>
                    <input type="radio" name="gender" value="male" id="male" />
                  </div>
                  <div>
                    <label htmlFor="">female</label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                    />
                  </div>
                  <div>
                    <label htmlFor="">I prefer not to say</label>
                    <input
                      type="radio"
                      name="gender"
                      value="custom"
                      id="custom"
                    />
                  </div>
                </form>
                <p
                  style={{
                    color: "red",
                    textTransform: "unset",
                    display: genderError ? "block" : "none",
                  }}
                >
                  You have to choose a gender!
                </p>
              </div>
              <div className="signin-btn">
                <button onClick={GenderFunc}>continue</button>
              </div>
            </div>
            <div className="register-child">
              <div className="sign-in-head">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{
                    marginBottom: "1em",
                    fontSize: "20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatchMargin({ type: "DECREASE" })}
                />
                <h2>choose your preferred account type</h2>
                <AccountType />
                <p
                  style={{
                    color: "red",
                    textTransform: "unset",
                    display: accountTypeError ? "block" : "none",
                    textAlign: "center",
                  }}
                >
                  You have to choose a preferred account type!
                </p>
              </div>

              <div className="signin-btn">
                <button onClick={StateFunc} className="account-type-btn">
                  continue
                </button>
              </div>
            </div>
            <div className="register-child">
              <div className="sign-in-head">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{
                    marginBottom: "1em",
                    fontSize: "20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatchMargin({ type: "DECREASE" })}
                />
                <h2>what is your date of birth?</h2>

                <DatePicker
                  selected={dateState}
                  onChange={(dateState) => setDateState(dateState)}
                  showYearDropdown
                  maxDate={new Date()}
                  className="date-picker"
                />
              </div>
              <div className="signin-btn">
                <button onClick={DateFunc}>continue</button>
              </div>
            </div>

            <div className="register-child">
              <div className="sign-in-head">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  style={{
                    marginBottom: "1em",
                    fontSize: "20px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => dispatchMargin({ type: "DECREASE" })}
                />
                <h2>enter your email and create a password</h2>

                <form action="" className="email-form">
                  <div>
                    <label htmlFor="">email address</label>
                    <input
                      type="text"
                      placeholder="Enter your email address"
                      ref={emailRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="">password</label>
                    <input
                      type="password"
                      placeholder="Create a password"
                      ref={passwordRef}
                    />
                  </div>
                  <div>
                    <label htmlFor="">confirm password</label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      ref={confirmPasswordRef}
                    />
                  </div>
                  <p
                    style={{
                      color: "red",
                      display: FinishError ? "block" : "none",
                      textAlign: "center",
                    }}
                  >
                    you either left an empty field or both passwords are not a
                    match
                  </p>
                </form>
              </div>
              <div className="signin-btn">
                <button onClick={FinishFunc}>finish</button>
              </div>
            </div>
          </div>
        )}
        <div className="undraw-side">
          <div className="image-undraw">
            <img
              src={require("./images/undraw_Authentication_re_svpt-removebg-preview.png")}
              alt=""
            />
          </div>
          <div className="login-sign-btn">
            <button
              onClick={loginFunc}
              className={
                state.activeBar === "login"
                  ? `undraw-btn-active`
                  : `undraw-normal-btn`
              }
            >
              login
            </button>
            <button
              onClick={() => dispatch({ type: "REGISTER" })}
              className={
                state.activeBar === "register"
                  ? `undraw-btn-active`
                  : `undraw-normal-btn`
              }
            >
              register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
