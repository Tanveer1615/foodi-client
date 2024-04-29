import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="loading loading-infinity  text-red w-72"></span>
    </div>
  );
};

export default LoadingSpinner;
