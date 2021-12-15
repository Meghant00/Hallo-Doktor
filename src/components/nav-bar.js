import React from "react";

const NavBar = () => {
  return (
    <div className="py-2 flex flex-row items-center justify-between px-4">
      <div className="flex flex-row items-center justify-items-center ">
        <img src="images/logo.png" className="" alt="logo" />
      </div>

      <div className="flex flex-row items-center justify-between">
        <a
          className="px-4 font-semibold text-xl hover:text-blue-600 transition duration-300 ease-linear uppercase"
          href="/"
        >
          About Us
        </a>

        <a
          className="px-4 font-semibold text-xl hover:text-blue-600 transition duration-300 ease-linear uppercase"
          href="/doctor"
        >
          Doctor's List
        </a>

        <a
          className="px-4 font-semibold text-xl hover:text-blue-600 transition duration-300 ease-linear uppercase"
          href="/appointment"
        >
          Appointment
        </a>

        <a
          className="px-4 font-semibold text-xl hover:text-blue-600 transition duration-300 ease-linear uppercase"
          href="/contact"
        >
          Contact Us
        </a>

        <a
          href="/"
          className="font-semibold text-xl text-white bg-yellow-600 px-8 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-linear uppercase"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default NavBar;
