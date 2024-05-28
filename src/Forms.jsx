import { useContext } from "react";
import { LoginStateHandler } from "./Hero";
import { Devices } from "./App";
import { ColorRing } from "react-loader-spinner";
export const LoginForm = () => {
  const { loginFormRef, loginErrorMessage, isLoading } = useContext(Devices);
  const { loginSubmit, incorrectEmail, incorrectPassword } =
    useContext(LoginStateHandler);
  return (
    <div className="log-in">
      <form action="POST" ref={loginFormRef} onSubmit={loginSubmit}>
        <label htmlFor="Email">Email</label>
        <input type="email" placeholder="Enter Email" name="loginEmail" />
        {incorrectEmail && (
          <p
            style={{
              color: "red",
              marginTop: "-1.5em",
              marginBottom: "1em",
              fontFamily: "Karla, sans-serif",
              fontSize: "14px",
            }}
          >
            Make sure you write a valid email address
          </p>
        )}
        <label htmlFor="Email">Enter Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          name="loginPassword"
        />
        {incorrectPassword && (
          <p
            style={{
              color: "red",
              marginTop: "-1.5em",
              marginBottom: "1em",
              fontFamily: "Karla, sans-serif",
              fontSize: "14px",
            }}
          >
            Make sure you enter a password
          </p>
        )}

        <p
          style={{
            color: "red",
            marginTop: "-1.5em",
            marginBottom: "1em",
            fontFamily: "Karla, sans-serif",
            fontSize: "14px",
          }}
        >
          {loginErrorMessage}
        </p>

        <button
          type="submit"
          style={{ cursor: isLoading ? "text" : "pointer" }}
          disabled={isLoading ? true : false}
        >
          login
          {isLoading && (
            <ColorRing
              visible={true}
              height="25"
              width="25"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#808080", "#f47e60", "#f8b26a", "#ffffff", "#ff0000"]}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export const SignupForm = () => {
  const { isLoading } = useContext(Devices);

  const {
    signupRef,
    signupSubmit,
    incorrectSignup,
    firestoreErrorMessage,
    successMessage,
    signupIsloading,
  } = useContext(LoginStateHandler);

  return (
    <div className="sign-up">
      <form action="POST" ref={signupRef} onSubmit={signupSubmit}>
        <label htmlFor="name">First name</label>
        <input type="text" placeholder="Enter First Name" name="firstname" />
        <label htmlFor="name">Last name</label>
        <input type="text" placeholder="Enter Last Name" name="lastname" />
        <label htmlFor="Email">Email</label>
        <input type="email" placeholder="Enter Email" name="signupEmail" />
        <label htmlFor="account">
          What Type Of Account Do You Wish To Open
        </label>
        <select name="accountType" id="">
          <option value="Teacher Account">Teacher Account</option>
          <option value="Student Account">Student Account</option>
        </select>

        {incorrectSignup && (
          <p
            style={{
              color: "red",
              marginTop: "-0.5em",
              marginBottom: "1em",
              fontFamily: "Karla, sans-serif",
              fontSize: "14px",
            }}
          >
            No field should be left empty
          </p>
        )}
        <p
          style={{
            color: "red",
            marginTop: "-0.5em",
            marginBottom: "1em",
            fontFamily: "Karla, sans-serif",
            fontSize: "14px",
          }}
        >
          {firestoreErrorMessage}
        </p>
        <p
          style={{
            color: "Green",
            marginTop: "-0.5em",
            marginBottom: "1em",
            fontFamily: "Karla, sans-serif",
            fontSize: "14px",
          }}
        >
          {successMessage}
        </p>

        <button style={{ cursor: "pointer" }}>
          Continue
          {signupIsloading && (
            <ColorRing
              visible={true}
              height="25"
              width="25"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#808080", "#f47e60", "#f8b26a", "#ffffff", "#ff0000"]}
            />
          )}
        </button>
      </form>
    </div>
  );
};

export const SecondSignupForm = () => {
  const { isLoading } = useContext(Devices);

  const {
    secondSignupRef,
    secondSignupSubmit,
    incorrectSignup,
    successMessage,
    passwordMatch,
    signupSuccessfully,
    firestoreErrorMessage,
  } = useContext(LoginStateHandler);

  return (
    <div className="sign-up">
      <form
        action="POST"
        ref={secondSignupRef}
        onSubmit={secondSignupSubmit}
        style={{ marginTop: "2.5em" }}
      >
        <label htmlFor="" style={{ marginBottom: "0.5em" }}>
          What is your date of birth?
        </label>
        <input type="date" name="date" />
        <label htmlFor="">password</label>
        <input type="password" placeholder="Enter A Password" name="password" />
        <label htmlFor="">confirm password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmpassword"
        />

        {incorrectSignup && (
          <p
            style={{
              color: "red",
              marginTop: "-0.5em",
              marginBottom: "1em",
              fontFamily: "Karla, sans-serif",
              fontSize: "14px",
            }}
          >
            No field should be left empty
          </p>
        )}
        <p
          style={{
            color: "red",
            marginTop: "-0.5em",
            marginBottom: "1em",
            fontFamily: "Karla, sans-serif",
            fontSize: "14px",
          }}
        >
          {passwordMatch}
        </p>
        <p
          style={{
            color: "red",
            marginTop: "-0.5em",
            marginBottom: "1em",
            fontFamily: "Karla, sans-serif",
            fontSize: "14px",
          }}
        >
          {firestoreErrorMessage}
        </p>
        <p
          style={{
            color: "Green",
            marginTop: "-0.5em",
            marginBottom: "1em",
            fontFamily: "Karla, sans-serif",
            fontSize: "14px",
          }}
        >
          {successMessage}
        </p>

        <button style={{ cursor: "pointer" }}>
          Sign Up
          {signupSuccessfully && (
            <ColorRing
              visible={true}
              height="25"
              width="25"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#808080", "#f47e60", "#f8b26a", "#ffffff", "#ff0000"]}
            />
          )}
        </button>
      </form>
    </div>
  );
};
