import React from "react";
import Property from "../../../components/Properties/Property";
const Favorite = () => {
  return (
    <React.Fragment>
      <div className="Banner">
        <img src="/banner.jpeg" alt="Banner" />
      </div>
      <div className="Property-container">
        <p className="Property-title">Properties</p>
        <div className="Property-list">
          <Property favorite={true}></Property>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Favorite;