import { useContext, useEffect, useReducer, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "./backend";
import { LoadingHome } from "./LoadingHome";

export const StudentClass = () => {
  const [activeNav, setActiveNav] = useState("");
  const [viewClassState, dispatchClassState] = useReducer(reducerClassState, {
    viewed: false,
  });
  const [joinClassMessage, setJoinClassMessage] = useState("");
  const [IsLoading, setLoading] = useState(false);
  const classIdInput = useRef(null);
  const [typeOfClass, setTypeOfClass] = useState("");
  const { userDataState, QueryClasses, allClassesStudent } =
    useContext(Devices);

  useEffect(() => {
    QueryClasses();
  }, []);

  function reducerClassState(state, action) {
    switch (action.type) {
      case "OPEN":
        return { viewed: true };
      case "CLOSE":
        return { viewed: false };
      default:
        return state;
    }
  }

  const AllClasses = () => {
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

    const AllClassesBody = ({ classDet }) => {
      return (
        <div className="all-class-body-checkbox">
          <input type="checkbox" />
          <div className="all-classes-body">
            <p>{classDet?.courseName}</p>

            <p>{new Date(classDet?.courseStartdate).toDateString()}</p>

            <p>active</p>

            <p>free</p>
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
      <div className="student-all-classes">
        <div className="all-class-head">
          <div className="head-part">
            <h2>classes</h2>
            <small>
              classes/{document.getElementById(typeOfClass)?.innerText}
            </small>
          </div>
          <button onClick={() => dispatchClassState({ type: "OPEN" })}>
            join a class
          </button>
        </div>
        <div className="student-second-head-flex"></div>
        <AllClassesHead />

        <div className="all-class-sec">
          {allClassesStudent?.length >= 1 &&
            allClassesStudent?.map((value, index) => (
              <AllClassesBody classDet={value} />
            ))}
        </div>
        <div className="all-class-sec">
          {allClassesStudent?.length < 1 && (
            <p
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                marginTop: "2em",
                fontSize: "14px",
                fontFamily: "Karla, sans-serif",
              }}
            >
              no classes at the moment
            </p>
          )}
        </div>
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
    console.log("re-rendered");
  }, [activeNav]);

  async function joinClassFunc() {
    if (classIdInput?.current?.value.trim()?.length > 1) {
      setLoading(true);
      const dbRef = collection(database, "classes");
      const q = query(
        dbRef,
        where("classId", "==", classIdInput?.current?.value)
      );

      const snapDocs = await getDocs(q);
      if (!snapDocs.empty) {
        const collectionId = snapDocs?.docs[0]?.id;
        if (
          snapDocs?.docs[0]
            ?.data()
            ?.participants.includes(userDataState?.userId)
        ) {
          setLoading(false);
          setJoinClassMessage("You Already Are A Participant In This Class");
        } else {
          await updateDoc(doc(database, "classes", collectionId), {
            participants: arrayUnion(userDataState?.userId),
          });
          setLoading(false);
          setJoinClassMessage("You Have Successfully Joined The Class");
        }
      } else {
        setLoading(false);
        setJoinClassMessage("Class ID Does Not Exist");
      }
    } else {
      setLoading(false);
      setJoinClassMessage("Class ID Does Not Exist");
    }
  }

  const JoinClass = () => {
    return (
      <div className="join-class">
        {IsLoading && <LoadingHome />}
        <div className="join-class-head">
          <h2>join class</h2>
          <p>
            join a class by entering the class id. for paid classes, you would
            be required to pay before you gain access to the class
          </p>
        </div>

        <div className="input-for-class">
          <div className="input-for-class-head">
            <h2>enter class id</h2>
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ed7014", cursor: "pointer" }}
              onClick={() => dispatchClassState({ type: "CLOSE" })}
            />
          </div>
          <input type="text" placeholder="Enter Class Id" ref={classIdInput} />
          <button onClick={joinClassFunc} style={{ cursor: "pointer" }}>
            join class
          </button>
          <p
            style={{
              textTransform: "capitalize",
              marginTop: "0.8em",
              fontSize: "13px",
              fontFamily: "Karla, sans-serif",
              color:
                joinClassMessage === "You Have Successfully Joined The Class"
                  ? "green"
                  : "red",
            }}
          >
            {joinClassMessage}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="create-class-teacher">
      <>{viewClassState.viewed ? <JoinClass /> : <AllClasses />}</>
    </div>
  );
};
