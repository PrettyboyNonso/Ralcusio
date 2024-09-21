import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Dates } from "./DateUI";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCalendarDays,
  faCircleCheck,
  faCreditCard,
  faPeopleLine,
} from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";

import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { database } from "./backend";
import { CoursePlanning } from "./ClassComponents/CoursePlanning";
import { CoursePricing } from "./ClassComponents/CoursePricing";
import { AllClasses } from "./ClassComponents/AllClasses";
import { CourseSchedule } from "./ClassComponents/CourseSchedule";
import { ScheduleUi } from "./ClassComponents/ScheduleUI";
import { PricingUi } from "./ClassComponents/PricingUi";
import { LOading } from "./ClassComponents/LOading";

export const CreateClass = () => {
  const [activeNav, setActiveNav] = useState("");
  const [typeOfClass, setTypeOfClass] = useState("");
  const [coursePlanningError, setCoursePlanningError] = useState(false);
  const [pricePlanningError, setPricePlanningError] = useState(false);
  const [reducerState, dispatch] = useReducer(reducer, { toggleOn: true });
  const [courseStartdate, setCourseStartDate] = useState("");
  const [courseEndDate, setCourseEndDate] = useState("");
  const [startdate, setStartDate] = useState("");
  const [Enddate, setEndDate] = useState("");
  const [courseNameState, setCourseNamestate] = useState("");
  const [courseDescstate, setCourseDescstate] = useState("");
  const [courseAreastate, setCourseAreastate] = useState("");
  const [BatchState, setCourseBatchstate] = useState("");
  const courseName = useRef(null);
  const courseDescription = useRef(null);
  const pricingRef = useRef(null);
  const selectRef = useRef(null);
  const curriculumTitleRef = useRef(null);
  const curriculumDescriptionRef = useRef(null);
  const [curriculumStartDate, setCurriculumStartDate] = useState("");
  const [curriculumEndDate, setCurriculumEndDate] = useState("");
  const [classObjectState, setclassObject] = useState(
    JSON.parse(sessionStorage.getItem("classObject"))
  );
  const [createCLassLoading, setcreateClassLoading] = useState(false);

  let classObject = {};

  const handlePricePlanning = () => {
    if (!pricingRef.current?.value.trim() <= 0 && startdate && Enddate) {
      const newClassObject = JSON.parse(sessionStorage.getItem("classObject"));
      newClassObject.price = `${selectRef.current?.value} ${pricingRef.current?.value}`;
      newClassObject.PricingstartDate = startdate;
      newClassObject.PricingendDate = Enddate;
      sessionStorage.setItem("classObject", JSON.stringify(newClassObject));
      console.log(JSON.parse(sessionStorage.getItem("classObject")));
      setActiveNav("schedule-planning");
      sessionStorage.setItem("activeNav", "schedule-planning");
    } else {
      setPricePlanningError(true);
    }
  };

  const handleCoursePlanning = (e) => {
    e.preventDefault();
    if (
      courseName.current?.value.trim() <= 0 ||
      courseDescription.current?.value?.trim() <= 0 ||
      !courseAreastate ||
      !BatchState
    ) {
      setCoursePlanningError(true);
    } else {
      classObject.courseName = courseName.current?.value;
      classObject.classId = v4();
      classObject.courseDescription = courseDescription.current?.value;
      classObject.courseArea = courseAreastate.label;
      classObject.batchState = BatchState.label;
      classObject.curriculum = [];
      classObject.participants = [];
      if (reducerState.toggleOn) {
        classObject.coursePrice = 0;
        setActiveNav("schedule-planning");
        sessionStorage.setItem("activeNav", "schedule-planning");
      } else {
        setActiveNav("price-planning");
        sessionStorage.setItem("activeNav", "pricing-planning");
      }
      sessionStorage.setItem("classObject", JSON.stringify(classObject));
      console.log(JSON.parse(sessionStorage.getItem("classObject")));
    }
  };

  const { userDataState } = useContext(Devices);

  function reducer(reducerState) {
    return { toggleOn: !reducerState.toggleOn };
  }

  const handleClassNavCursor = (e) => {
    const clickedElem = e.target.closest(".first-flex-create-type-sec");
    const activeElementId = clickedElem.id;
    const activeElem = document.getElementById(activeElementId);
    if (activeElem) {
      setActiveNav(activeElementId);
      sessionStorage.setItem("activeNav", activeElementId);
      if (activeElem.classList.contains("active-create-navigation")) {
        // do nothing
      } else if (!activeElem.classList.contains("active-create-navigation")) {
        document
          .querySelectorAll(".first-flex-create-type-sec")
          .forEach((value, index) => {
            if (value.classList.contains("active-create-navigation")) {
              value.classList.remove("active-create-navigation");
            }
          });
        activeElem.classList.add("active-create-navigation");
      }
    }
  };

  const ToggleBtn = ({ toggleFunc, toggleState }) => {
    return (
      <div
        className={`toggle ${toggleState ? "toggle-on" : ""}`}
        onClick={toggleFunc}
      >
        <div className="toggle-circle"></div>
      </div>
    );
  };

  useEffect(() => {
    sessionStorage.setItem("courseArea", courseAreastate);
  }, [courseAreastate]);

  useEffect(() => {
    sessionStorage.setItem("courseBatch", BatchState);
  }, [BatchState]);

  useEffect(() => {
    sessionStorage.setItem("courseName", courseNameState);
    courseName.current?.focus();
  }, [courseNameState]);

  useEffect(() => {
    sessionStorage.setItem("courseDesc", courseDescstate);
    courseDescription.current?.focus();
    const length = courseDescription.current?.value.length;
    courseDescription.current?.setSelectionRange(length, length);
  }, [courseDescstate]);

  const retainInput = () => {
    setCourseNamestate(courseName.current?.value);
  };

  const retainDescInput = () => {
    setCourseDescstate(courseDescription.current?.value);
  };

  const handleChangeInSelect = (selectedOption) => {
    setCourseAreastate(selectedOption);
  };

  const handleChangeBatch = (selectedOption) => {
    setCourseBatchstate(selectedOption);
  };

  const publishCurriculum = (e) => {
    e.preventDefault();

    if (
      curriculumStartDate !== "" &&
      curriculumEndDate !== "" &&
      curriculumDescriptionRef.current?.value.trim().length > 0 &&
      curriculumTitleRef.current?.value.trim().length > 0
    ) {
      let currentObj = JSON.parse(sessionStorage.getItem("classObject"));
      let curriObj = {
        id: v4(),
        title: curriculumTitleRef.current?.value,
        description: curriculumDescriptionRef.current?.value,
        startDate: curriculumStartDate,
        // .toString()
        // .split(" ")
        // .splice(0, 4)
        // .join(" "),
        endDate: curriculumEndDate,
        classId: currentObj?.classId,
        tutorId: userDataState?.userId,
      };
      currentObj?.curriculum.push(curriObj);
      setclassObject(currentObj);
      sessionStorage.setItem("classObject", JSON.stringify(currentObj));
    }

    console.log(JSON.parse(sessionStorage.getItem("classObject")));
  };

  async function createClassAction(e) {
    e.preventDefault();
    if (classObjectState?.curriculum.length !== 0) {
      setcreateClassLoading(true);
      let classObj = JSON.parse(sessionStorage.getItem("classObject"));
      const latestObject = classObj?.curriculum.reduce(
        (latest, currentDate) => {
          return new Date(latest?.startDate) < new Date(currentDate?.startDate)
            ? latest
            : currentDate;
        }
      );
      const recentObject = classObj?.curriculum.reduce(
        (latest, currentDate) => {
          return new Date(latest?.startDate) > new Date(currentDate?.startDate)
            ? latest
            : currentDate;
        }
      );

      classObj.courseStartdate = latestObject?.startDate;
      // .toString()
      // .split(" ")
      // .splice(0, 4)
      // .join(" ");
      classObj.courseEndDate = recentObject.endDate;
      // .toString()
      // .split(" ")
      // .splice(0, 4)
      // .join(" ");
      setclassObject(classObj);
      sessionStorage.setItem("classObject", JSON.stringify(classObj));
      sessionStorage.setItem("activeNav", "all-classes");
      try {
        const dbRef = await addDoc(collection(database, "classes"), {
          id: userDataState?.userId,
          ...classObj,
        });

        setcreateClassLoading(false);
      } catch (error) {
        setcreateClassLoading(false);
      }

      setActiveNav("all-classes");
      sessionStorage.removeItem("classObject");
    }
  }

  function deleteCurriculum(Itemid) {
    let currentObj = JSON.parse(sessionStorage.getItem("classObject"));
    const newCurriculum = currentObj?.curriculum?.filter(
      (item) => item?.id !== Itemid
    );
    currentObj.curriculum = newCurriculum;
    setclassObject(currentObj);
    sessionStorage.setItem("classObject", JSON.stringify(currentObj));
  }

  useEffect(() => {
    const sessionStored = sessionStorage.getItem("activeNav");
    if (sessionStored) {
      setActiveNav(sessionStored);
      const alreadyClickedElem = document.getElementById(activeNav);
      if (alreadyClickedElem) {
        alreadyClickedElem.classList.add("active-create-navigation");
      }
    } else {
      sessionStorage.setItem("activeNav", "create-your-course");
      setActiveNav("create-your-course");
    }
  }, [activeNav]);

  return (
    <div className="create-class-teacher">
      <div className="create-class-head-teacher">
        <div className="teacher-create-class-h2">
          <h2>create class</h2>
          <small>draft</small>
        </div>
        <div className="teacher-create-btn">
          <button className="save-btn">save to Drafts</button>
          {/* <button className="publish-btn">publish</button> */}
        </div>
      </div>
      <div className="create-class-navigation">
        <p>
          <span>classes</span> / {document.getElementById(activeNav)?.innerText}
        </p>
      </div>

      <div className="responsive-create-class-type-sec">
        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="create-your-course"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#ed7014" }}
            />
            <p>planning</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `create-your-course` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="pricing-planning"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon icon={faCreditCard} style={{ color: "#ed7014" }} />
            <p>pricing</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `pricing-planning` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="schedule-planning"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#ed7014" }}
            />
            <p>schedule</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `schedule-planning` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="all-classes"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon icon={faPeopleLine} style={{ color: "#ed7014" }} />
            <p>classes</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `all-classes` && `lining-active`
            }`}
          ></div>
        </div>
      </div>

      <div className="create-class-type-sec">
        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="create-your-course"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#ed7014" }}
            />
            <p>course planning</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `create-your-course` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="pricing-planning"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon icon={faCreditCard} style={{ color: "#ed7014" }} />
            <p>pricing planning</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `pricing-planning` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="schedule-planning"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#ed7014" }}
            />
            <p>course schedule</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `schedule-planning` && `lining-active`
            }`}
          ></div>
        </div>

        <div className="create-type-sec-p">
          <div
            className="first-flex-create-type-sec"
            id="all-classes"
            onClick={handleClassNavCursor}
          >
            <FontAwesomeIcon icon={faPeopleLine} style={{ color: "#ed7014" }} />
            <p>all classes</p>
          </div>
          <div
            className={`create-type-sec-lining ${
              activeNav === `all-classes` && `lining-active`
            }`}
          ></div>
        </div>
      </div>

      <>
        {activeNav === "create-your-course" && (
          <div className="create-class-sec">
            <CoursePlanning
              courseName={courseName}
              courseNameState={courseNameState}
              retainInput={retainInput}
              handleChangeInSelect={handleChangeInSelect}
              courseAreastate={courseAreastate}
              handleChangeBatch={handleChangeBatch}
              BatchState={BatchState}
              courseDescription={courseDescription}
              retainDescInput={retainDescInput}
              courseDescstate={courseDescstate}
              ToggleBtn={ToggleBtn}
              reducerState={reducerState}
              handleCoursePlanning={handleCoursePlanning}
            />
            <div className="create-class-calender-sec">
              {activeNav === "create-your-course" && (
                <Dates
                  color={"rgb(227, 227, 227)"}
                  className="responsive-date"
                />
              )}
            </div>
          </div>
        )}

        {activeNav === "schedule-planning" && (
          <div className="create-class-sec">
            {createCLassLoading && <LOading />}
            <CourseSchedule
              publishCurriculum={publishCurriculum}
              curriculumTitleRef={curriculumTitleRef}
              curriculumStartDate={curriculumStartDate}
              setCurriculumStartDate={setCurriculumStartDate}
              curriculumEndDate={curriculumEndDate}
              setCurriculumEndDate={setCurriculumEndDate}
              curriculumDescriptionRef={curriculumDescriptionRef}
              createClassAction={createClassAction}
            />

            <div className="create-class-calender-sec">
              {activeNav === "schedule-planning" && (
                <ScheduleUi
                  classObjectState={classObjectState}
                  deleteCurriculum={deleteCurriculum}
                />
              )}
            </div>
          </div>
        )}
        {activeNav === "pricing-planning" && (
          <div className="create-class-sec">
            {!reducerState?.toggleOn ? (
              <CoursePricing selectRef={selectRef} pricingRef={pricingRef} />
            ) : (
              <p
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginTop: "0em",
                  fontSize: "14px",
                  fontFamily: "Karla, sans-serif",
                }}
              >
                You choose the free option, to create a pricing plan, change it
              </p>
            )}
            <div className="create-class-calender-sec">
              {activeNav === "pricing-planning" && !reducerState.toggleOn && (
                <PricingUi
                  startdate={startdate}
                  Enddate={Enddate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  handlePricePlanning={handlePricePlanning}
                />
              )}
            </div>
          </div>
        )}
        {activeNav === "all-classes" && (
          <AllClasses setTypeOfClass={setTypeOfClass} />
        )}
      </>
    </div>
  );
};
