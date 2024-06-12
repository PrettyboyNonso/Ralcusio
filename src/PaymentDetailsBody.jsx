import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export const PaymentDetailsBody = () => {
  return (
    <div className="payment-details-body">
      <p>brooklyn simons</p>
      <p style={{ color: "red" }}>pending</p>
      <p>feb 5, 23</p>
      <p>$350</p>
      <p>learning</p>
      <FontAwesomeIcon
        icon={faDownload}
        style={{
          color: "#ed7014",
          marginLeft: "1em",
        }}
      />
    </div>
  );
};
