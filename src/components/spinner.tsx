import React, { FC } from 'react';
type Props = {
    text?: string
}
const Spinner: FC<Props> = ({text}) => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="w-5 h-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <span className="ml-2">{text ? text : "Processing..."}</span>
    </div>
  );
};

export default Spinner;
