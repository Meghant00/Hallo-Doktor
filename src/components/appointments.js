import React, { useEffect, useState } from "react";
import Appointment from "./appointment";

const Appoinments = () => {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    fetch("https://sheet.best/api/sheets/39ac0081-655b-4339-b2c3-726f3f053cef")
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="container w-4/5 mx-auto border-b-8 border-blue-800 rounded my-4">
      <table className="rounded-b-lg w-full py-4 bg-blue-600">
        <thead>
          <tr>
            <th className="py-4 px-4 text-white font-semibold text-1xl text-left">
              Name
            </th>
            <th className="py-4 px-4 text-white font-semibold text-1xl text-left">
              Phone Number
            </th>
            <th className="py-4 px-4 text-white font-semibold text-1xl text-left">
              Appoinment Time
            </th>
            <th className="py-4 px-4 text-white font-semibold text-1xl text-left">
              Token
            </th>
            <th className="py-4 px-4 text-white font-semibold text-1xl text-left">
              Doctor
            </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((item) => (
            <Appointment
              name={item.name}
              phone={item.phone}
              appoinmentTime={item.appointmentDate}
              token={item.token}
              doctorName={item.doctorName}
              key={item.token}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appoinments;
