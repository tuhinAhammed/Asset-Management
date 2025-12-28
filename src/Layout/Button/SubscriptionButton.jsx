import React from "react";
import PrimaryButton from "./PrimaryButton";
import { useSelector } from "react-redux";
import { IoIosSend } from "react-icons/io";
import { FaCircleNotch, FaRegCircle } from "react-icons/fa";

const SubscriptionButton = ({
  onApply,
  onChange,
  onClick,
  subscriptionData,
  subscriptionLoading,
}) => {

  return (
    <div className="flex items-center overflow-hidden">
      <input
        onChange={onChange}
        value={subscriptionData} // Bind the input field with subscriptionData state
        type="text"
        className="text-base leading-0 p-2 py-2 pl-4 w-full !ring-0 focus:!ring-0 text-tertiary placeholder-gray-500 !border-[1px] border-borderColor focus:border-theme border-r-0 rounded-md rounded-r-none"
        placeholder="Enter Email Address"
      />
      <div
        onClick={onClick}
        className="text-base text-center text-white bg-theme   px-4 rounded-r-md hover:bg-theme-dark active:bg-static active:border-static leading-0 duration-200 cursor-pointer py-2 lg:py-2 !border-[1px] border-theme"
      >
        {subscriptionLoading ? (
          <div className=" text-2xl  rounded-full animate-spin">
            <p className="">
            <FaCircleNotch />
          </p>
          </div>
        ) : (
          <p className="text-2xl">
            <IoIosSend />
          </p>
        )}
      </div>
    </div>
  );
};

export default SubscriptionButton;
