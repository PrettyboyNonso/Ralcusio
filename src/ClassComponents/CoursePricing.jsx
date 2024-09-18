import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
export const CoursePricing = ({ selectRef, pricingRef }) => {
  return (
    <div className="course-pricing">
      <div className="course-pricing-head">
        <h2>course pricing</h2>
        <p>
          create a detailed pricing plan for your course. here is a breakdown to
          help you structure your pricing
        </p>
      </div>
      <form action="">
        <div className="pricing-head">
          <h3>price</h3>
        </div>
        <div className="add-price">
          <label htmlFor="price">normal price</label>
          <FontAwesomeIcon icon={faArrowRight} />
          <div className="price-input">
            <select name="" id="" ref={selectRef}>
              <option value="usd">USD</option>
              <option value="ngn">NGN</option>
              <option value="gbp">GBP</option>
            </select>
            <input type="number" ref={pricingRef} />
          </div>
          <div className="add-discount-btn"></div>
        </div>
      </form>
    </div>
  );
};
