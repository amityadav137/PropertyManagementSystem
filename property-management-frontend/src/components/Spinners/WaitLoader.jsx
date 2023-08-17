import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import "./WaitLoader.css";
import { useSelector } from "react-redux";

const WaitLoader = () => {
  const [color, setColor] = useState("#36d7b7");
  const loading = useSelector((state) => state.loading.loading);

  return (
    <React.Fragment>
      {loading && (
        <div className="spinner">
          <HashLoader
            color={color}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default WaitLoader;
