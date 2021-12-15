import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegPaperPlane, FaTimes } from "react-icons/fa";
import Doctor from "./doctor";
import Message from "./message";

const Doctors = () => {
  //Doctor's List
  const doctor = [
    {
      name: "Suraj Khadgi",
      department: "Dermatology",
      nmcNumber: "3432",
      status: "offline",
      doctorImage: "images/C.jpg",
    },
    {
      name: "Kangana Balampaki",
      department: "Orthopedics",
      nmcNumber: 8756,
      status: "online",
      doctorImage: "images/B.jpg",
    },
    {
      name: "Nikhil Sherpa",
      department: "Genral Surgery",
      nmcNumber: 5167,
      status: "online",
      doctorImage: "images/D.jpg",
    },
    {
      name: "Payal Shrestha",
      department: "Gynocology",
      nmcNumber: 886,
      status: "offline",
      doctorImage: "images/E.jpg",
    },
    {
      name: "Aadinath Chaudhary",
      department: "Pediatrics",
      nmcNumber: 6745,
      status: "offline",
      doctorImage: "images/F.jpg",
    },
  ];

  //Appointment
  const [appointment, setAppointment] = useState({
    name: "",
    phone: "",
    appointmentDate: "",
    token: "",
    doctorName: "",
  });

  //Token
  const [token, setToken] = useState();

  //State of Chatbox
  const [chatBox, setChatBox] = useState(false);

  //Random Token Generator
  useEffect(() => {
    setToken(Math.floor(Math.random() * 100) + 1);
  }, []);

  //Submit event of appointment
  const handleAnswerChange = (event) => {
    if (
      event.keyCode === 13 &&
      appointment.name !== "" &&
      appointment.phone !== "" &&
      appointment.appointmentDate !== ""
    ) {
      event.preventDefault();
      axios
        .post(
          "https://sheet.best/api/sheets/39ac0081-655b-4339-b2c3-726f3f053cef",
          appointment
        )
        .then((response) => {
          console.log(response);
        });
    }
  };

  //Messages
  const [messages, setMessages] = useState([]);
  let nameFunction = false;

  //Current Message
  const [currentMessage, setCurrentMessage] = useState("");

  //Patient Name
  const [name, setName] = useState("");

  //Doctor's Name
  const [chatDoctorName, setChatDoctorName] = useState("");

  //Doctor's Status
  const [chatDoctorStatus, setchatDoctorStatus] = useState(false);

  //Condition if doctor is not active
  useEffect(() => {
    if (chatDoctorStatus) {
      setMessages([]);
    } else {
      setMessages([
        {
          message:
            "The doctor is currently offline. Please type 'Hallo Doktor' to activate smart chatbot",
          bot: true,
        },
      ]);
    }
  }, [chatDoctorStatus]);

  //Action for send button
  const chatSendHandler = (event) => {
    const sentMessage = currentMessage;

    event.preventDefault();
    if (!chatDoctorStatus) {
      if (
        messages.some(
          (message) => message.message.toLowerCase() === "hallo doktor"
        )
      ) {
        if (
          messages.some((message) => message.message.toLowerCase() === "new") ||
          messages.some((message) => message.message.toLowerCase() === "old")
        ) {
          chatYesNO(sentMessage);
          if (messages.some((message) => message.message === "Yes")) {
            if (!nameFunction) {
              getName(sentMessage);
            }

            const number = getNumber(sentMessage);

            setAppointment({
              name: name,
              phone: number.number,
              appointmentDate: number.appointmentDate,
              token: token,
              doctorName: chatDoctorName,
            });
          }
        } else {
          checkPatient();
        }
      } else {
        chatConditionHandler(sentMessage);
      }
    } else {
      setMessages([...messages, { message: currentMessage, bot: false }]);
    }
    setCurrentMessage("");
    if (!chatDoctorStatus) {
      audioHandler();
    }
  };

  const chatConditionHandler = (sentMessage) => {
    let displayMessage = "I do not undertand you. Please type again!";

    if (sentMessage.toLowerCase() === "hallo doktor") {
      displayMessage = "Are you a new patient or an old patient ?";
      setMessages([
        ...messages,
        { message: sentMessage, bot: false },
        {
          message: displayMessage,
          bot: true,
        },
      ]);
    }
    setMessages([
      ...messages,
      { message: sentMessage, bot: false },
      { message: displayMessage, bot: true },
    ]);
  };
  const checkPatient = () => {
    let displayMessage = "I do not undertand you can you type again";

    if (
      currentMessage.toLowerCase() === "new" ||
      currentMessage.toLowerCase() === "old"
    ) {
      displayMessage =
        "Do you want to make an appointment ? Type 'Yes' to make an appointment and 'No' to end the chat.";

      setMessages([
        ...messages,
        { message: currentMessage, bot: false },
        {
          message: displayMessage,
          bot: true,
        },
      ]);
    }
    setMessages([
      ...messages,
      { message: currentMessage, bot: false },
      { message: displayMessage, bot: true },
    ]);
  };
  const chatYesNO = (sentMessage) => {
    let displayMessage = "";
    if (sentMessage.toLowerCase() === "yes") {
      displayMessage = "Please give us your name";
      setMessages([
        ...messages,
        { message: sentMessage, bot: false },
        {
          message: displayMessage,
          bot: true,
        },
      ]);
    } else if (sentMessage.toLowerCase() === "no") {
      displayMessage = "Please contact the hospital if you need any service";
      setMessages([
        ...messages,
        { message: sentMessage, bot: false },
        {
          message: displayMessage,
          bot: true,
        },
      ]);
    } else {
      displayMessage = "Sorry I do not understand you";
      setMessages([
        ...messages,
        { message: sentMessage, bot: false },
        {
          message: displayMessage,
          bot: true,
        },
      ]);
    }
  };
  const getName = (sentMessage) => {
    let count = 0;
    let displayMessage = "Please enter your phone or mobile number";
    const returnValue = sentMessage;
    setName(sentMessage);
    setMessages([
      ...messages,
      { message: sentMessage, bot: false },
      { message: displayMessage, bot: true },
    ]);
    count++;
    if (count >= 2) {
      nameFunction = true;
    }
    return returnValue;
  };
  const getNumber = (sentMessage) => {
    const number = sentMessage;
    let today = new Date();
    let dd = today.getDate() + 1;
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hour = today.getHours() + 2;
    let minute = "00";

    today =
      "Date: " + mm + "/" + dd + "/" + yyyy + " Time: " + hour + ":" + minute;
    const returnValue = { number: number, appointmentDate: today };
    const tokenName = hour < 12 ? token + "A" : token + "P";
    let displayMessage =
      "Your appointment date is " +
      today +
      " and your token number is " +
      token;

    setToken(tokenName);
    setMessages([
      ...messages,
      { message: sentMessage, bot: false },
      { message: displayMessage, bot: true },
    ]);
    if (sentMessage.length !== 10) {
      setMessages([
        ...messages,
        { message: currentMessage, bot: false },
        { message: "Please enter a valid mobile number", bot: true },
      ]);
    } else {
      setMessages([
        ...messages,
        { message: currentMessage, bot: false },
        { message: displayMessage, bot: true },
        {
          message:
            "Your Appointment has been saved please visit us or contact the hospital for your appointment.",
          bot: true,
        },
      ]);
    }
    return returnValue;
  };

  //Event after clicking doctor's Name
  const nameClickHandler = (name, status) => {
    setChatBox(true);
    setChatDoctorName(name);
    if (status.toLowerCase() === "offline") {
      setchatDoctorStatus(false);
    } else if (status.toLowerCase() === "online") {
      setchatDoctorStatus(true);
    }
  };

  //Message Validation
  const messageValidation = () => {
    if (currentMessage === "") {
      return (
        <button type="submit" disabled className="mx-2">
          <FaRegPaperPlane className="text-xl px-2 py-2 w-12 h-12 bg-purple-500 text-white rounded-full focus:outline-none" />
        </button>
      );
    }
    return (
      <button type="submit" className="mx-2">
        <FaRegPaperPlane className="text-xl px-2 py-2 w-12 h-12 bg-purple-500 text-white rounded-full focus:outline-none" />
      </button>
    );
  };

  //Chatbox component
  const chatBoxHandler = () => {
    if (chatBox) {
      return (
        <div className=" bottom-0 right-2 fixed flex flex-col w-full md:w-1/4 bg-gray-300 rounded-t-lg">
          <div className="py-4 px-2 bg-blue-900 rounded-t-lg flex flex-row justify-between">
            <h3 className="text-xl font-semibold text-white px-2">
              {chatDoctorName !== "" ? chatDoctorName : "Chatbot"}
            </h3>
            <FaTimes
              className="text-2xl text-white"
              onClick={() => setChatBox(false)}
            />
          </div>
          <div className="py-4 h-80 overflow-y-auto">
            {messages.map((item) => (
              <Message
                message={item.message}
                bot={item.bot}
                key={item.message}
                status={chatDoctorStatus}
              />
            ))}
          </div>
          <form
            className="border-t-2 border-gray-600 bg-gray-300 py-2"
            onSubmit={chatSendHandler}
          >
            <div className="pt-1 flex flex-row items-center">
              <input
                type="text"
                placeholder="Type Here....."
                className="py-2 px-2 focus:outline-none w-3/4"
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
                onKeyUp={handleAnswerChange}
              />
              {messageValidation()}
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div
          className="fixed bottom-0 right-0 cursor-pointer"
          onClick={() => setChatBox(true)}
        >
          <img
            className="h-32 w-32"
            src="/images/HalloDoctor2.png"
            alt="chat logo"
          />
        </div>
      );
    }
  };
  const audioHandler = () => {
    const audio = new Audio("/audio/chatAudio.mp3");
    audio.play();
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-xl px-4">
        {doctor.map((doctor) => (
          <Doctor
            key={doctor.name}
            doctorName={doctor.name}
            doctorDepartment={doctor.department}
            doctorImage={doctor.doctorImage}
            nmcNumber={doctor.nmcNumber}
            status={doctor.status}
            nameClickHandler={() =>
              nameClickHandler(doctor.name, doctor.status)
            }
          />
        ))}
      </div>
      {chatBoxHandler()}
    </div>
  );
};

export default Doctors;
