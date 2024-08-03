import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef } from "react";
import { Devices } from "./App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export const ResponsiveSignIn = () => {
  const {
    dateState,
    setDateState,
    ResponsivefirstNameRef,
    ResponsivelastnameRef,
    ResponsivepasswordRef,
    ResponsiveEmailRef,
    ResponsiveconfirmPasswordRef,
    ResponsiveFinishFunc,
    marginState,
    loginFunc,
    dispatchMargin,
    nameError,
    genderError,
    accountTypeError,
    StateFunc,
    DateFunc,
    FinishError,
    setAccountType,
    accountTypeState,
    ResponsiveNameFunc,
    dispatch,
    ResponsiveGenderFunc,
    ResponsivegenderRef,
    dateError,
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
                    : "1px solid black",
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
                    : "1px solid black",
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
    <div className="signin-side">
      {marginState.margin === 0 && (
        <div className="register-child">
          <div className="sign-in-head">
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{
                marginBottom: "0em",
                fontSize: "20px",
                color: "#ed7014",
                cursor: "pointer",
              }}
              onClick={() => dispatch({ type: "LOGIN" })}
            />
            <h2>register</h2>
            <p>
              register and explore a unique learning system, connect with best
              tutors, friends and learning communities
            </p>
          </div>
          <div className="signin-btn">
            <button onClick={() => dispatchMargin({ type: "INCREASE" })}>
              get started
            </button>
          </div>
        </div>
      )}

      {marginState.margin === 100 && (
        <div className="register-child">
          <div className="sign-in-head">
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{
                marginBottom: "0em",
                fontSize: "20px",
                color: "#ed7014",
                cursor: "pointer",
              }}
              onClick={() => dispatchMargin({ type: "DECREASE" })}
            />
            <h2>what is your name?</h2>

            <div className="name-form">
              <input
                type="text"
                placeholder="First name"
                ref={ResponsivefirstNameRef}
              />
              <input
                type="text"
                placeholder="Last name"
                ref={ResponsivelastnameRef}
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
            <button onClick={ResponsiveNameFunc}>continue</button>
          </div>
        </div>
      )}

      {marginState.margin === 200 && (
        <div className="register-child">
          <div className="sign-in-head">
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{
                marginBottom: "0em",
                fontSize: "20px",
                color: "#ed7014",
                cursor: "pointer",
              }}
              onClick={() => dispatchMargin({ type: "DECREASE" })}
            />
            <h2>tell us your gender</h2>
            <form action="" className="gender-form" ref={ResponsivegenderRef}>
              <div className="genders-html-div">
                <label htmlFor="">male</label>
                <input type="radio" name="gender" value="male" id="male" />
              </div>
              <div>
                <label htmlFor="">female</label>
                <input type="radio" name="gender" value="female" id="female" />
              </div>
              <div>
                <label htmlFor="">I prefer not to say</label>
                <input type="radio" name="gender" value="custom" id="custom" />
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
            <button onClick={ResponsiveGenderFunc}>continue</button>
          </div>
        </div>
      )}

      {marginState.margin === 300 && (
        <div className="register-child">
          <div className="sign-in-head">
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{
                marginBottom: "0em",
                fontSize: "20px",
                color: "#ed7014",
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
      )}

      {marginState.margin === 400 && (
        <div className="register-child">
          <div className="sign-in-head">
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{
                marginBottom: "0em",
                fontSize: "20px",
                color: "#ed7014",
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
      )}
      {marginState.margin === 500 && (
        <div className="register-child">
          <div className="sign-in-head">
            <FontAwesomeIcon
              icon={faAngleLeft}
              style={{
                marginBottom: "0em",
                fontSize: "20px",
                color: "#ed7014",
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
                  ref={ResponsiveEmailRef}
                />
              </div>
              <div>
                <label htmlFor="">password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  ref={ResponsivepasswordRef}
                />
              </div>
              <div>
                <label htmlFor="">confirm password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  ref={ResponsiveconfirmPasswordRef}
                />
              </div>
              <p
                style={{
                  color: "red",
                  display: FinishError ? "block" : "none",
                  textAlign: "center",
                }}
              >
                you either left an empty field or both passwords are not a match
              </p>
            </form>
          </div>
          <div className="signin-btn">
            <button onClick={ResponsiveFinishFunc}>finish</button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ResponsiveLogin = () => {
  const ResponsiveLoginEmail = useRef(null);
  const Responsivepassword = useRef(null);
  const { dispatch, logUser } = useContext(Devices);
  const handleLogin = (e) => {
    e.preventDefault();
    logUser(
      ResponsiveLoginEmail?.current?.value,
      Responsivepassword?.current?.value
    );
  };
  return (
    <div className="login-side">
      <div className="login-form-head">
        <p>login into your account</p>
      </div>
      <form action="">
        <div>
          <label htmlFor="">email</label>
          <div className="input-icons">
            <input
              placeholder="Enter your email address"
              type="email"
              ref={ResponsiveLoginEmail}
            />
            <FontAwesomeIcon
              icon={faUser}
              style={{
                position: "absolute",
                top: "1.1em",
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
              ref={Responsivepassword}
            />
            <FontAwesomeIcon
              icon={faLock}
              style={{
                position: "absolute",
                top: "1.1em",
                left: "0.3em",
                color: "#ed7014",
              }}
            />
          </div>
        </div>
        <button onClick={(e) => handleLogin(e)}>login</button>
        <p onClick={() => dispatch({ type: "REGISTER" })}>
          do not have an account? register
        </p>
        <p>forgot password?</p>
      </form>
    </div>
  );
};
