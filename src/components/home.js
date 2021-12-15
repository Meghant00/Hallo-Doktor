import React from "react";

const Home = () => {
  return (
    <div>
      <div className="w-4/5 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          <div className="group">
            <h1 className=" group text-4xl pt-16 pb-4 text-blue-800 font-semibold leading-relaxed">
              Complete Hospital Management Solution
            </h1>
            <div className="group group-hover:bg-blue-600 w-full h-2 bg-yellow-600 rounded-full transition duration-300 ease-linear"></div>
            <p className="group py-8 text-xl">
              Digitize your task with the help of our smart chat bot "Hallo
              Doktor!"
            </p>
            <div className="group flex flex-row items-center justify-start gap-x-4 py-4">
              <a
                href="/"
                className="font-semibold text-xl text-white bg-blue-600 px-8 py-2 rounded-full hover:bg-yellow-600 transition duration-500 ease-linear"
              >
                Learn More
              </a>
              <a
                href="/contact"
                className="font-semibold text-xl text-white bg-yellow-600 px-8 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-linear"
              >
                Demo
              </a>
            </div>
          </div>
          <div className="flex relative flex-col items-center justify-center overflow-hidden">
            <a href="/doctor">
              <img
                className="h-4/5 mt-32 transation duration-300 ease-linear"
                src="images/dokbot.gif"
                alt="main"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
