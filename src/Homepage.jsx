import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useReducer } from "react";

function Homepage() {
  const [state, dispatch] = useReducer(reducerFn, { activeBar: "login" });
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
            <div className="sign-in-head">
              <h2>register</h2>
              <p>register and take advantage of our great features</p>
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
              <div>
                <label htmlFor="">confirm password</label>
                <div className="input-icons">
                  <input placeholder="Confirm your password" type="password" />
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
              <button>register</button>
            </form>
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
              onClick={() => dispatch({ type: "LOGIN" })}
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
