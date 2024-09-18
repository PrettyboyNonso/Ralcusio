import { faAngleLeft, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useContext, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Devices } from "./App";
import { ResponsiveSignIn } from "./ResponsiveLogin";
import { ResponsiveLogin } from "./ResponsiveLogin";
import { LOading } from "./ClassComponents/LOading";
export const Homepage = forwardRef((_, Myref) => {
  const loginEmail = useRef(null);
  const loginPassword = useRef(null);
  const {
    dateState,
    setDateState,
    UserState,
    dispatchUserState,
    accountTypeState,
    setAccountType,
    firstNameRef,
    lastnameRef,
    genderRef,
    emailRef,
    passwordRef,
    handleSignIn,
    state,
    marginState,
    loginFunc,
    dispatchMargin,
    nameError,
    NameFunc,
    genderError,
    GenderFunc,
    accountTypeError,
    StateFunc,
    DateFunc,
    confirmPasswordRef,
    FinishError,
    FinishFunc,
    dispatch,
    logUser,
    dateError,
    signInLoading,
    signUpLoading,
  } = useContext(Devices);

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
    <>
      <div className="homepage-login-div">
        <div className="log-in-signup-div">
          {state.activeBar === "login" && (
            <div className="login-side">
              <div className="login-form-head">
                <h2>login</h2>
                <p>login into your account</p>
              </div>
              {signInLoading ? (
                <LOading />
              ) : (
                <form action="" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="">email</label>
                    <div className="input-icons">
                      <input
                        placeholder="Enter your email address"
                        type="email"
                        ref={loginEmail}
                      />
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
                      <input
                        placeholder="Enter your password"
                        type="password"
                        ref={loginPassword}
                      />
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
                  <button
                    onClick={() =>
                      logUser(
                        loginEmail.current.value,
                        loginPassword.current.value
                      )
                    }
                  >
                    login
                  </button>
                  <p>forgot password?</p>
                </form>
              )}
            </div>
          )}
          {state.activeBar === "register" && (
            <div className="signin-side">
              <>
                {signUpLoading && <LOading />}
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
                      register and explore a unique learning system, connect
                      with best tutors, friends and learning communities
                    </p>
                  </div>
                  <div className="signin-btn">
                    <button
                      onClick={() => dispatchMargin({ type: "INCREASE" })}
                    >
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
                    <div className="name-form">
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
                    </div>
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
                    <div className="gender-form" ref={genderRef}>
                      <div>
                        <label htmlFor="">male</label>
                        <input
                          type="radio"
                          name="gender"
                          value="male"
                          id="male"
                        />
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
                    </div>
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
                      ref={Myref}
                    />
                    <p
                      style={{
                        color: "red",
                        textTransform: "unset",
                        display: dateError ? "block" : "none",
                      }}
                    >
                      You can not have an empty field!
                    </p>
                    <div className="signin-btn">
                      <button onClick={DateFunc}>continue</button>
                    </div>
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

                    <div className="email-form">
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
                        you either left an empty field or both passwords are not
                        a match
                      </p>
                    </div>
                  </div>
                  <div className="signin-btn">
                    <button onClick={FinishFunc}>finish</button>
                  </div>
                </div>{" "}
              </>
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

      <div className="responsive-login-page">
        <div className="responsive-logo">
          <img
            src={require("./images/Beige_Black_Bold_Minimalist_Brand_Signature_Logo-removebg-preview.png")}
            alt=""
          />
        </div>

        {state.activeBar === "login" && <ResponsiveLogin />}

        {state.activeBar === "register" && <ResponsiveSignIn />}
      </div>
    </>
  );
});
