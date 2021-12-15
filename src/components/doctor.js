import React from "react";
const Doctor = ({
  doctorImage,
  doctorName,
  doctorDepartment,
  nmcNumber,
  status,
  nameClickHandler,
}) => {
  const checkStatus = () => {
    if (status === "online") {
      return (
        <div className="flex flex-row items-center text-lg py-2">
          <div className="w-4 h-4 rounded-full bg-active"></div>
          <div className="capitalize px-2">{status}</div>
        </div>
      );
    } else if (status === "offline") {
      return (
        <div className="flex flex-row items-center text-lg py-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <div className="capitalize px-2">{status}</div>
        </div>
      );
    }
  };
  return (
    <div className="py-4 px-4 flex flex-col items-start justify-items-start w-full bg-white rounded-3xl shadow-xl">
      <button
        onClick={nameClickHandler}
        className="focus:outline-none text-2xl font-semibold hover:text-blue-500 transition duration-300 ease-linear py-4"
      >
        <img src={doctorImage} alt={doctorName} />
        <p className="py-2 text-left">Dr. {doctorName} </p>
      </button>
      <div className="text-xl py-1 font-semibold">
        Department: {doctorDepartment}
      </div>
      <div className="text-xl py-1 font-semibold">Nmc Number: {nmcNumber}</div>
      {checkStatus(status)}
    </div>
  );
};

export default Doctor;
