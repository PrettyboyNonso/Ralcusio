import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleDown,
  faAngleUp,
  faCircleXmark,
  faGraduationCap,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faLaptop } from "@fortawesome/free-solid-svg-icons/faLaptop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Dates } from "./DateUI";
import { Devices } from "./App";
import { LoadingHome } from "./LoadingHome";

export const TeacherSchedule = () => {
  const [independentDay, setIndependentDay] = useState("");
  const [independentMonth, setIndependentMonth] = useState("");
  const [independentDate, setIndependentDate] = useState("");
  const [openUp, setOpenUp] = useState(false);
  const {
    userDataState,
    searchInput,
    findPeople,
    searchPeopleLoading,
    classArray,
  } = useContext(Devices);
  const [upcommingClasses, setUpcommingclasses] = useState(null);
  // const [classArray, setClassArray] = useState(
  //   JSON.parse(sessionStorage.getItem("classArray"))
  // );

  const getUpcommingClasses = () => {
    const todaysDate = new Date();
    const upcomingClass = classArray?.flatMap((value) => {
      return value?.curriculum?.filter(
        (myClass) =>
          (new Date(myClass?.startDate) >= todaysDate &&
            new Date(myClass?.endDate) > todaysDate) ||
          (new Date(myClass?.startDate) <= todaysDate &&
            new Date(myClass?.endDate) > todaysDate)
      );
    });

    console.log(upcomingClass);
    return upcomingClass;
  };

  useEffect(() => {
    const upcomming = getUpcommingClasses();
    setUpcommingclasses(upcomming);
  }, [classArray]);
  const monthsOfTheYear = {
    0: "january",
    1: "february",
    2: "march",
    3: "april",
    4: "may",
    5: "june",
    6: "july",
    7: "august",
    8: "september",
    9: "october",
    10: "november",
    11: "december",
  };

  const daysOfTheWeek = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  useEffect(() => {
    const currentDate = new Date();
    setIndependentDay(currentDate.getDay());
    setIndependentMonth(currentDate.getMonth());
    setIndependentDate(currentDate.getDate());
  }, []);
  const ScheduleCOmpo = ({ classes }) => {
    const [classesUp, setclassesUp] = useState(false);
    return (
      <div className="schedule_component">
        <div className="first-schedule-flex">
          <div className="schedule-time">
            <p>
              {new Date(classes?.startDate)
                .toLocaleTimeString()
                .split(":")
                .splice(0, 2)
                .join(":")}
            </p>
            <p>
              {new Date(classes?.startDate)
                .toLocaleTimeString()
                .split(" ")
                .splice(1)}
            </p>
          </div>
          <div className="schedule-head">
            <p>upcoming class</p>
            <h2>
              {classArray.map(
                (value, index) =>
                  value?.classId === classes?.classId && value?.courseName
              )}
            </h2>
            <div className="level">
              <p>{classes?.title}</p>
            </div>
            <div
              className="responsive-timing"
              style={{ display: classesUp ? "flex" : "none" }}
            >
              {(() => {
                if (new Date(classes?.startDate) <= new Date()) {
                  return (
                    <div className="start-class">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{
                          fontSize: "25px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                      <button>start class</button>
                    </div>
                  );
                } else {
                  const now = new Date();
                  const startDate = new Date(classes?.startDate);

                  // Use UTC time to avoid time zone issues
                  const timeDiff = startDate.getTime() - now.getTime(); // Difference in milliseconds

                  const totalMinutes = Math.round(timeDiff / (1000 * 60)); // Convert to minutes
                  const hours = Math.floor(totalMinutes / 60); // Get the number of hours
                  const minutes = totalMinutes % 60; // Get the remaining minutes

                  return (
                    <p>{`Starts in ${hours} hour${
                      hours !== 1 ? "s" : ""
                    } : ${minutes} minute${minutes !== 1 ? "s" : ""}`}</p>
                  );
                }
              })()}
            </div>
          </div>
        </div>
        <div className="second-icon-flex">
          <FontAwesomeIcon
            icon={classesUp ? faAngleUp : faAngleDown}
            style={{ fontSize: "24px" }}
            onClick={() => setclassesUp(!classesUp)}
          />
        </div>
        <div className="second-schedule-flex">
          <div className="people-timing">
            {/* <div className="people-heads">
              <div className="heads-people">
                <img src={require("./images/girl-2961959_1280.jpg")} alt="" />
              </div>
              <div className="heads-people">
                <img src={require("./images/adult-1851571_1280.jpg")} alt="" />
              </div>
              <div className="heads-people">
                <img src={require("./images/man-3803551_1280.jpg")} alt="" />
              </div>
              <div className="heads-people">
                <img src={require("./images/smile-2072907_1280.jpg")} alt="" />
              </div>
            </div> */}
            <div className="timing-starts">
              {(() => {
                if (new Date(classes?.startDate) <= new Date()) {
                  return (
                    <div className="start-class">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        style={{
                          fontSize: "25px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                      <button>start class</button>
                    </div>
                  );
                } else {
                  const now = new Date();
                  const startDate = new Date(classes?.startDate);
                  const timeDiff = startDate - now; // Difference in milliseconds

                  // Convert milliseconds to total minutes
                  const totalMinutes = Math.round(timeDiff / (1000 * 60));

                  // Calculate hours and remaining minutes
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;

                  return (
                    <p>{`starts in ${hours} hour${
                      hours !== 1 ? "s" : ""
                    } : ${minutes} minute${minutes !== 1 ? "s" : ""}`}</p>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Analysis = () => {
    return (
      <div className="analysis">
        <div className="analysis-head">
          <h1>this month</h1>
        </div>
        <div className="analysis-flex">
          <div className="analysis-card">
            <div className="analysis-card-head">
              <FontAwesomeIcon
                icon={faGraduationCap}
                style={{ color: "rgba(237, 112, 20, 0.8)", fontSize: "16px" }}
              />
              <p>students</p>
            </div>
            <h3>300</h3>
            <p>last month 289</p>
          </div>
          <div className="analysis-card">
            <div className="analysis-card-head">
              <FontAwesomeIcon
                icon={faLaptop}
                style={{ color: "rgba(237, 112, 20, 0.8)", fontSize: "16px" }}
              />
              <p>profile visits</p>
            </div>
            <h3>530</h3>
            <p>last month 850</p>
          </div>
        </div>
      </div>
    );
  };

  const openSearch = () => {
    setOpenUp(!openUp);
  };
  return (
    <>
      {searchPeopleLoading && <LoadingHome />}
      <div className="teacher-schedule">
        <div className="teacherHeader">
          <h2>welcome back😊</h2>
          <div className="profileName-img">
            <div className="searchbar-notification">
              <div className="search">
                <input
                  type="text"
                  placeholder="search for teachers or fellows"
                  ref={searchInput}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{
                    position: "absolute",
                    right: "0.5em",
                    top: "0.5em",
                    color: "rgb(41, 41, 41)",
                    cursor: "pointer",
                    backgroundColor: "white",
                  }}
                  onClick={findPeople}
                />
              </div>
              <div className=" responsive-search" onClick={openSearch}>
                <FontAwesomeIcon
                  icon={openUp ? faXmark : faSearch}
                  style={{ fontSize: "16px", cursor: "pointer" }}
                />
              </div>
              <div className="notificationBell">
                <FontAwesomeIcon icon={faBell} style={{ fontSize: "16px" }} />
              </div>
            </div>

            <div className="profile-brief">
              <div className="header-img">
                <img src={userDataState?.profileUrl} alt="" />
              </div>
              <h3>hi, {userDataState?.firstName}!</h3>
            </div>
          </div>
        </div>

        {openUp && (
          <div className="responsive-search-two">
            <input
              type="text"
              placeholder="search for teachers or fellows"
              ref={searchInput}
            />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                right: "0.5em",
                top: "0.8em",
                color: "rgb(41, 41, 41)",
                cursor: "pointer",
                backgroundColor: "white",
              }}
              onClick={findPeople}
            />
          </div>
        )}
        <div className="app-first-body">
          <div className="created-classes">
            <div className="created-class-head">
              <h2>{`${daysOfTheWeek[independentDay]} ${monthsOfTheYear[independentMonth]} ${independentDate}`}</h2>
              {upcommingClasses?.length !== 0 && <p>see all schedules</p>}
            </div>
            {upcommingClasses?.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  marginTop: "4em",
                  minHeight: "20vh",
                  fontFamily: "Karla, sans-serif",
                  fontSize: "14px",
                }}
              >
                No upcoming classes, enjoy the silence🥂
              </p>
            ) : (
              upcommingClasses?.map((value, index) => (
                <ScheduleCOmpo classes={value} />
              ))
            )}
            {/* <div className=" responsive">
              <Analysis />
            </div> */}
          </div>
          <div className="calender">
            <Dates color={"rgb(226, 226, 226)"} />
            {/* <Analysis /> */}
          </div>
        </div>
      </div>
    </>
  );
};
