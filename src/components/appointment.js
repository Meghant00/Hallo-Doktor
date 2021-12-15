import React from "react";

const Appoinment = ({ name, phone, appoinmentTime, token, doctorName }) => {
  return (
    <tr className="bg-white">
      <td className="text-left px-4 py-3">{name}</td>
      <td className="text-left px-4 py-3">{phone}</td>
      <td className="text-left px-4 py-3">{appoinmentTime}</td>
      <td className="text-left px-4 py-3">{token}</td>
      <td className="text-left px-4 py-3">{doctorName}</td>
    </tr>
  );
};

export default Appoinment;
