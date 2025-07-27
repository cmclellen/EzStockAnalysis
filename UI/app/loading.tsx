"use client";

import { ImSpinner9 } from "react-icons/im";

type loadingProps = {
  //children: React.ReactNode;
};

function loading(_props: loadingProps) {
  return (
    <div className="text-primary flex items-center justify-center fixed inset-0">
      <div className="flex items-center space-x-1 font-semibold text-xl">
        <ImSpinner9 className="animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default loading;
