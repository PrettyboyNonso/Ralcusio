import {
  faAngleLeft,
  faCakeCandles,
  faCircleXmark,
  faImage,
  faLocationDot,
  faNewspaper,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserImg from "./images/fb.jpg";
import { useContext, useEffect, useRef, useState } from "react";
import { Devices } from "./App";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "./backend";
import { v4 } from "uuid";
import { LOading } from "./ClassComponents/LOading";
import { LoadingHome } from "./LoadingHome";
export const SearchUser = () => {
  const { setVisible, stateSearchResult, searchString } = useContext(Devices);
  const [currentId, setCurrentId] = useState(stateSearchResult[0]?.userId);
  const [arrayIndex, setArrayIndex] = useState(0);
  const { userDataState } = useContext(Devices);
  const [buttonValue, setButtonValue] = useState("");
  const [openMessage, setOpenMessage] = useState(false);
  const [loadingMessage, setLOadingMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState("");
  const textareaRef = useRef(null);
  const startConvo = async () => {
    if (textareaRef.current.value.trim().length >= 1) {
      const messageValue = textareaRef?.current?.value;

      setLOadingMessage(true);
      const chatdbRef = collection(database, "chats");

      const checkForConvo = async () => {
        const chatQuery = query(chatdbRef);
        const chatSnapShot = await getDocs(chatQuery);
        let foundConvo = {
          found: false,
          chatCollectionId: "",
        };

        for (const value of chatSnapShot.docs) {
          const convo =
            value?.data()?.participants?.includes(currentId) &&
            value?.data()?.participants?.includes(userDataState?.userId);

          if (convo) {
            foundConvo.found = true;
            foundConvo.chatCollectionId = value?.data()?.chatCollectionId;
            break;
          }
        }
        return foundConvo;
      };
      const convoIsOpen = await checkForConvo();

      if (!convoIsOpen?.found) {
        const chatFirestoreRef = await addDoc(chatdbRef, {
          chatId: v4(),
          participants: [userDataState?.userId, currentId],
          lastMessage: messageValue,
          senderId: userDataState?.userId,
          sentTime: serverTimestamp(),
        });

        const updateChatDoc = doc(database, "chats", chatFirestoreRef?.id);
        await updateDoc(updateChatDoc, {
          chatCollectionId: chatFirestoreRef?.id,
        });
        const messageSubCollectionRef = collection(
          chatFirestoreRef,
          "messages"
        );
        await addDoc(messageSubCollectionRef, {
          senderId: userDataState?.userId,
          text: messageValue,
          sentTime: serverTimestamp(),
        });
        setLOadingMessage(false);
        setSentMessage("message successfully sent");
      } else if (convoIsOpen?.found) {
        const foundChatRef = doc(
          database,
          "chats",
          convoIsOpen?.chatCollectionId
        );

        const addmessageCollectionRef = collection(foundChatRef, "messages");
        await addDoc(addmessageCollectionRef, {
          senderId: userDataState?.userId,
          text: messageValue,
          sentTime: serverTimestamp(),
        });

        await updateDoc(foundChatRef, {
          lastMessage: messageValue,
          senderId: userDataState?.userId,
          sentTime: serverTimestamp(),
        });
        setLOadingMessage(false);
        setSentMessage("message successfully sent");
      }
    } else {
      setSentMessage("input field cannot be empty");
    }
  };

  const PopUpMessage = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: "3",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: "100%",
          height: "100dvh",
          left: "0em",
          top: "0em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3em" }}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            style={{
              alignSelf: "flex-start",
              color: "#ed7014",
              fontSize: "22px",
            }}
            onClick={() => setOpenMessage(false)}
          />
          <textarea
            ref={textareaRef}
            name=""
            id=""
            placeholder="type your message"
            style={{
              resize: "none",
              width: "30em",
              height: "10em",
              outline: "none",
              paddingLeft: "0.5em",
              paddingTop: "0.5em",
              fontFamily: "Karla, sans-serif",
              fontSize: "14px",
            }}
          ></textarea>
          <p
            style={{
              fontFamily: "Karla, sans-serif",
              fontSize: "14px",
              textTransform: "capitalize",
              color:
                sentMessage === "input field cannot be empty" ? "red" : "green",
            }}
          >
            {sentMessage}
          </p>
          <button
            style={{
              width: "fit-content",
              alignSelf: "flex-end",
              padding: "0.4em 0.7em",
              textTransform: "capitalize",
              fontFamily: "Karla, sans-serif",
              backgroundColor: "#ed7014",
              color: "white",
              border: "1px solid grey",
              borderRadius: "3px",
              cursor: "pointer",
            }}
            onClick={startConvo}
          >
            send message
          </button>
        </div>
      </div>
    );
  };

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

  const handleButtonFollow = async () => {
    if (buttonValue === "follow") {
      const dbRef = doc(database, "users", userDataState?.collectionId);
      await updateDoc(dbRef, {
        "following.users": arrayUnion(currentId),
        "following.count": increment(1),
      });
      const userCollection = collection(database, "users");
      const followedUser = query(
        userCollection,
        where("userId", "==", currentId)
      );
      const followedUserSnapShot = await getDocs(followedUser);
      let followedCollectionId = null;
      if (!followedUserSnapShot.empty) {
        const { collectionId, ...rest } = followedUserSnapShot.docs[0]?.data();
        followedCollectionId = collectionId;
      }
      if (followedCollectionId) {
        console.log(followedCollectionId);
        const dbFollowedRef = doc(database, "users", followedCollectionId);
        await updateDoc(dbFollowedRef, {
          "followers.users": arrayUnion(userDataState?.userId),
          "followers.count": increment(1),
        });
      }
    } else if (buttonValue === "message") {
      setOpenMessage(true);
    }
  };

  const checkIfFollowing = () => {
    const isFollowing = userDataState?.following?.users?.find(
      (value) => value === currentId
    );
    isFollowing ? setButtonValue("message") : setButtonValue("follow");
  };

  useEffect(() => {
    checkIfFollowing();
  }, [currentId, buttonValue]);
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
                <p>{`${result?.followers?.count} followers`}</p>
                <div className="dot"></div>
                <p>{`${result?.following?.count} following`}</p>

                {userDataState?.userId !== currentId && (
                  <button
                    className="normal-btn"
                    style={{
                      cursor: "pointer",
                      border: "none",
                      marginLeft: "2em",
                    }}
                    onClick={handleButtonFollow}
                  >
                    {buttonValue}
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
                  marginLeft: "9em",
                  marginTop: "5em",
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
                  <p>{`${searchResultObj.followers?.count} followers`}</p>
                  <div className="dot"></div>
                  <p>{`${searchResultObj.following?.count} following`}</p>
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
      {loadingMessage && <LoadingHome />}
      {openMessage && <PopUpMessage />}
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
