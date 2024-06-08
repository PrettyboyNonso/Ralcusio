import { faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faDollarSign,
  faGraduationCap,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faLaptop } from "@fortawesome/free-solid-svg-icons/faLaptop";
import { faVideo } from "@fortawesome/free-solid-svg-icons/faVideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Dates } from "./DateUI";

export const TeacherSchedule = () => {
  const [independentDay, setIndependentDay] = useState("");
  const [independentMonth, setIndependentMonth] = useState("");
  const [independentDate, setIndependentDate] = useState("");

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
  const ScheduleCOmpo = () => {
    return (
      <div className="schedule_component">
        <div className="first-schedule-flex">
          <div className="schedule-time">
            <p>8:00</p>
            <p>pm</p>
          </div>
          <div className="schedule-head">
            <p>upcoming class</p>
            <h2>English Conversation</h2>
            <div className="level">
              <p>intermediate (b2)</p>
            </div>
          </div>
        </div>
        <div className="second-schedule-flex">
          <div className="people-timing">
            <div className="people-heads">
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
            </div>
            <div className="timing-starts">
              {/* <p style={{ textTransform: "capitalize", fontSize: "13px" }}>
                duration - 60 minutes
              </p> */}
              <p>starts in 21 hours : 13 minutes</p>
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
                icon={faDollarSign}
                style={{ color: "rgba(237, 112, 20, 0.8)", fontSize: "16px" }}
              />
              <p>earnings</p>
            </div>
            <h3>$4,245</h3>
            <p>last month $10,000</p>
          </div>
          <div className="analysis-card">
            <div className="analysis-card-head">
              <FontAwesomeIcon
                icon={faVideo}
                style={{ color: "rgba(237, 112, 20, 0.8)", fontSize: "16px" }}
              />
              <p>classes</p>
            </div>

            <h3>61</h3>
            <p>last month 70</p>
          </div>
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

  const LatestPaymentHead = () => {
    return (
      <div className="payment_heads_compo">
        <p>billing to</p>
        <p>status</p>
        <p> date</p>
        <p>amount</p>
        <p>payment for</p>
      </div>
    );
  };

  const LatestsPayments = () => {
    return (
      <div className="latest-payments">
        <p>brooklyn . s</p>
        <p style={{ color: "red" }}>pending</p>
        <p>feb 5, 2023</p>
        <p>$350</p>
        <p>learning</p>
      </div>
    );
  };

  return (
    <div className="teacher-schedule">
      <div className="teacherHeader">
        <h2>dashboard</h2>
        <div className="profileName-img">
          <div className="searchbar-notification">
            <div className="magnifyingglass">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ fontSize: "16px" }}
              />
            </div>
            <div className="notificationBell">
              <FontAwesomeIcon icon={faBell} style={{ fontSize: "16px" }} />
            </div>
          </div>
          <div className="profile-brief">
            <div className="header-img">
              <img src={require("./images/fb.jpg")} alt="" />
            </div>
            <h3>hi, darlington!</h3>
          </div>
        </div>
      </div>
      <div className="app-first-body">
        <div className="created-classes">
          <div className="created-class-head">
            <h2>{`${daysOfTheWeek[independentDay]} ${monthsOfTheYear[independentMonth]} ${independentDate}`}</h2>
            <p>see all schedules</p>
          </div>
          <ScheduleCOmpo />
          <ScheduleCOmpo />
          <div className=" responsive">
            <Dates color={"rgb(226, 226, 226)"} />
            <Analysis />
          </div>
          <div className="latest-payment-head">
            <h2>latest payments</h2>
            <p>see all payments</p>
          </div>
          <LatestPaymentHead />
          <LatestsPayments />
          <LatestsPayments />
          <LatestsPayments />
          <LatestsPayments />
        </div>
        <div className="calender">
          <Dates color={"rgb(226, 226, 226)"} />
          <Analysis />
        </div>
      </div>
    </div>
  );
};
