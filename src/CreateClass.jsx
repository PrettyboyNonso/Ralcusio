import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Dates } from "./DateUI";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import {
  faArrowRight,
  faCalendarDays,
  faCircleCheck,
  faCirclePlus,
  faCreditCard,
  faPeopleLine,
  faSearch,
  faSort,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlus,
  height,
  width,
} from "@fortawesome/free-solid-svg-icons/faPlus";
import { Devices } from "./App";
import StudentClass from "./StudentClass";
import { stringify, v4 } from "uuid";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database } from "./backend";

export const CreateClass = () => {
  const [activeNav, setActiveNav] = useState("");
  const [toggleOnCourse, setToggleOnCourse] = useState(false);
  const [toggleOnSchedule, setToggleOnSchedule] = useState(false);
  const [typeOfClass, setTypeOfClass] = useState("");
  const [coursePlanningError, setCoursePlanningError] = useState(false);
  const [pricePlanningError, setPricePlanningError] = useState(false);
  const [reducerState, dispatch] = useReducer(reducer, { toggleOn: true });
  const [reducerStateCurri, dispatchCurri] = useReducer(reducer, {
    toggleOn: false,
  });
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

  const [classArray, setClassArray] = useState(
    JSON.parse(sessionStorage.getItem("classArray"))
  );

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

  // const handleToggleCourse = () => {
  //   setToggleOnCourse(!toggleOnCourse);
  // };

  // const handleToggleSchedule = () => {
  //   setToggleOnSchedule(!toggleOnSchedule);
  // };

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
        startDate: curriculumStartDate
          .toString()
          .split(" ")
          .splice(0, 4)
          .join(" "),
        endDate: curriculumEndDate.toString().split(" ").splice(0, 4).join(" "),
      };
      currentObj?.curriculum.push(curriObj);
      setclassObject(currentObj);
      sessionStorage.setItem("classObject", JSON.stringify(currentObj));
    }
    console.log(JSON.parse(sessionStorage.getItem("classObject")));
  };

  async function createClassAction(e) {
    e.preventDefault();
    if (courseStartdate && courseEndDate) {
      if (courseStartdate < courseEndDate) {
        let classObj = JSON.parse(sessionStorage.getItem("classObject"));
        classObj.courseStartdate = courseStartdate
          .toString()
          .split(" ")
          .splice(0, 4)
          .join(" ");
        classObj.courseEndDate = courseEndDate
          .toString()
          .split(" ")
          .splice(0, 4)
          .join(" ");
        setclassObject(classObj);
        sessionStorage.setItem("classObject", JSON.stringify(classObj));
        sessionStorage.setItem("activeNav", "all-classes");
        try {
          const dbRef = await addDoc(collection(database, "classes"), {
            id: userDataState?.userId,
            ...classObj,
          });

          console.log(dbRef);
        } catch (error) {
          console.log(error);
        }

        setActiveNav("all-classes");
      }
    }
  }

  useEffect(() => {
    const collectionRef = collection(database, "classes");
    const q = query(collectionRef, where("id", "==", userDataState?.userId));
    onSnapshot(q, (snapshot) => {
      const classArray = snapshot.docs.map((value) => ({
        ...value.data(),
      }));
      setClassArray(classArray);
      sessionStorage.setItem("classArray", JSON.stringify(classArray));
      console.log(classArray);
    });
  }, []);

  const CoursePlanning = () => {
    const optionsLevel = [
      {
        value: "early bird",
        label: "Early Bird",
      },
      {
        value: "batch a",
        label: "Batch A",
      },
      {
        value: "batch b",
        label: "Batch B",
      },
      {
        value: "batch c",
        label: "Batch C",
      },
    ];

    const optionsCourseArea = [
      {
        label: "Technology",
        options: [
          { value: "web-development", label: "Web Development" },
          { value: "data-science", label: "Data Science" },
          { value: "cyber-security", label: "Cyber Security" },
          { value: "software-engineering", label: "Software Engineering" },
        ],
      },
      {
        label: "Personal Development",
        options: [
          { value: "personal-relationship", label: "Personal Relationship" },
          { value: "mental-wellness", label: "Mental Wellness" },
          { value: "time-management", label: "Time Management" },
          { value: "leadership", label: "Leadership" },
        ],
      },
      {
        label: "Business",
        options: [
          { value: "entrepreneurship", label: "Entrepreneurship" },
          { value: "marketing", label: "Marketing" },
          { value: "finance", label: "Finance" },
          { value: "management", label: "Management" },
        ],
      },
      {
        label: "Arts",
        options: [
          { value: "visual-arts", label: "Visual Arts" },
          { value: "music", label: "Music" },
          { value: "literature", label: "Literature" },
          { value: "performing-arts", label: "Performing Arts" },
        ],
      },
      {
        label: "Science",
        options: [
          { value: "biology", label: "Biology" },
          { value: "chemistry", label: "Chemistry" },
          { value: "physics", label: "Physics" },
          { value: "environmental-science", label: "Environmental Science" },
        ],
      },
      {
        label: "Health",
        options: [
          { value: "nutrition", label: "Nutrition" },
          { value: "fitness", label: "Fitness" },
          { value: "public-health", label: "Public Health" },
          { value: "medicine", label: "Medicine" },
        ],
      },
      {
        label: "Language",
        options: [
          { value: "english", label: "English" },
          { value: "spanish", label: "Spanish" },
          { value: "french", label: "French" },
          { value: "german", label: "German" },
        ],
      },
      {
        label: "Education",
        options: [
          { value: "teaching-methods", label: "Teaching Methods" },
          { value: "curriculum-design", label: "Curriculum Design" },
          { value: "educational-technology", label: "Educational Technology" },
          { value: "special-education", label: "Special Education" },
        ],
      },
    ];

    const customStyle = {
      container: (provided) => ({
        ...provided,
        width: "100%",
        marginTop: "0.3em",
      }),
      control: (provided, state) => ({
        ...provided,
        height: "2.3em",
        minHeight: "2.3em",
        color: "#000000",
        fontFamily: "Karla, sans-serif",
        fontSize: "13px",
        outline: "none",
        borderRadius: "0px",
        cursor: "pointer",
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#fff" : "#fff",
        color: "#000000",
        fontFamily: "Karla, sans-serif",
        fontSize: "13px",
      }),

      singleValue: (provided) => ({
        ...provided,
        color: "#000000",
        paddingBottom: "0.5em",
      }),
      indicatorSeparator: () => ({ display: "none" }),
    };

    return (
      <div className="class-create-details-sec">
        <div className="class-create-details-head">
          <h2>Course Planning</h2>
          <p>
            begin the creation of your course, fill out details like, course
            name, descriptions, etc
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="course-name">
            <p htmlFor="">course name</p>
            <input
              type="text"
              placeholder="Example - Financial Growth"
              ref={courseName}
              value={courseNameState}
              onChange={retainInput}
            />
          </div>

          <div className="class-date">
            <>
              <p>Select Course Area</p>

              <Select
                id="course-area"
                name="course-area"
                className="course-select"
                options={optionsCourseArea}
                placeholder="Select an area"
                styles={customStyle}
                isSearchable={false}
                onChange={handleChangeInSelect}
                value={courseAreastate}
              ></Select>
            </>
          </div>

          <div className="course-level">
            <p>Select Course Batch</p>
            <Select
              placeholder="Select a level"
              styles={customStyle}
              isSearchable={false}
              options={optionsLevel}
              onChange={handleChangeBatch}
              value={BatchState}
            ></Select>
          </div>

          <div className="class-desc">
            <p htmlFor="">course description (optional)</p>
            <textarea
              name="courseDescription"
              id=""
              ref={courseDescription}
              onChange={retainDescInput}
              value={courseDescstate}
            ></textarea>
          </div>

          <div className="toggle-btn continue-btn">
            <div
              style={{ display: "flex", gap: "0.4em", alignItems: "center" }}
            >
              <p>free course</p>
              <ToggleBtn
                // toggleFunc={() => dispatch()}
                toggleState={reducerState.toggleOn}
              />
            </div>

            <button onClick={(e) => handleCoursePlanning(e)}>continue</button>
          </div>
        </form>
      </div>
    );
  };

  const CoursePricing = () => {
    return (
      <div className="course-pricing">
        <div className="course-pricing-head">
          <h2>course pricing</h2>
          <p>
            create a detailed pricing plan for your course. here is a breakdown
            to help you structure your pricing
          </p>
        </div>
        <form action="">
          <div className="pricing-head">
            <h3>price</h3>
          </div>
          <div className="add-price">
            <label htmlFor="price">normal price</label>
            <FontAwesomeIcon icon={faArrowRight} />
            <div className="price-input">
              <select name="" id="" ref={selectRef}>
                <option value="usd">USD</option>
                <option value="ngn">NGN</option>
                <option value="gbp">GBP</option>
              </select>
              <input type="number" ref={pricingRef} />
            </div>
            <div className="add-discount-btn"></div>
          </div>
        </form>
      </div>
    );
  };

  const CourseSchedule = () => {
    const { dateState } = useContext(Devices);
    const CourseCurriculum = () => {
      return (
        <div className="course-curriculum">
          <div className="course-curriculum-head">
            <h3>learning</h3>
            <div className="curri-btns">
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.3em",
                }}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  style={{ color: "#ed7014" }}
                />
                add new
              </button>
              <button
                style={{ backgroundColor: "#ed7014", color: "white" }}
                onClick={(e) => publishCurriculum(e)}
              >
                publish
              </button>
            </div>
          </div>
          <form action="">
            <div className="curri-input-1">
              <p>curriculum title</p>
              <input
                type="text"
                placeholder="Lesson one - Learning The Basics"
                ref={curriculumTitleRef}
              />
            </div>
            <div className="curri-input-2">
              <p>start date</p>
              <DatePicker
                showYearDropdown
                minDate={new Date()}
                placeholderText={dateState}
                selected={curriculumStartDate}
                onChange={(curriculumStartDate) =>
                  setCurriculumStartDate(curriculumStartDate)
                }
              />
            </div>
            <div className="curri-input-3">
              <p>end date</p>
              {curriculumStartDate ? (
                <DatePicker
                  showYearDropdown
                  minDate={curriculumStartDate}
                  placeholderText={dateState}
                  selected={curriculumEndDate}
                  onChange={(curriculumEndDate) =>
                    setCurriculumEndDate(curriculumEndDate)
                  }
                />
              ) : (
                <p>-- ---- --- ---- </p>
              )}
            </div>

            <div className="class-desc">
              <p htmlFor="">add a description</p>
              <textarea name="" id="" ref={curriculumDescriptionRef}></textarea>
            </div>
          </form>
        </div>
      );
    };

    return (
      <div className="classScheduleSec">
        <div className="class-schedule-head">
          <h2>course schedule</h2>
          <p>
            create a course schedule or curriculum if your course spans multiple
            days.
          </p>
        </div>

        <form action="">
          <div className="schedule-1">
            <p>when does your course start?</p>
            <DatePicker
              showYearDropdown
              minDate={new Date()}
              placeholderText={dateState}
              selected={courseStartdate}
              onChange={(courseStartdate) =>
                setCourseStartDate(courseStartdate)
              }
            />
          </div>
          <div className="schedule-2">
            <p>when does your course end?</p>
            {courseStartdate ? (
              <DatePicker
                showYearDropdown
                minDate={courseStartdate}
                placeholderText={dateState}
                selected={courseEndDate}
                onChange={(courseEndDate) => setCourseEndDate(courseEndDate)}
              />
            ) : (
              <p style={{ marginTop: "1em" }}>-- --- --- --- --- </p>
            )}
          </div>
          <div className="schedule-3">
            <p>create a curriculum</p>
            <ToggleBtn
              toggleFunc={() => dispatchCurri()}
              toggleState={reducerStateCurri.toggleOn}
            />
          </div>
          {reducerStateCurri.toggleOn && <CourseCurriculum />}
          <div className="create-class-btn">
            <button onClick={(e) => createClassAction(e)}>create class</button>
          </div>
        </form>
      </div>
    );
  };

  const PricingUi = () => {
    const { dateState } = useContext(Devices);
    return (
      <div className="pricing-ui">
        <div className="pricing-ui-head">
          <h2>pricing</h2>
          <p>define a time range for your pricing plans</p>
        </div>

        <form action="">
          <div className="pricing-subheading">
            <p>normal price</p>
          </div>

          <div className="discount-1">
            <p>start date</p>
            <DatePicker
              showYearDropdown
              minDate={new Date()}
              placeholderText={dateState}
              selected={startdate}
              onChange={(startdate) => setStartDate(startdate)}
            />
          </div>
          <div className="discount-1">
            <p>end date</p>
            {startdate && (
              <DatePicker
                showYearDropdown
                minDate={startdate}
                placeholderText={dateState}
                selected={Enddate}
                onChange={(Enddate) => setEndDate(Enddate)}
              />
            )}
          </div>
        </form>

        <div className="price-btn">
          <button onClick={handlePricePlanning}>
            <FontAwesomeIcon icon={faPlus} />
            add new plan
          </button>
        </div>
      </div>
    );
  };

  function deleteCurriculum(Itemid) {
    let currentObj = JSON.parse(sessionStorage.getItem("classObject"));
    const newCurriculum = currentObj.curriculum.filter(
      (item) => item?.id !== Itemid
    );
    currentObj.curriculum = newCurriculum;
    setclassObject(currentObj);
    sessionStorage.setItem("classObject", JSON.stringify(currentObj));
  }

  class ScheduleCurriculum extends React.Component {
    render() {
      return (
        <div className="schedule-curriculum">
          <div className="schedule-tag">
            <p>{classObjectState?.batchState}</p>
          </div>
          <div className="course-title">
            <h3>{this.props?.curriculum?.title}</h3>
            <FontAwesomeIcon
              icon={faTrashCan}
              style={{ color: "#ed7014" }}
              onClick={() => deleteCurriculum(this?.props?.curriculum.id)}
            />
          </div>
          <div className="schedule-level">
            <p>{`${this.props?.curriculum?.startDate} - `}</p>
            <p>{this.props?.curriculum?.endDate}</p>
          </div>
        </div>
      );
    }
  }

  // const ScheduleCurriculum = ({ curriculum }) => {
  //   return (
  //     <div className="schedule-curriculum">
  //       <div className="schedule-tag">
  //         <p>{classObjectState?.batchState}</p>
  //       </div>
  //       <div className="course-title">
  //         <h3>{curriculum?.title}</h3>
  //         <FontAwesomeIcon
  //           icon={faTrashCan}
  //           style={{ color: "#ed7014" }}
  //           onClick={() => console.log(this)}
  //         />
  //       </div>
  //       <div className="schedule-level">
  //         <p>{`${curriculum.startDate} - `}</p>
  //         <p>{curriculum.endDate}</p>
  //       </div>
  //     </div>
  //   );
  // };

  const ScheduleUi = () => {
    return (
      <div className="schedule-ui">
        <div className="schedule-ui-head">
          <h2>curriculums</h2>
        </div>
        {classObjectState?.curriculum?.map((value, index) => (
          <div className="schedule-curriculum-flex">
            <ScheduleCurriculum curriculum={value} />
          </div>
        ))}
      </div>
    );
  };

  const AllClasses = () => {
    const handleTypeOfClass = (e) => {
      const targetVal = e.target.closest(".second-head");
      const targetId = targetVal.id;

      setTypeOfClass(targetId);
      sessionStorage.setItem("classTypeId", targetId);
      const clickedElem = document.getElementById(targetId);

      if (clickedElem) {
        if (clickedElem.classList.contains("all-class-active")) {
          // do nothing
        } else if (!clickedElem.classList.contains("all-class-active")) {
          document.querySelectorAll(".second-head").forEach((value, index) => {
            if (value.classList.contains("all-class-active")) {
              value.classList.remove("all-class-active");
            }
          });
          clickedElem.classList.add("all-class-active");
        }
      }
    };

    useEffect(() => {
      const sessionStored = sessionStorage.getItem("classTypeId");
      if (sessionStored) {
        setTypeOfClass(sessionStored);
        const activeElem = document.getElementById(sessionStored);
        if (activeElem) activeElem.classList.add("all-class-active");
      } else {
        sessionStorage.setItem("classTypeId", "all");
        setTypeOfClass("all");
      }
    }, []);
    const AllClassesBody = ({ Myclass }) => {
      return (
        <div className="all-class-body-checkbox">
          <input type="checkbox" />
          <div className="all-classes-body">
            <p>{Myclass?.courseName}</p>

            <p>
              {Myclass?.courseStartdate
                .toLocaleString()
                .split(" ")
                .splice(0, 4)
                .join(" ")}
            </p>

            <p>active</p>

            <p>
              {parseInt(Myclass?.coursePrice) === 0
                ? "free"
                : Myclass?.coursePrice}
            </p>
          </div>
        </div>
      );
    };

    const AllClassesHead = () => {
      return (
        <div className="all-class-checkbox">
          <input type="checkbox" />
          <div className="all-classes-table-head">
            <p>name</p>
            <p>date</p>
            <p>status</p>
            <p>price</p>
          </div>
        </div>
      );
    };
    return (
      <div className="all-classes">
        <div className="all-class-head">
          <h2>all classes</h2>
        </div>
        <div className="second-head-flex">
          <div className="all-classes-second-head">
            {/* <div className="second-head" id="all" onClick={handleTypeOfClass}>
              <p>all</p>
            </div> */}
            {/* <div className="second-head" id="draft" onClick={handleTypeOfClass}>
              <p>drafts</p>
            </div> */}
            {/* <div
              className="second-head"
              id="archived"
              onClick={handleTypeOfClass}
            >
              <p>archived</p>
            </div> */}
            <button>view</button>
            <button>delete</button>
          </div>

          {/* <div className="classes-icons">
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                // backgroundColor: "#ed7014",
                border: "1px solid #ed7014",
                color: "#ed7014",
                padding: "0.2em 0.6em",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            />
            <FontAwesomeIcon
              icon={faSort}
              style={{
                // backgroundColor: "#ed7014",
                border: "1px solid #ed7014",
                color: "#ed7014",
                padding: "0.2em 0.6em",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            />
          </div> */}
        </div>
        <AllClassesHead />
        {/* {typeOfClass === "all" && (
          <div className="all-class-sec">
            <AllClassesBody />
            <AllClassesBody />
            <AllClassesBody />
          </div>
        )}
        {typeOfClass === "draft" && (
          <div className="all-class-sec">
            <AllClassesBody />
            <AllClassesBody />
          </div>
        )}
        {typeOfClass === "archived" && (
          <div className="all-class-sec">
            <AllClassesBody />
          </div>
        )} */}
        {classArray.map((value, index) => (
          <AllClassesBody Myclass={value} />
        ))}
      </div>
    );
  };

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
            <CoursePlanning />
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
            <CourseSchedule />
            <div className="create-class-calender-sec">
              {activeNav === "schedule-planning" && <ScheduleUi />}
            </div>
          </div>
        )}
        {activeNav === "pricing-planning" && (
          <div className="create-class-sec">
            {!reducerState.toggleOn ? (
              <CoursePricing />
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
                <PricingUi />
              )}
            </div>
          </div>
        )}
        {activeNav === "all-classes" && <AllClasses />}
      </>
    </div>
  );
};
