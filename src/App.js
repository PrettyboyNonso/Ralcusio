import "./App.css";
import { Application } from "./Application";
import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import React, { useState, useRef, useReducer, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Homepage } from "./Homepage";
import { auth, database, storage } from "./backend";
import { getDownloadURL, ref } from "firebase/storage";
export const Devices = React.createContext();
function App() {
  const [countries, setCountries] = useState([]);
  const [targetElement, setTargetElement] = useState("");
  const [activeLinkId, setActiveLinkId] = useState("");
  const [dateState, setDateState] = useState(new Date());
  const [nameError, setNameError] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [accountTypeError, setAccountTypeError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [FinishError, setFinishError] = useState(false);
  const [firstNameState, setFirstName] = useState("");
  const [lastNameState, setLastName] = useState("");
  const [accountTypeState, setAccountType] = useState("");
  const firstNameRef = useRef(null);
  const lastnameRef = useRef(null);
  const ResponsivefirstNameRef = useRef(null);
  const ResponsivelastnameRef = useRef(null);
  const genderRef = useRef(null);
  const ResponsivegenderRef = useRef(null);
  const emailRef = useRef(null);
  const ResponsiveEmailRef = useRef(null);
  const passwordRef = useRef(null);
  const ResponsivepasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const ResponsiveconfirmPasswordRef = useRef(null);
  const dateRef = useRef(null);
  const [invisible, setInvisible] = useState(true);
  const [userDataState, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

  const [fetchedFact, setFetchedFact] = useState(
    JSON.parse(sessionStorage.getItem("dataFact"))
  );

  const [visible, setVisible] = useState(false);
  const [stateSearchResult, setStateSearchResult] = useState([]);
  const [searchString, setSearchString] = useState("");
  const searchInput = useRef(null);

  const findPeople = async () => {
    if (searchInput.current.value.trim() !== "") {
      const removeExtraSpaces = searchInput.current.value.split(" ");

      let NewRemoveExtraSpace = removeExtraSpaces.filter(
        (value) => value !== ""
      );

      setSearchString(NewRemoveExtraSpace.join(" "));
      const searchResults = [];
      const dataBaseRef = collection(database, "users");
      const SearchQuery = query(
        dataBaseRef,
        where(
          "fullName",
          "==",
          NewRemoveExtraSpace.join(" ").toLocaleLowerCase()
        )
      );
      const Users = await getDocs(SearchQuery);
      Users.forEach((snap) => {
        const { password, ...rest } = snap.data();
        searchResults.push(rest);
      });
      setStateSearchResult(searchResults);
      setVisible(true);
    }
  };

  function userStateReducer(state, action) {
    switch (action.type) {
      case "RESPONSIVEFIRST":
        state.firstName = ResponsivefirstNameRef.current.value;
        state.lastName = ResponsivelastnameRef.current.value;
        return state;
      case "FIRST":
        state.firstName = firstNameRef.current.value;
        state.lastName = lastnameRef.current.value;
        return state;
      case "SECOND":
        state.gender = genderRef.current.querySelector(
          'input[name="gender"]:checked'
        )?.value;
        return state;
      case "RESPONSIVESECOND":
        state.gender = ResponsivegenderRef.current.querySelector(
          'input[name="gender"]:checked'
        )?.value;
        return state;
      case "THIRD":
        state.accountType = accountTypeState;
        return state;
      case "FOURTH":
        state.dateOfBirth = dateState;
        return state;
      case "FIFTH":
        state.emailAddress = emailRef.current.value;
        state.password = passwordRef.current.value;
        return state;
      case "RESPONSIVEFIFTH":
        state.emailAddress = ResponsiveEmailRef.current.value;
        state.password = ResponsivepasswordRef.current.value;
        return state;
      default:
        return state;
    }
  }

  const [UserState, dispatchUserState] = useReducer(userStateReducer, {
    userId: null,
    firstName: null,
    lastName: null,
    fullName: null,
    gender: null,
    accountType: null,
    dateOfBirth: null,
    emailAddress: null,
    password: null,
    profileUrl: null,
    coverUrl: null,
    followers: 0,
    following: 0,
    bio: null,
    headline: null,
    education: null,
    countryOfResidence: null,
    countryOfOrigin: null,
  });

  const [state, dispatch] = useReducer(reducerFn, { activeBar: "login" });

  const [marginState, dispatchMargin] = useReducer(reducerMarginFn, {
    margin: 0,
  });

  function reducerMarginFn(state, action) {
    switch (action.type) {
      case "INCREASE":
        if (state.margin < 500) {
          return { margin: state.margin + 100 };
        } else {
          return { margin: 500 };
        }
      case "DECREASE":
        if (state.margin >= 100) {
          return { margin: state.margin - 100 };
        } else {
          return { margin: 0 };
        }
      case "RESET":
        return { margin: 0 };

      default:
        return state;
    }
  }

  function reducerFn(state, action) {
    switch (action.type) {
      case "LOGIN":
        return { activeBar: "login" };
      case "REGISTER":
        return { activeBar: "register" };
      default:
        return state;
    }
  }

  const ValidateFirst = () => {
    if (
      firstNameRef.current.value.trim() !== "" &&
      lastnameRef.current.value.trim() !== ""
    ) {
      setNameError(false);
      return true;
    } else {
      setNameError(true);
      return false;
    }
  };
  const ValidateResponsiveFirst = () => {
    if (
      ResponsivefirstNameRef.current.value.trim() !== "" &&
      ResponsivelastnameRef.current.value.trim() !== ""
    ) {
      setNameError(false);
      return true;
    } else {
      setNameError(true);
      return false;
    }
  };

  const ValidateSecond = () => {
    if (
      genderRef.current.querySelector('input[name="gender"]:checked')?.value
    ) {
      setGenderError(false);
      return true;
    } else {
      setGenderError(true);
    }
  };
  const ResponsiveValidateSecond = () => {
    if (
      ResponsivegenderRef.current.querySelector('input[name="gender"]:checked')
        ?.value
    ) {
      setGenderError(false);
      return true;
    } else {
      setGenderError(true);
    }
  };

  const ValidateThird = () => {
    if (accountTypeState) {
      setAccountTypeError(false);
      return true;
    } else {
      setAccountTypeError(true);
    }
  };
  const ValidateFourth = () => {
    if (dateState) {
      setDateError(false);
      return true;
    } else {
      setDateError(true);
      return false;
    }
  };

  const ValidateFifth = () => {
    if (
      passwordRef.current.value === confirmPasswordRef.current.value &&
      (passwordRef.current.value.trim() !== "") &
        (emailRef.current.value.trim() !== "")
    ) {
      setFinishError(false);
      return true;
    } else {
      setFinishError(true);
      return false;
    }
  };

  const ResponsiveValidateFifth = () => {
    if (
      ResponsivepasswordRef.current.value ===
        ResponsiveconfirmPasswordRef.current.value &&
      (ResponsivepasswordRef.current.value.trim() !== "") &
        (ResponsiveEmailRef.current.value.trim() !== "")
    ) {
      setFinishError(false);
      return true;
    } else {
      setFinishError(true);
      return false;
    }
  };

  const NameFunc = () => {
    console.log(UserState.firstName, UserState.lastName);
    dispatchUserState({ type: "FIRST" });
    const Validate = ValidateFirst();
    console.log(Validate);
    if (Validate) {
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const ResponsiveNameFunc = () => {
    console.log(UserState);
    const Validate = ValidateResponsiveFirst();
    console.log(Validate);
    console.log(marginState.margin);
    if (Validate) {
      dispatchUserState({ type: "RESPONSIVEFIRST" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const GenderFunc = () => {
    const ValidateGender = ValidateSecond();
    if (ValidateGender) {
      dispatchUserState({ type: "SECOND" });
      dispatchMargin({ type: "INCREASE" });
    }
  };
  const ResponsiveGenderFunc = () => {
    const ValidateGender = ResponsiveValidateSecond();
    if (ValidateGender) {
      dispatchUserState({ type: "RESPONSIVESECOND" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const StateFunc = () => {
    const ValidateAccountType = ValidateThird();
    if (ValidateAccountType) {
      dispatchUserState({ type: "THIRD" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const DateFunc = () => {
    const validateDate = ValidateFourth();
    console.log(dateState);
    if (validateDate) {
      dispatchUserState({ type: "FOURTH" });
      dispatchMargin({ type: "INCREASE" });
    }
  };

  const FinishFunc = () => {
    const validateFinish = ValidateFifth();
    if (validateFinish) {
      dispatchUserState({ type: "FIFTH" });
      handleSignIn();
      console.log(UserState);
    }
  };

  const ResponsiveFinishFunc = () => {
    const validateFinish = ResponsiveValidateFifth();
    if (validateFinish) {
      dispatchUserState({ type: "RESPONSIVEFIFTH" });
      handleSignIn();
      console.log(UserState);
    }
  };

  const loginFunc = () => {
    dispatch({ type: "LOGIN" });
    dispatchMargin({ type: "RESET" });
  };

  useEffect(() => {
    if (userDataState) {
      const referenceToDb = collection(database, "users");
      const q = query(
        referenceToDb,
        where("userId", "==", userDataState.userId)
      );
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            const { password, ...rest } = userData;
            sessionStorage.setItem("userData", JSON.stringify(rest));
            setUserData(rest);
          }
        },
        (error) => console.log(error)
      );
      return () => unsubscribe();
    }
  }, []);

  const FetchFacts = async () => {
    const url = "https://api.api-ninjas.com/v1/quotes";
    const key = "oJ+becv2gZYT0DR5Hvm9ew==HA8Lh2iA7NYjihvA";
    const headers = {
      "X-Api-Key": key,
    };

    try {
      const response = await fetch(url, { headers });
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };

  // signs the user in and redirects the user to the application
  const dataBaseRef = collection(database, "users");
  async function handleSignIn() {
    try {
      const dataFact = await FetchFacts();
      sessionStorage.setItem("dataFact", JSON.stringify(dataFact));
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        UserState.emailAddress,
        UserState.password
      );

      const coverImageRef = ref(storage, `olive-wood-364426_1280.jpg`);
      const profileImageref = ref(storage, "OIP.jpeg");
      const profilePhotoUrl = await getDownloadURL(profileImageref);
      const coverPhotourl = await getDownloadURL(coverImageRef);

      let userId = userCredential.user.uid;
      const firebaseStorageRef = await addDoc(collection(database, "users"), {
        userId: userId,
        emailAddress: userCredential.user.email.toLocaleLowerCase(),
        firstName: UserState.firstName.toLocaleLowerCase(),
        lastName: UserState.lastName.toLocaleLowerCase(),
        fullName: `${UserState.firstName.toLocaleLowerCase()} ${UserState.lastName.toLocaleLowerCase()}`,
        gender: UserState.gender,
        accountType: UserState.accountType,
        dateOfBirth: UserState.dateOfBirth,
        password: UserState.password,
        profileUrl: null,
        coverUrl: null,
        followers: 0,
        following: 0,
        bio: null,
        headline: null,
        education: null,
        countryOfResidence: null,
        countryOfOrigin: null,
        collectionId: null,
      });
      const userDbRef = doc(database, "users", firebaseStorageRef.id);
      await updateDoc(userDbRef, {
        collectionId: firebaseStorageRef.id,
        coverUrl: coverPhotourl,
        profileUrl: profilePhotoUrl,
      });
      const loggedInUser = query(dataBaseRef, where("userId", "==", userId));

      const loggedInQuery = await getDocs(loggedInUser);
      loggedInQuery.forEach((snap) => {
        const { password, ...rest } = snap.data();
        sessionStorage.setItem("userData", JSON.stringify(rest));
      });

      window.location.href = "./Application";
    } catch (error) {
      console.log("error during sign in process", error);
    }
  }

  async function logUser(email, password) {
    try {
      const dataFact = await FetchFacts();
      sessionStorage.setItem("dataFact", JSON.stringify(dataFact));
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDetaiils = userCred.user;
      const q = query(
        collection(database, "users"),
        where("userId", "==", userDetaiils.uid)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const { password, ...rest } = userData;
        sessionStorage.setItem("userData", JSON.stringify(rest));
        window.location.href = "./Application";
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleTarget = (e) => {
    setTargetElement(e.target);
    console.log(targetElement);
  };

  const handleWheel = (e) => {
    if (targetElement) {
      const messageBody = document.querySelector(".messageBody");
      const chatComponent = document.querySelector(".chatcomponent-div");
      const aside = document.querySelector(".aside");
      const chatBrief = document.querySelector(".chatBrief");
      handleTarget(e);
      if (messageBody && chatBrief && aside && chatComponent) {
        if (messageBody.contains(targetElement)) {
          chatBrief.style.position = "static";
          chatBrief.style.overfolow = "auto";
          chatBrief.style.width = "90%";
          chatComponent.style.position = "fixed";
        } else if (aside.contains(targetElement)) {
          chatComponent.style.position = "fixed";
          chatBrief.style.position = "fixed";
          chatBrief.style.width = "50%";
        } else if (!messageBody.contains(targetElement)) {
          chatBrief.style.position = "fixed";
          chatBrief.style.width = "50%";
          chatComponent.style.position = "static";
        }
      }
    }
  };

  const handleClick = (e) => {
    let clickedElement = e.target.closest(".links");
    setInvisible(true);
    if (clickedElement) {
      const clickedElementId = clickedElement.id;
      setActiveLinkId(clickedElementId);
      sessionStorage.setItem("activeLinkId", clickedElementId);
      if (clickedElement.classList.contains("active")) {
        //   do nothing
      } else if (!clickedElement.classList.contains("active")) {
        const allLinks = Array.from(document.querySelectorAll(".links"));
        allLinks.map(
          (value) =>
            value.classList.contains("active") &&
            value.classList.remove("active")
        );

        clickedElement.classList.add("active");
      }
    }
    console.log(activeLinkId);
  };

  const CreateObjectCountries = async () => {
    try {
      const Response = await fetch("https://restcountries.com/v3.1/all");
      const data = await Response.json();
      const funcCountry = [];
      data.forEach((arr) => {
        funcCountry.push({ value: arr.cca2, label: arr.name.common });
      });
      setCountries(funcCountry.sort((a, b) => a.label.localeCompare(b.label)));
    } catch (error) {
      return error;
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    sessionStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    CreateObjectCountries();
  }, []);

  return (
    <Devices.Provider
      value={{
        setActiveLinkId,
        activeLinkId,
        handleClick,
        dateState,
        setDateState,
        UserState,
        dispatchUserState,
        accountTypeState,
        setAccountType,
        firstNameRef,
        lastnameRef,
        genderRef,
        emailRef,
        passwordRef,
        handleSignIn,
        state,
        marginState,
        loginFunc,
        dispatchMargin,
        nameError,
        NameFunc,
        genderError,
        GenderFunc,
        accountTypeError,
        StateFunc,
        DateFunc,
        dateError,
        confirmPasswordRef,
        FinishError,
        FinishFunc,
        dispatch,
        firstNameState,
        lastNameState,
        setFirstName,
        setLastName,
        ResponsivefirstNameRef,
        ResponsivelastnameRef,
        ResponsiveNameFunc,
        ResponsiveGenderFunc,
        ResponsivegenderRef,
        logUser,
        setInvisible,
        invisible,
        userDataState,
        countries,
        FetchFacts,
        fetchedFact,
        setFetchedFact,
        signOutUser,
        ResponsivepasswordRef,
        ResponsiveEmailRef,
        ResponsiveconfirmPasswordRef,
        ResponsiveFinishFunc,
        visible,
        setVisible,
        stateSearchResult,
        setStateSearchResult,
        searchInput,
        findPeople,
        setSearchString,
        searchString,
      }}
    >
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Homepage ref={dateRef} />} />
            <Route
              path="/Application"
              element={
                <Application
                  handleTarget={handleTarget}
                  handleWheel={handleWheel}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Devices.Provider>
  );
}

export default App;
