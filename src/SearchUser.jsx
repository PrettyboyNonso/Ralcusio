import {
  faAngleLeft,
  faCakeCandles,
  faImage,
  faLocationDot,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserImg from "./images/fb.jpg";
import { useContext, useRef, useState } from "react";
import { Devices } from "./App";
export const SearchUser = () => {
  const { setVisible, stateSearchResult, searchString } = useContext(Devices);
  const [currentId, setCurrentId] = useState(stateSearchResult[0]?.userId);
  const [arrayIndex, setArrayIndex] = useState(0);
  const { userDataState } = useContext(Devices);
  const searchSlide = useRef(null);
  function clickFunc(e) {
    if (window.innerWidth < 767) {
      const targetElem = e.target.closest(".user-flex");
      setCurrentId(targetElem.id);
      setArrayIndex(targetElem.className.split(" ")[2]);
      searchSlide?.current.scrollBy({
        left: searchSlide?.current.offsetWidth * 1,
        behaviour: "smooth",
      });
    } else {
      const targetElem = e.target.closest(".user-flex");
      setCurrentId(targetElem.id);
      setArrayIndex(targetElem.className.split(" ")[2]);
    }
  }

  const shortenBio = (bio) => {
    let newstring = "";
    if (!bio?.length <= 55) {
      newstring = bio?.slice(0, 51);
      return `${newstring}...`;
    } else {
      return;
    }
  };
  const UserSearchProfile = ({ result }) => {
    const convertToReadableDate = () => {
      const seconds = result?.dateOfBirth.seconds;
      const date = new Date(seconds * 1000);
      const readableDate = date.toString();
      const showingdate = readableDate.substr(4, 11);
      return showingdate;
    };
    const birthday = convertToReadableDate();
    return (
      <div className="user-profile-details-search">
        {result && (
          <div className="profile-search-side-user">
            <div className="cover-search-photo">
              <img src={result?.coverUrl} alt="" />
            </div>
            <div className="profile-photo-search">
              <img src={result?.profileUrl} alt="" />
            </div>
            <div
              className="name-and-followers"
              style={{ position: "absolute", left: "8em" }}
            >
              <h2>{result?.fullName}</h2>
              <div className="followers-following">
                <p>{`${result?.followers} followers`}</p>
                <div className="dot"></div>
                <p>{`${result?.following} following`}</p>

                {userDataState?.userId !== currentId && (
                  <button
                    className="normal-btn"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      marginLeft: "2em",
                    }}
                  >
                    follow
                  </button>
                )}
              </div>
            </div>
            {userDataState?.userId !== currentId && (
              <button
                className="responsive-button"
                style={{
                  cursor: "pointer",
                  border: "none",
                  marginLeft: "10em",
                  marginTop: "5.5em",
                  // position: "unset",
                }}
              >
                follow
              </button>
            )}
            <div
              className="search-profile-info"
              style={{ position: "absolute", marginTop: "1em" }}
            >
              {result?.headline && (
                <div className="category" style={{ alignItems: "center" }}>
                  <FontAwesomeIcon
                    icon={faNewspaper}
                    style={{ color: "#ed7014" }}
                  />
                  <p>{result?.headline}</p>
                </div>
              )}
              {birthday && (
                <div className="category">
                  <FontAwesomeIcon
                    icon={faCakeCandles}
                    style={{ color: "#ed7014" }}
                  />
                  <p>
                    birthday <b>- </b>
                    {birthday}
                  </p>
                </div>
              )}
              {result?.countryOfResidence && (
                <div className="category">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#ed7014" }}
                  />
                  <p>lives in {result.countryOfResidence}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const UserCard = ({ searchResultObj, onclick, Myindex, id }) => {
    return (
      <div
        className={`user-flex ${
          currentId === id && "user-flex-active"
        } ${Myindex}`}
        onClick={onclick}
        id={id}
      >
        <div className="user-card">
          <div className="user-name-followers">
            <div className="image-user-search">
              <img src={searchResultObj.profileUrl} alt="" />
            </div>
            <div className="name-user-search">
              <h4>{searchResultObj.fullName}</h4>
              <div className="followers-search-users">
                <div className="followers-following">
                  <p>{`${searchResultObj.followers} followers`}</p>
                  <div className="dot"></div>
                  <p>{`${searchResultObj.following} following`}</p>
                </div>
              </div>
              {searchResultObj?.bio && (
                <div className="bio-search">
                  <p>
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit... */}
                    {shortenBio(searchResultObj?.bio)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="searchUsers">
      <div className="search-head">
        <FontAwesomeIcon
          icon={faAngleLeft}
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => setVisible(false)}
        />
        <h2>search</h2>
      </div>
      <h3>search results for "{searchString}"</h3>
      {stateSearchResult.length === 0 && (
        <p
          style={{
            textTransform: "capitalize",
            fontSize: "14px",
            fontFamily: "Karla, sans-serif",
          }}
        >
          unfortunately, there is no result for the search, "{searchString}"
        </p>
      )}
      <div className="search-flex" ref={searchSlide}>
        <div className="user-flex-side">
          {stateSearchResult.map((value, index) => (
            <UserCard
              searchResultObj={value}
              onclick={clickFunc}
              id={value?.userId}
              Myindex={index}
            />
          ))}
        </div>

        <div className="profile-flex-side">
          <UserSearchProfile result={stateSearchResult[arrayIndex]} />
        </div>
      </div>
    </div>
  );
};
