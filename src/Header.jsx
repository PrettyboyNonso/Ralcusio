import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";
import { useContext } from "react";
export const Header = ({ setClick }) => {
  const {
    homeNavState,
    setHomeNavState,
    setLoginOrSignup,
    userData,
    userIn,
    signOutUser,
  } = useContext(Devices);

  const DayOfWeek = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  };

  const Months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  const [time, setTime] = useState("00:00");
  const [day, setDay] = useState("---");
  const [month, setMonth] = useState("---");
  const [date, setDate] = useState("0");

  const homeNavClick = () => {
    setHomeNavState(!homeNavState);
    setLoginOrSignup("");
  };

  useEffect(() => {
    const dateVariables = new Date();
    const intervalId = setInterval(() => {
      setTime(dateVariables.toLocaleTimeString());
    }, 1000);

    setDay(dateVariables.getDay());
    setMonth(dateVariables.getMonth());
    setDate(dateVariables.getDate());

    return () => {
      clearInterval(intervalId);
    };
  }, [time, day, date]);
  const timeSplit = time.split(":");
  const timeSplitSpace = time.split(" ");
  const HomeNav = () => {
    return (
      <>
        {userIn ? (
          <div className="userProf">
            <p>hi, {userData.lastname}</p>
            <button onClick={() => (window.location.href = "/Application")}>
              go to app
            </button>
            <button onClick={() => signOutUser()}>logout</button>
          </div>
        ) : (
          <div className="home-nav">
            <div className="login-signup-profile">
              <button onClick={() => setLoginOrSignup("login")}>login</button>
              <button onClick={() => setLoginOrSignup("signup")}>
                sign up
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <header>
        <div className="logo2" onClick={() => (window.location.href = "/")}>
          {/* <h2>
          ralc<span>usio</span>
        </h2> */}
          <img
            src={require("./images/Beige_Black_Bold_Minimalist_Brand_Signature_Logo-removebg-preview.png")}
            alt="logoImg"
          />{" "}
          <h2>alcusio</h2>
        </div>

        <div className="date-div">
          <p>
            {timeSplit[0] < 10 ? `0${timeSplit[0]}:` : `${timeSplit[0]}:`}
            {timeSplit[1]} {timeSplitSpace[1]} . {DayOfWeek[day]} {date}{" "}
            {Months[month]}
          </p>

          <FontAwesomeIcon
            icon={faGear}
            style={{
              fontSize: "20px",
              color: "rgb(78, 78, 78)",
              cursor: "pointer",
            }}
            onClick={setClick}
          />
          <div className="profile-div">
            <FontAwesomeIcon
              icon={faUser}
              style={{ color: "white" }}
              onClick={homeNavClick}
            />
          </div>
        </div>
      </header>
      {homeNavState ? <HomeNav /> : ""}
    </>
  );
};
