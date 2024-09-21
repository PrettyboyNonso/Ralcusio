import { useContext, useEffect, useRef, useState } from "react";
import { Devices } from "../App";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faAngleDown,
  faAngleUp,
  faCircleXmark,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

export const AllClasses = ({ setTypeOfClass }) => {
  const { classArray } = useContext(Devices);
  const [classId, setClassId] = useState(null);
  const [viewDetails, setViewDetails] = useState(false);
  const [classDetails, setClassDetails] = useState({});
  const viewClass = async () => {
    const dbRef = collection(database, "classes");
    const q = query(dbRef, where("classId", "==", classId));
    const docs = await getDocs(q);
    setClassDetails({ ...docs.docs[0]?.data() });
    setViewDetails(true);
  };

  const handleOnchange = (e) => {
    const clickedCheckBox = e.target;
    const allCheckBoxes = Array.from(document.querySelectorAll(".checkbox"));
    const isChecked = allCheckBoxes.filter((value) => value?.checked);
    isChecked.forEach((value) => {
      if (value !== clickedCheckBox) {
        value.checked = false;
      }
    });
    if (e.target.checked) {
      setClassId(e?.target?.closest(".all-class-body-checkbox").id);
    } else {
      setClassId(null);
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

  const ClassParticipantsDetails = ({ participants }) => {
    return (
      <div className="participants-body">
        <div className="participant-head">
          <input type="text" placeholder="Search Students" />
          <p>{`${classDetails?.participants?.length} ${
            classDetails?.participants?.length === 1 ? "student" : "students"
          }`}</p>
        </div>

        {/* <div className="students-participants">
          <p>Obi Chinonso Fortune</p>
        </div> */}
      </div>
    );
  };

  const ClassDetailsCurriculum = ({ curriculum }) => {
    const [curriOpen, setCurriOpen] = useState(false);
    return (
      <div className="curri-class-sec">
        <div className="curri-class-sec-head">
          <p>{curriculum?.title}</p>
          <FontAwesomeIcon
            icon={curriOpen ? faAngleUp : faAngleDown}
            style={{ color: "#ed7014", cursor: "pointer" }}
            onClick={() => setCurriOpen(!curriOpen)}
          />
        </div>
        {curriOpen && (
          <>
            <div className="curri-details">
              <div className="curri-description">
                <p>{curriculum?.description}</p>
              </div>
            </div>
            <div className="start-end-date">
              <p>{`${new Date(
                curriculum?.startDate
              ).toDateString()} - ${new Date(
                curriculum?.endDate
              ).toDateString()}`}</p>
            </div>
          </>
        )}
      </div>
    );
  };

  const ClassDetails = ({ classDetails }) => {
    const [activeLinkCursor, setActiveLinkCursor] = useState("curriculum");
    const [copied, setCopied] = useState(false);

    const changeCursor = (e) => {
      const clickedId = e.target.closest(".common-class").id;
      setActiveLinkCursor(clickedId);
    };

    const copyTextToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(classDetails?.classId);
        setCopied(true);
      } catch (error) {
        return;
      }
    };
    return (
      <div className="class-details-body">
        <div className="class-details-head">
          <div className="courseName-head">
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ed7014", cursor: "pointer" }}
              onClick={() => setViewDetails(false)}
            />
            <h2>{classDetails?.courseName}</h2>
            {!copied ? (
              <FontAwesomeIcon
                icon={faCopy}
                style={{ color: "#ed7014", cursor: "pointer" }}
                onClick={copyTextToClipboard}
              />
            ) : (
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "Karla, sans-serif",
                }}
              >
                Class ID Copied!
              </p>
            )}
          </div>
          <div className="class-head-other-detail">
            <p>
              {new Date() < new Date(classDetails?.courseStartdate)
                ? `starting on ${new Date(
                    classDetails?.courseStartdate
                  ).toDateString()}`
                : `started on ${new Date(
                    classDetails?.courseStartdate
                  ).toDateString()}`}
            </p>
            <p>-</p>
            <p>{classDetails?.courseArea}</p>
          </div>

          <div className="curriculum-participants">
            <div className="curriculum-sec">
              <div
                className="wrapper-curri-participant common-class"
                id="curriculum"
                onClick={(e) => changeCursor(e)}
              >
                <p>curriculum</p>
                <div
                  className={
                    activeLinkCursor === "curriculum" ? "lining-class" : ""
                  }
                ></div>
              </div>
            </div>
            <div
              className="participants-sec common-class"
              id="participant"
              onClick={(e) => changeCursor(e)}
            >
              <div className="wrapper-curri-participant">
                <p>participants</p>
                <div
                  className={
                    activeLinkCursor === "participant" ? "lining-class" : ""
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>

        {activeLinkCursor === "curriculum" &&
          classDetails?.curriculum?.map((value, index) => (
            <ClassDetailsCurriculum curriculum={value} />
          ))}
        {activeLinkCursor === "participant" &&
          (classDetails?.participants?.length < 1 ? (
            <p
              style={{
                fontSize: "14px",
                fontFamily: "Karla, sans-serif",
                marginTop: "2em",
                textAlign: "center",
              }}
            >
              You have no student yet
            </p>
          ) : (
            <ClassParticipantsDetails
              participants={classDetails?.participants}
            />
          ))}
      </div>
    );
  };
  return (
    <>
      {viewDetails && <ClassDetails classDetails={classDetails} />}
      <div className="all-classes">
        <div className="all-class-head">
          <h2>all classes</h2>
        </div>
        <div className="second-head-flex">
          <div className="all-classes-second-head">
            <button style={{ cursor: "pointer" }} onClick={viewClass}>
              view
            </button>
            <button
              style={{
                cursor: "pointer",
                color: "white",
                backgroundColor: "black",
              }}
            >
              delete
            </button>
          </div>
        </div>
        <AllClassesHead />
        {classArray?.map((value, index) => (
          <div className="all-class-body-checkbox" id={value?.classId}>
            <input
              type="checkbox"
              onChange={(e) => handleOnchange(e)}
              className="checkbox"
            />
            <div className="all-classes-body">
              <p>{value?.courseName}</p>

              <p>{new Date(value?.courseStartdate).toDateString()}</p>

              <p>active</p>

              <p>
                {parseInt(value?.coursePrice) === 0
                  ? "free"
                  : value?.coursePrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
