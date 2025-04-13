import React from "react";

const Loader = () => {
  return (
    <div className="flex cursor-wait items-center justify-center gap-3.5 rounded-md bg-white px-4 py-2 shadow-sm">
      <div className="border-t-primary-300 h-10 w-10 animate-spin rounded-full border-4 border-gray-300"></div>
      Loading ...
    </div>
  );
};

export default Loader;
