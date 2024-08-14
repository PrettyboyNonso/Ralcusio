import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faCameraRetro,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Devices } from "./App";
import { doc, updateDoc } from "firebase/firestore";
import { database, storage } from "./backend";
import Select from "react-select";
import { parentOptions } from "./countries";
import { childOptions } from "./countries";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// import { countries } from "./images/countries";
export const EditProfile = () => {
  const { setInvisible, userDataState, countries } = useContext(Devices);
  const [date, setDate] = useState(new Date());
  const textArea = useRef(null);
  const firstNameEdit = useRef(null);
  const lastNameEdit = useRef(null);
  const birthdayRef = useRef(null);
  const [loadingEditProfile, setLoadingEditProfile] = useState("");
  const [clickedBtn, setClickedBtn] = useState("");
  const [childOP, setChildOp] = useState([]);
  const childOPRef = useRef(null);
  const parentOPRef = useRef(null);
  const countryRef = useRef(null);
  const originRef = useRef(null);
  const imageAddedRef = useRef(null);
  const inputImageRef = useRef(null);
  const [profileLink, setProfileUrl] = useState("");
  const [imageObj, setImageObj] = useState(null);
  const collegeRef = useRef(null);
  const coverImageRef = useRef(null);
  const [coverImageObj, setCoverImageObj] = useState("");
  const [coverPhotoLink, setCoverPhotoLink] = useState("");

  const addImagePreview = () => {
    if (inputImageRef?.current?.files[0]) {
      const file = inputImageRef.current.files[0];
      setImageObj(file);
      const imageUrl = URL.createObjectURL(file);
      if (imageUrl) {
        setProfileUrl(imageUrl);
      } else {
        console.log("image is empty");
      }
    } else {
      console.log("there is an error in the image");
    }
  };

  const addCoverImagePreview = () => {
    if (coverImageRef?.current?.files[0]) {
      const file = coverImageRef.current.files[0];
      setCoverImageObj(file);
      const imageUrl = URL.createObjectURL(file);
      if (imageUrl) {
        setCoverPhotoLink(imageUrl);
      } else {
        console.log("error with image url");
      }
    }
  };

  async function uploadProfileImage() {
    setClickedBtn("uploadBtn");
    if (!imageObj && !coverImageObj) return;
    setLoadingEditProfile("Saving...");
    let imageRef = null;
    let coverImageRef = null;

    if (coverImageObj) {
      coverImageRef = ref(
        storage,
        `uploads/${userDataState.userId}/coverPhoto/${
          coverImageObj.name + v4()
        }`
      );
    }

    if (imageObj) {
      imageRef = ref(
        storage,
        `uploads/${userDataState.userId}/profileFolder/${imageObj.name + v4()}`
      );
    }

    try {
      let downloadUrl = null;
      let coverUrl = null;

      if (imageObj) {
        const data = await uploadBytes(imageRef, imageObj);
        downloadUrl = await getDownloadURL(data.ref);
      }

      if (coverImageObj) {
        const coverData = await uploadBytes(coverImageRef, coverImageObj);
        coverUrl = await getDownloadURL(coverData.ref);
      }

      const userDbRef = doc(database, "users", userDataState.collectionId);
      await updateDoc(userDbRef, {
        ...(downloadUrl && { profileUrl: downloadUrl }),
        ...(coverUrl && { coverUrl: coverUrl }),
      });

      setLoadingEditProfile("Saved");
      setTimeout(() => {
        setInvisible(true);
      }, 500);
    } catch (error) {
      setLoadingEditProfile(error);
    }
  }

  const getChildren = async (e) => {
    const countryName = e.value;
    setChildOp([...childOptions[countryName]]);
  };
  const customStyle = {
    container: (provided) => ({
      ...provided,
      width: "100%",
      marginTop: "0.3em",
    }),
    control: (provided, state) => ({
      ...provided,
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
      cursor: "pointer",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontFamily: "Karla, sans-serif",
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#000000",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };
  async function saveBio() {
    setClickedBtn("saveBio");
    if (textArea.current.value.trim().length > 1) {
      setLoadingEditProfile("Saving...");
      const userDbRef = doc(database, "users", userDataState.collectionId);

      try {
        await updateDoc(userDbRef, {
          bio: textArea.current.value,
        });
        setLoadingEditProfile("Saved");
        textArea.current.value = "";
        setTimeout(() => {
          setInvisible(true);
        }, 500);
      } catch (error) {
        setLoadingEditProfile(error);
      }
    } else {
      setLoadingEditProfile("You can not have an empty field");
    }
  }

  async function saveSchooling() {
    setClickedBtn("saveSchooling");
    if (collegeRef.current.value.trim().length < 1) {
      setLoadingEditProfile("You can not have an empty field");
    } else {
      setLoadingEditProfile("Saving...");
      const userDbRef = doc(database, "users", userDataState.collectionId);
      try {
        await updateDoc(userDbRef, {
          education: collegeRef.current.value,
        });
        setLoadingEditProfile("Saved");
        setTimeout(() => {
          setInvisible(true);
        }, 500);
      } catch (error) {
        setLoadingEditProfile(error);
      }
    }
  }

  async function saveName() {
    setClickedBtn("saveName");
    if (
      firstNameEdit.current.value.trim().length > 1 &&
      lastNameEdit.current.value.trim().length > 1
    ) {
      setLoadingEditProfile("Saving...");
      const userDbRef = doc(database, "users", userDataState.collectionId);

      try {
        await updateDoc(userDbRef, {
          firstName: firstNameEdit.current.value,
          lastName: lastNameEdit.current.value,
          fullName: `${firstNameEdit.current.value.toLocaleLowerCase()} ${lastNameEdit.current.value.toLocaleLowerCase()}`,
        });
        setLoadingEditProfile("Saved");
        firstNameEdit.current.value = "";
        lastNameEdit.current.value = "";
        setTimeout(() => {
          setInvisible(true);
        }, 500);
      } catch (error) {
        setLoadingEditProfile(error);
      }
    } else {
      setLoadingEditProfile("You can not have an empty field");
    }
  }

  async function saveCountry() {
    setClickedBtn("saveCountry");
    if (countryRef.current?.props?.value?.label) {
      setLoadingEditProfile("Saving...");
      const userDbRef = doc(database, "users", userDataState.collectionId);

      try {
        await updateDoc(userDbRef, {
          countryOfResidence: countryRef.current?.props?.value?.label,
        });
        setLoadingEditProfile("Saved");
        setTimeout(() => {
          setInvisible(true);
        }, 500);
      } catch (error) {
        setLoadingEditProfile(error);
      }
    } else {
      setLoadingEditProfile("You can not have an empty field");
    }
  }

  async function saveOrigin() {
    setClickedBtn("saveOrigin");
    if (originRef.current?.props?.value?.label) {
      setLoadingEditProfile("Saving...");
      const userDbRef = doc(database, "users", userDataState.collectionId);

      try {
        await updateDoc(userDbRef, {
          countryOfOrigin: originRef.current?.props?.value?.label,
        });
        setLoadingEditProfile("Saved");
        setTimeout(() => {
          setInvisible(true);
        }, 500);
      } catch (error) {
        setLoadingEditProfile(error);
      }
    } else {
      setLoadingEditProfile("You can not have an empty field");
    }
  }

  async function saveHeadline() {
    setClickedBtn("saveHeadline");
    if (
      parentOPRef.current?.props?.value?.label &&
      childOPRef.current?.props?.value?.label
    ) {
      setLoadingEditProfile("Saving...");
      const userDbRef = doc(database, "users", userDataState.collectionId);

      try {
        await updateDoc(userDbRef, {
          headline: `${parentOPRef.current?.props?.value?.label} /
            ${childOPRef.current?.props?.value?.label}`,
        });
        setLoadingEditProfile("Saved");
        firstNameEdit.current.value = "";
        lastNameEdit.current.value = "";
        setTimeout(() => {
          setInvisible(true);
        }, 500);
      } catch (error) {
        setLoadingEditProfile(error);
      }
    } else {
      setLoadingEditProfile("You can not have an empty field");
    }
  }

  function clickInput() {
    inputImageRef.current.click();
  }
  return (
    <div className="edit-profile">
      <div className="edit-profile-header">
        <div className="edit-profile-header-icon">
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={{ fontSize: "22px", cursor: "pointer" }}
            onClick={() => setInvisible(true)}
          />
          <h2>edit your profile</h2>
        </div>
      </div>
      <div className="edit-profile-flex">
        <div className="edit-profile-first-flex">
          <div className="edit-profile-page">
            <div className="edit-cover-photo">
              <img
                src={!coverPhotoLink ? userDataState.coverUrl : coverPhotoLink}
                alt=""
              />
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{
                  position: "absolute",
                  right: "0.5em",
                  top: "0.2em",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={() => coverImageRef.current.click()}
              />
            </div>
            <div className="edit-camera-icon">
              {profileLink === "" && (
                <FontAwesomeIcon
                  icon={faCameraRetro}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    // color: "#808080",
                  }}
                  onClick={clickInput}
                />
              )}
              {profileLink !== "" && (
                <img src={profileLink} alt="" ref={imageAddedRef} />
              )}
            </div>
            <div className="other-profile-edit-info">
              <h2>profile image</h2>
              <p>this image will be displayed as your profile image</p>
              <input
                type="file"
                accept="image/*"
                placeholder="upload new"
                ref={inputImageRef}
                onChange={addImagePreview}
                style={{ display: "none" }}
              />
              <input
                type="file"
                accept="image/*"
                placeholder="upload new"
                ref={coverImageRef}
                onChange={addCoverImagePreview}
                style={{ display: "none" }}
              />
            </div>
            <button
              style={{
                width: "25%",
                marginTop: "1em",
                height: "2em",
                marginLeft: "1em",
                fontFamily: "Karla, sans-serif",
                textTransform: "capitalize",
                color: "white",
                backgroundColor: "#808080",
                border: "none",
                cursor: "pointer",
                borderRadius: "3px",
              }}
              onClick={uploadProfileImage}
            >
              save changes
            </button>

            <p
              style={{
                marginTop: "1em",
                paddingLeft: "1em",
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : loadingEditProfile === "You Have To Choose An Image" &&
                      "red",
              }}
            >
              {clickedBtn === "uploadBtn" && loadingEditProfile}
            </p>
          </div>
          <div className="edit-personal-information">
            <div className="info-head-edit">
              <h2>personal informations</h2>
              <button onClick={saveName}>save changes</button>
            </div>
            <div className="edit-personal-form">
              <div className="forms" style={{ flexDirection: "row" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="">first name</label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    style={{ width: "90%" }}
                    ref={firstNameEdit}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <label htmlFor="">last name</label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    style={{ width: "90%" }}
                    ref={lastNameEdit}
                  />
                </div>
              </div>
              <p
                style={{
                  textTransform: "capitalize",
                  fontFamily: "Karla, sans-serif",
                  fontSize: "13px",
                  color:
                    loadingEditProfile === "Saved"
                      ? "green"
                      : loadingEditProfile ===
                          "You can not have an empty field" && "red",
                }}
              >
                {clickedBtn === "saveName" && loadingEditProfile}
              </p>
            </div>
          </div>
          <div className="edit-bio">
            <div className="info-head-edit">
              <h2> bio</h2>
              <button onClick={saveBio}>save changes</button>
            </div>
            <textarea
              type="text"
              placeholder="Tell us about yourself"
              ref={textArea}
            />
            <p
              style={{
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : loadingEditProfile ===
                        "You can not have an empty field" && "red",
              }}
            >
              {clickedBtn === "saveBio" && loadingEditProfile}
            </p>
          </div>
        </div>
        <div className="edit-profile-second-flex">
          <div className="edit-other-information">
            <div className="info-head-edit">
              <h2>add a headline</h2>
              <button onClick={saveHeadline}>save changes</button>
            </div>
            <div className="edit-personal-form">
              <div className="forms">
                <label htmlFor="">headline</label>
                <Select
                  placeholder="What is your area of specialization?"
                  styles={customStyle}
                  options={parentOptions}
                  menuPlacement="top"
                  ref={parentOPRef}
                  onChange={(e) => getChildren(e)}
                ></Select>
                <Select
                  placeholder="Choose your area"
                  styles={customStyle}
                  options={childOP}
                  menuPlacement="bottom"
                  ref={childOPRef}
                ></Select>
              </div>
            </div>
            <p
              style={{
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : loadingEditProfile ===
                        "You can not have an empty field" && "red",
              }}
            >
              {clickedBtn === "saveHeadline" && loadingEditProfile}
            </p>
          </div>

          <div className="edit-other-information">
            <div className="info-head-edit">
              <h2>education</h2>
              <button onClick={saveSchooling}>save changes</button>
            </div>
            <div className="edit-personal-form">
              <div className="forms">
                <label htmlFor="">education</label>
                <input
                  type="text"
                  placeholder="Enter your college name"
                  ref={collegeRef}
                />
              </div>
            </div>

            <p
              style={{
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                marginTop: "1em",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : loadingEditProfile ===
                        "You can not have an empty field" && "red",
              }}
            >
              {clickedBtn === "saveSchooling" && loadingEditProfile}
            </p>
          </div>

          <div className="edit-other-information">
            <div className="info-head-edit">
              <h2>country of origin</h2>
              <button onClick={saveOrigin}>save changes</button>
            </div>
            <div className="edit-personal-form">
              <div className="forms">
                <label htmlFor="">country</label>
                <Select
                  placeholder="Where are you Originally From?"
                  styles={customStyle}
                  options={countries}
                  menuPlacement="bottom"
                  ref={originRef}
                ></Select>
              </div>
            </div>
            <p
              style={{
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : loadingEditProfile ===
                        "You can not have an empty field" && "red",
              }}
            >
              {clickedBtn === "saveOrigin" && loadingEditProfile}
            </p>
          </div>

          {/* <div className="edit-other-information">
            <div className="info-head-edit">
              <h2>birthday</h2>
              <button onClick={saveBirthday}>save changes</button>
            </div>
            <div className="edit-personal-form">
              <div className="forms">
                <label htmlFor="">birthday</label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  showYearDropdown
                  maxDate={new Date()}
                  className="edit-date-picker"
                  ref={birthdayRef}
                />
              </div>
            </div>
            <p
              style={{
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : (loadingEditProfile ===
                        "You can not have an empty field" ||
                        loadingEditProfile ===
                          "You have to be more than 10 years of age") &&
                      "red",
              }}
            >
              {clickedBtn === "saveBirthday" && loadingEditProfile}
            </p>
          </div> */}

          <div className="edit-personal-information">
            <div className="info-head-edit" style={{ marginBottom: "0.5em" }}>
              <h2>where do you live?</h2>
              <button onClick={saveCountry}>save changes</button>
            </div>
            <div className="forms">
              <label htmlFor="">location</label>

              <Select
                placeholder="Which country do you currently reside in?"
                styles={customStyle}
                options={countries}
                menuPlacement="top"
                ref={countryRef}
              ></Select>
            </div>
            <p
              style={{
                textTransform: "capitalize",
                fontFamily: "Karla, sans-serif",
                fontSize: "13px",
                color:
                  loadingEditProfile === "Saved"
                    ? "green"
                    : loadingEditProfile ===
                        "You can not have an empty field" && "red",
              }}
            >
              {clickedBtn === "saveCountry" && loadingEditProfile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
