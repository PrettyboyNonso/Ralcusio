import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
export const Dates = ({ color, className = "" }) => {
  const [dayOfWeek, setDayOfWeek] = useState([]);
  const [days, setDays] = useState([]);
  const [currentMonthState, setcurrentMonth] = useState("");
  const [currentYearState, setCurrentYear] = useState("");

  const [firstDayDateState, setFirstDayDate] = useState("");
  const [dateFuncState, setDatFunc] = useState(new Date());
  const [currentDay, setCurrentday] = useState(dateFuncState.getDate());
  const [beginningDate, setBeginningDate] = useState("");
  const [incrementCounterState, setIncrementCounter] = useState(
    dateFuncState.getMonth()
  );

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

  const setCalender = () => {
    const daysArray = [];
    let beginningOfMonth = new Date(
      dateFuncState.getFullYear(),
      dateFuncState.getMonth()
    );
    setBeginningDate(beginningOfMonth);
    const currentMonth = dateFuncState.getMonth();
    const currentYear = dateFuncState.getFullYear();
    const firstDayDate = beginningOfMonth.getDay();
    setFirstDayDate(firstDayDate);
    const firstDayDateArray = [];
    for (let i = 0; i <= firstDayDate; i++) {
      if (firstDayDate === 0) {
        for (let j = 0; j < 6; j++) {
          firstDayDateArray.push(j);
        }
      } else if (firstDayDate !== 0) {
        for (let k = 1; k < firstDayDate; k++) {
          firstDayDateArray.push(k);
        }
        break;
      }
    }
    setcurrentMonth(currentMonth);
    setCurrentYear(currentYear);
    while (beginningOfMonth.getMonth() === currentMonth) {
      daysArray.push(beginningOfMonth.getDate());
      beginningOfMonth.setDate(beginningOfMonth.getDate() + 1);
    }
    setDayOfWeek(firstDayDateArray);
    setDays(daysArray);
  };

  const forwardClick = () => {
    let newDate = new Date(2024, incrementCounterState + 1);
    setIncrementCounter(incrementCounterState + 1);
    setDatFunc(newDate);
    console.log(incrementCounterState);
  };
  const backwardClick = () => {
    let newDate = new Date(2024, incrementCounterState - 1);
    setIncrementCounter(incrementCounterState - 1);
    setDatFunc(newDate);
    console.log(incrementCounterState);
  };

  useEffect(() => {
    setCalender();
  }, [dateFuncState]);

  const MyDate = () => {
    return (
      <div className="dates">
        {dayOfWeek.map((_, index) => (
          <div className="days" key={index}>
            <p></p>
          </div>
        ))}
        {days.map((day, index) => (
          <div className="days" key={index}>
            <p>{day}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`calenderUi ${className}`}
      style={{ border: `1px solid ${color}` }}
    >
      <div className="calenderUi-head">
        <h3>{`${monthsOfTheYear[currentMonthState]} ${currentYearState}`}</h3>
        <div className="arrow-calender">
          <FontAwesomeIcon
            icon={faCaretLeft}
            style={{
              fontSize: "22px",
              color: "#ed7014",
              cursor: "pointer",
            }}
            onClick={backwardClick}
          />
          <FontAwesomeIcon
            icon={faCaretRight}
            style={{ fontSize: "22px", cursor: "pointer" }}
            onClick={forwardClick}
          />
        </div>
      </div>
      <div className="calender-secondHead">
        <div className="days">
          <p>mon</p>
        </div>
        <div className="days">
          <p>tue</p>
        </div>
        <div className="days">
          <p>wed</p>
        </div>
        <div className="days">
          <p>thur</p>
        </div>
        <div className="days">
          <p>fri</p>
        </div>
        <div className="days">
          <p>sat</p>
        </div>
        <div className="days">
          <p>sun</p>
        </div>
      </div>
      <MyDate />
    </div>
  );
};
