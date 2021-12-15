import React from "react";

const Message = ({ message, bot, status }) => {
  const checkDoctorStatus = () => {
    if (!status) {
      return (
        <img
          src="/images/message-icon-body.png"
          alt="message-icon"
          className="rounded-full w-10 h-10 bottom-0"
        />
      );
    }
  };
  const checkMessage = (message, type) => {
    if (bot) {
      return (
        <div className="flex flex-row items-start">
          {checkDoctorStatus()}
          <div className="py-2 my-2 px-4 bg-blue-400 mr-auto rounded-r-xl rounded-b-xl ">
            <div>{message}</div>
          </div>
        </div>
      );
    }
    return (
      <div className="py-2 my-2 px-4 bg-gray-400 ml-auto rounded-l-xl rounded-b-xl ">
        <div>{message}</div>
      </div>
    );
  };
  return (
    <div className="flex flex-col items-start">
      {checkMessage(message, bot)}
    </div>
  );
};

export default Message;
