import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import {
  faSearch,
  faBars,
  faX,
  faCirclePlus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { Devices } from "./App";
export const StudentSchedule = () => {
  const [accountTypeView, setAccountTypeView] = useState(false);
  const {
    userData,
    userIn,
    classFormRef,
    emptyField,
    classSuccess,
    classError,
    classList,
    classLoaded,
    setClassView,
    classView,
    classViewLoading,
    listenToClasses,
    handleClassAdd,
  } = useContext(Devices);

  const handleAddToClass = (e) => {
    handleClassAdd(e);
    listenToClasses();
  };

  const LoadingGroup = () => {
    return (
      <div
        className="group"
        style={{ backgroundColor: "rgba(226, 213, 196, 0.4)" }}
      >
        <div className="group-first-flex">
          <p
            className="addlazy"
            style={{
              backgroundColor: "rgba(226, 213, 196, 0.9)",
              width: "60%",
              marginLeft: ".2em",
              height: "1em",
              borderRadius: "10px",
              marginTop: "1em",
            }}
          ></p>
          <div className="image-flex">
            <div className="number addlazy" style={{ width: "11%" }}>
              <p></p>
            </div>
            <div className="number addlazy" style={{ width: "11%" }}>
              <p></p>
            </div>
            <div className="number addlazy" style={{ width: "11%" }}>
              <p></p>
            </div>
            <div className="number addlazy" style={{ width: "11%" }}>
              <p></p>
            </div>
          </div>
        </div>
        <div className="second-group-flex">
          <p
            className="addlazy"
            style={{
              backgroundColor: "rgba(226, 213, 196, 0.9)",
              width: "40%",
              marginLeft: ".2em",
              height: "1em",
              borderRadius: "10px",
            }}
          ></p>
          <div className="second-div-icon">
            <div
              className="addlazy"
              style={{
                width: "2em",
                height: "2em",
                color: "rgba(226, 213, 196, 0.9)",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const Group = (props) => {
    return (
      <div className="group">
        <div className="group-first-flex">
          <h3>{props.title}</h3>
          <div className="image-flex">
            {props.images.map((src, index) => {
              const imagePath = require(`${src}`);
              return (
                <div className="imageBox">
                  <img src={imagePath} alt={"Image" + index} key={index} />
                </div>
              );
            })}

            <div className="number">
              <p>{props.groupLength}</p>
            </div>
          </div>
        </div>
        <div className="second-group-flex">
          <p>{props.groupAdmin}</p>
          <div className="second-div-icon">
            <FontAwesomeIcon
              icon={faSquarePlus}
              style={{
                fontSize: "32px",
                color: "#ed7014",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-side">
      <div className="app-side-head">
        <h2>{userIn && `hi, ${userData.firstname}`}</h2>
        <div className="app-second-head">
          <div className="search">
            <input type="text" placeholder="search for people" />
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: "absolute",
                right: "0.5em",
                top: "0.5em",
                color: "rgb(41, 41, 41)",
                cursor: "pointer",
              }}
            />
          </div>

          <FontAwesomeIcon
            icon={faBars}
            style={{
              color: "rgb(41, 41, 41)",
              fontSize: "24px",
              marginTop: "0.15em",
              cursor: "pointer",
            }}
            onClick={() => setAccountTypeView(!accountTypeView)}
          />
          {accountTypeView && (
            <div
              className="accountType"
              style={{
                width: "10em",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                border: "1px solid grey",
                position: "absolute",
                right: ".5em",
                borderRadius: "5px",

                top: "3em",
              }}
            >
              <h3
                style={{
                  textTransform: "capitalize",
                  fontFamily: "Karla, sans-serif",
                  fontSize: "16px",
                  paddingTop: "0.5em",
                }}
              >
                account type
              </h3>
              <small
                style={{
                  marginTop: "1em",
                  color: "#ed7014",
                  fontFamily: "Karla, sans-serif",
                  fontWeight: "bold",
                  paddingBottom: "0.5em",
                }}
              >
                {userData.accountType}
              </small>
            </div>
          )}
        </div>
      </div>

      <div className="upcoming-classes">
        <div className="upcoming-head">
          <h3>upcoming classes</h3>
          <p>These are your scheduled classes</p>
          <div className="add-class-cont">
            <div className="add-class">
              <FontAwesomeIcon
                icon={faCirclePlus}
                style={{
                  fontSize: "33px",
                  cursor: "pointer",
                  color: "#ed7014",
                }}
                onClick={() => setClassView(!classView)}
              />

              {userData.accountType === "Student Account" ? (
                <>
                  <p>join a classroom</p>
                  <small>
                    you do not seem to belong to an ongoing classroom
                  </small>
                </>
              ) : (
                <>
                  <p>create a classroom</p>
                  <small>you do not seem to have an ongoing classroom</small>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="student-groups">
        <div className="student-group-head">
          <h3>active classes</h3>
          {userData.accountType === "Student Account" ? (
            <p>classes that you joined recently</p>
          ) : (
            <p>classes that you created recently</p>
          )}
        </div>

        <div className="groups">
          {classViewLoading ? (
            <LoadingGroup />
          ) : (
            classList.map((classReturned) => (
              <Group
                title={classReturned.className}
                images={[
                  "./images/adult-1851571_1280.jpg",
                  "./images/man-1690965_1280.jpg",
                  "./images/smile-2072907_1280.jpg",
                  "./images/man-3803551_1280.jpg",
                ]}
                groupLength={classReturned.Studentcount}
                groupAdmin={`${classReturned.firstname} ${classReturned.lastname}`}
              />
            ))
          )}
          {/* <Group
        title={"Design And Web Architecture"}
        images={[
          "./images/adult-1851571_1280.jpg",
          "./images/man-1690965_1280.jpg",
          "./images/smile-2072907_1280.jpg",
          "./images/man-3803551_1280.jpg",
        ]}
        groupLength={15}
        groupAdmin={"mosh hamedani"}
      /> */}
        </div>
      </div>
      {classView && (
        <div className="create-classes">
          <div className="create-class-head">
            {userData.accountType === "Student Account" ? (
              <h3>join a new class</h3>
            ) : (
              <h3>create a new class</h3>
            )}
            <FontAwesomeIcon
              icon={faX}
              style={{ cursor: "pointer" }}
              onClick={() => setClassView(!classView)}
            />
          </div>
          <form action="POST" ref={classFormRef}>
            {userData.accountType === "Teacher Account" ? (
              <>
                {" "}
                {classSuccess === "" && (
                  <>
                    <label htmlFor="">class name</label>
                    <input
                      type="text"
                      placeholder="Enter a class name"
                      name="className"
                    />
                    <label htmlFor="">category</label>
                    <select name="classCategory" id="category">
                      {/* <!-- Academic Subjects --> */}
                      <optgroup label="Academic Subjects">
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="social_sciences">Social Sciences</option>
                        <option value="languages">Languages</option>
                        <option value="computer_science">
                          Computer Science
                        </option>
                        <option value="arts_humanities">
                          Arts and Humanities
                        </option>
                      </optgroup>

                      {/* <!-- Professional and Vocational Training --> */}
                      <optgroup label="Professional and Vocational Training">
                        <option value="business_management">
                          Business and Management
                        </option>
                        <option value="healthcare_medicine">
                          Healthcare and Medicine
                        </option>
                        <option value="engineering_technology">
                          Engineering and Technology
                        </option>
                        <option value="law_legal_studies">
                          Law and Legal Studies
                        </option>
                        <option value="education_teaching">
                          Education and Teaching
                        </option>
                      </optgroup>

                      {/* <!-- Lifestyle and Personal Development --> */}
                      <optgroup label="Lifestyle and Personal Development">
                        <option value="health_wellness">
                          Health and Wellness
                        </option>
                        <option value="art_craft">Art and Craft</option>
                        <option value="hobbies_interests">
                          Hobbies and Interests
                        </option>
                        <option value="music_performing_arts">
                          Music and Performing Arts
                        </option>
                      </optgroup>

                      {/* <!-- Technical and Specialized Skills --> */}
                      <optgroup label="Technical and Specialized Skills">
                        <option value="software_tools">
                          Software and Tools
                        </option>
                        <option value="trades">Trades</option>
                        <option value="data_analytics">
                          Data and Analytics
                        </option>
                      </optgroup>

                      {/* <!-- Test Preparation --> */}
                      <optgroup label="Test Preparation">
                        <option value="standardized_tests">
                          Standardized Tests
                        </option>
                        <option value="professional_certifications">
                          Professional Certifications
                        </option>
                      </optgroup>

                      {/* <!-- Languages and Communication --> */}
                      <optgroup label="Languages and Communication">
                        <option value="language_learning">
                          Language Learning
                        </option>
                        <option value="communication_skills">
                          Communication Skills
                        </option>
                      </optgroup>

                      {/* <!-- Technology and IT --> */}
                      <optgroup label="Technology and IT">
                        <option value="programming_languages">
                          Programming Languages
                        </option>
                        <option value="it_networking">IT and Networking</option>
                        <option value="artificial_intelligence">
                          Artificial Intelligence
                        </option>
                      </optgroup>
                    </select>{" "}
                  </>
                )}
                <p
                  style={{
                    color: "red",
                    marginTop: "0.5em",
                    marginBottom: "1em",
                    fontFamily: "Karla, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {emptyField}
                </p>
                <p
                  style={{
                    color: "red",
                    marginTop: "0.5em",
                    marginBottom: "1em",
                    fontFamily: "Karla, sans-serif",
                    fontSize: "14px",
                  }}
                >
                  {classError}
                </p>
                {classSuccess !== "" && (
                  <p
                    style={{
                      color: "green",
                      marginTop: "0.5em",
                      marginBottom: "1em",
                      fontFamily: "Karla, sans-serif",
                      fontSize: "14px",
                    }}
                  >
                    {/* Class has been created, procced to curriculum to make your
                class live */}
                    {classSuccess}
                  </p>
                )}
              </>
            ) : (
              <input type="text" placeholder="Enter class ID" />
            )}
            {userData.accountType === "Teacher Account" ? (
              <button
                onClick={handleAddToClass}
                disabled={classLoaded ? true : false}
                style={{
                  cursor: classLoaded ? "text" : "pointer",
                  display: classSuccess !== "" ? "none" : "flex",
                }}
              >
                Create Class
                {classLoaded && (
                  <ColorRing
                    visible={true}
                    height="25"
                    width="25"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={[
                      "#808080",
                      "#f47e60",
                      "#f8b26a",
                      "#ffffff",
                      "#ff0000",
                    ]}
                  />
                )}
              </button>
            ) : (
              <button>Join Class</button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};
