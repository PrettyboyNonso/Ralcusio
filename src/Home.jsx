import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { faHeadphones, faVideo, faX } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Devices } from "./App";
import { collection, getDocs } from "firebase/firestore";
import { database } from "./backend";
export const Home = () => {
  const { microphonesState, speakerState, videoState, permission, promptUser } =
    useContext(Devices);
  const [activeId, setActiveId] = useState("");
  const [settingClicked, setSettingClicked] = useState(false);

  // async function getData() {
  //   try {
  //     const querySnap = await getDocs(collection(database, "users"));
  //     querySnap.forEach((snap) => console.log(snap.data()));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // getData();

  const setClick = () => {
    if (!permission) {
      promptUser();
    }

    setSettingClicked(!settingClicked);

    console.log(microphonesState, speakerState, videoState);
  };

  const handleActivestate = (e) => {
    const targetelement = e.target.closest(".optionNavs");
    if (targetelement) {
      const targetId = targetelement.id;
      setActiveId(targetId);
    }
  };

  useEffect(() => {
    if (activeId === "") {
      setActiveId("audio");
    }
  }, [activeId]);

  const Microphone = () => {
    return (
      <>
        <div className="microPhone">
          <p>microphone</p>
          <select name="" id="">
            {permission ? (
              microphonesState.map((mic, index) => (
                <option value={mic} key={index}>
                  {mic}
                </option>
              ))
            ) : (
              <option value="denied">
                Permision Denied - Allow Microphone
              </option>
            )}
          </select>
        </div>
        <div className="microPhone">
          <p>Speaker</p>
          <select name="" id="">
            {permission ? (
              speakerState.map((speaker, index) => (
                <option value={speaker} key={index}>
                  {speaker}
                </option>
              ))
            ) : (
              <option value="denied">
                Permision Denied - Allow Microphone
              </option>
            )}
          </select>
        </div>
      </>
    );
  };

  const Camera = () => {
    return (
      <div className="microPhone camera">
        <p>camera</p>
        <select name="" id="">
          {permission ? (
            videoState.map((camera, index) => (
              <option value={camera}>{camera}</option>
            ))
          ) : (
            <option value="denied">Permision Denied - Allow Camera</option>
          )}
        </select>
      </div>
    );
  };

  const SettingComponent = () => {
    return (
      <div
        className="settingCompo"
        style={{ display: settingClicked ? "flex" : "none" }}
      >
        <div className="settingOption1">
          <div className="option1head">
            <h2>Settings</h2>
          </div>
          <div className="optionOneNav">
            <div
              id="audio"
              className={`optionNavs ${
                activeId === "audio" ? "activeSetting" : ""
              }`}
              onClick={handleActivestate}
            >
              <FontAwesomeIcon
                icon={faHeadphones}
                style={{ fontSize: "20", color: "#ed7014" }}
              />
              <p>audio</p>
            </div>
            <div
              className={`optionNavs ${
                activeId === "video" ? "activeSetting" : ""
              }`}
              id="video"
              onClick={handleActivestate}
            >
              <FontAwesomeIcon
                icon={faVideo}
                style={{ fontSize: "20", color: "#ed7014" }}
              />
              <p>video</p>
            </div>
          </div>
        </div>
        <div className="settingOption2">
          <FontAwesomeIcon
            icon={faX}
            style={{
              position: "absolute",
              top: "1em",
              right: "1.5em",
              cursor: "pointer",
            }}
            onClick={setClick}
          />
          {activeId === "audio" && <Microphone />}
          {activeId === "video" && <Camera />}
        </div>
      </div>
    );
  };
  return (
    <section className="home">
      <Header setClick={setClick} />
      <Hero />
      <SettingComponent />
    </section>
  );
};
