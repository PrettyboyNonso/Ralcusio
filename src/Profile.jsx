import {
  faCakeCandles,
  faCameraRetro,
  faCircleInfo,
  faGraduationCap,
  faImage,
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { Devices } from "./App";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";

export const Profile = () => {
  const [userDataState, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const birthday = convertToReadable();
  const refBirthday = useRef(birthday);
  const { setInvisible } = useContext(Devices);
  const headline = useRef(null);

  function convertToReadable() {
    let readableDate = userDataState?.dateOfBirth.seconds;
    const seconds = readableDate;
    const date = new Date(seconds * 1000);
    readableDate = date.toString();
    const showingdate = readableDate.substr(4, 11);
    return showingdate;
  }

  useEffect(() => {
    convertToReadable();
    setUserData(JSON.parse(sessionStorage.getItem("userData")));
  }, []);

  return (
    <div className="profile-page">
      <div className="first-profile-view-flex">
        <div className="first-profile-view">
          <div className="cover-photo">
            <img src={userDataState.coverUrl} alt="" />
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={{
                position: "absolute",
                right: "0.5em",
                top: "0.2em",
                fontSize: "28px",
                cursor: "pointer",
              }}
            />
          </div>

          <div className="profile-firstinfo">
            {userDataState?.profileUrl && (
              <div
                className="profile-image-div"
                style={{
                  position: !userDataState?.profileUrl && "relative",
                }}
              >
                <img src={`${userDataState?.profileUrl}`} alt="" />
              </div>
            )}

            <div className="name-and-followers">
              <h2>{`${userDataState?.firstName} ${userDataState?.lastName}`}</h2>
              <div className="followers-following">
                <p>{`${userDataState?.followers} followers`}</p>
                <div className="dot"></div>
                <p>{`${userDataState?.following} following`}</p>
              </div>
              <button
                style={{ cursor: "pointer", border: "none" }}
                onClick={() => setInvisible(false)}
              >
                edit profile
              </button>
            </div>
          </div>
          <div className="other-profile-info">
            {userDataState.headline && (
              <div className="category" style={{ alignItems: "center" }}>
                <FontAwesomeIcon
                  icon={faNewspaper}
                  style={{ color: "#ed7014" }}
                />
                <p>{userDataState.headline}</p>
              </div>
            )}
            <div className="category">
              <FontAwesomeIcon
                icon={faCakeCandles}
                style={{ color: "#ed7014" }}
              />
              <p>
                birthday <b>- </b>
                {refBirthday.current}
              </p>
            </div>
            {userDataState.countryOfResidence && (
              <div className="category">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#ed7014" }}
                />
                <p>{`lives in ${userDataState.countryOfResidence}`}</p>
              </div>
            )}
          </div>
        </div>

        {/* flex profile view */}

        <div className="bio">
          <h2>intro</h2>
          {userDataState.bio ? (
            <p className="paragraph" style={{ textTransform: "unset" }}>
              {userDataState.bio}
            </p>
          ) : (
            <p
              className="paragraph"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              tell us about yourself
            </p>
          )}
          <button
            onClick={() => setInvisible(false)}
            style={{ cursor: "pointer" }}
          >
            edit bio
          </button>
          <div className="education-work">
            <div className="education">
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ color: "#ed7014" }}
              />
              <p>
                Profile -{" "}
                <b>
                  {userDataState.accountType === "Teacher Account"
                    ? "tutor"
                    : "learner"}
                </b>
              </p>
            </div>

            {userDataState.education && (
              <div className="education">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ color: "#ed7014" }}
                />
                <p>{userDataState.education}</p>
              </div>
            )}
            {userDataState.countryOfOrigin && (
              <div className="education">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{ color: "#ed7014" }}
                />
                <p>{`from ${userDataState.countryOfOrigin}`}</p>
              </div>
            )}
            <button
              onClick={() => setInvisible(false)}
              style={{ cursor: "pointer" }}
            >
              edit details
            </button>
          </div>
        </div>
      </div>

      <div className="second-profile-view">
        <div className="posts">
          <div className="add-post">
            <div className="first-add-post">
              <div className="first-add-post-img">
                {<img src={userDataState.profileUrl} alt="" />}
              </div>
              <input type="text" placeholder="What Is On Your Mind" />
            </div>
            <div className="second-add-post">
              <div className="post-option">
                <FontAwesomeIcon
                  icon={faImage}
                  style={{ fontSize: "20px", color: "#ed7014" }}
                />
                <p>photo/video</p>
              </div>
            </div>
          </div>
          <div className="added-posts">
            <p>no posts yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};
