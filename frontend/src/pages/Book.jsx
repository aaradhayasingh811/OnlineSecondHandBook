import React from "react";
import LeftBook from "../components/LeftBook";
import RightBook from "../components/RightBook";

const Book = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start gap-6 p-6">
      {/* Left Book Image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <LeftBook />
      </div>

      {/* Right Book Details */}
      <div className="w-full lg:w-2/3">
        <RightBook />
      </div>
    </div>
  );
};

export default Book;
