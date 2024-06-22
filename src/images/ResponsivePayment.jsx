import {
  faArrowUp,
  faCircleExclamation,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const ResponsivePayment = () => {
  return (
    <div className="responsive-payment">
      <div className="responsive-payment-child">
        <div className="responsive-pay-icon">
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ fontSize: "22px", color: "#ed7014" }}
          />
        </div>
        <div className="responsive-h2">
          <h2>1,243</h2>
          <small>
            <FontAwesomeIcon icon={faArrowUp} />
            2.45%
          </small>
        </div>
        <p>approved transactions</p>
      </div>
      <div className="responsive-payment-child">
        <div className="responsive-pay-icon">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            style={{ fontSize: "22px", color: "#ed7014" }}
          />
        </div>
        <div className="responsive-h2">
          <h2>43</h2>
          <small>
            <FontAwesomeIcon icon={faArrowUp} />
            1.45%
          </small>
        </div>
        <p>declined transactions</p>
      </div>
      <div className="responsive-payment-child">
        <div className="responsive-pay-icon">
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ fontSize: "22px", color: "#ed7014" }}
          />
        </div>
        <div className="responsive-h2">
          <h2>1,243</h2>
        </div>
        <p>approved transactions</p>
      </div>
      <div className="responsive-payment-child">
        <div className="responsive-pay-icon">
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ fontSize: "22px", color: "#ed7014" }}
          />
        </div>
        <div className="responsive-h2">
          <h2>1,243</h2>
        </div>
        <p>approved transactions</p>
      </div>
    </div>
  );
};
