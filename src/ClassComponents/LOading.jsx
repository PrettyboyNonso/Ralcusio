import MyImage from "../images/Beige_Black_Bold_Minimalist_Brand_Signature_Logo-removebg-preview.png";
export const LOading = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        top: "0em",
        left: "0em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "11",
      }}
    >
      <div
        className="outer-circle"
        style={{
          width: "3.5em",
          height: "3.5em",
          border: "2px solid #ed7014",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <div
          style={{
            width: "2em",
            height: "2em",
            border: "2px solid white",
            borderRadius: "50%",
            padding: ".3em",
            backgroundColor: "black",
          }}
          className="inner-circle"
        >
          <img
            src={MyImage}
            alt="logo"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};
