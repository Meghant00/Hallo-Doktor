import axios from "axios";
import React, { useEffect, useState } from "react";
import Message from "./message";
import { FaRegPaperPlane } from "react-icons/fa";
const MessageBox = () => {
  const [appoinment, setAppoinment] = useState({
    name: "",
    phone: "",
    appoinmentDate: "",
    token: "",
  });
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(Math.floor(Math.random() * 100) + 1);
  }, []);
  const handleAnswerChange = (event) => {
    if (
      event.keyCode === 13 &&
      appoinment.name !== "" &&
      appoinment.phone !== "" &&
      appoinment.appoinmentDate !== ""
    ) {
      event.preventDefault();
      axios
        .post(
          "https://sheet.best/api/sheets/acd15e91-c39a-4bb2-bf8c-0b339ea48d10",
          appoinment
        )
        .then((response) => {
          console.log(response);
        });
    }
  };
  const [messages, setMessages] = useState([
    {
      message: "Please say 'Hallo Doktor' to activate smart chatbot",
      bot: true,
    },
  ]);
  let nameFunction = false;
  const [currentMessage, setCurrentMessage] = useState("");
  const [name, setName] = useState("");

  const chatSendHandler = (event) => {
    const sentMessage = currentMessage;

    event.preventDefault();
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

          setAppoinment({
            name: name,
            phone: number.number,
            appoinmentDate: number.appoinmentDate,
            token: token,
          });
        }
      } else {
        checkPatient();
      }
    } else {
      chatConditionHandler(sentMessage);
    }
    setCurrentMessage("");
  };

  const chatConditionHandler = (sentMessage) => {
    let displayMessage = "I do not undertand you can you type again";

    if (sentMessage.toLowerCase() === "hallo doktor") {
      displayMessage =
        "Your doctor is not currently available. How may I help you?  Are you a first timer or a regular patient ? Type New for First Time and Old for regular patient";

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
    let displayMessage = "I do not undertand you. Please type again!";

    if (
      currentMessage.toLowerCase() === "new" ||
      currentMessage.toLowerCase() === "old"
    ) {
      displayMessage =
        "Do you want to make an appoinment ? Type 'Yes' to make an appoinment and 'No' to not end the chat";

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
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let hour = today.getHours() + 2;
    let minute = "00";

    today =
      "Date: " + mm + "/" + dd + "/" + yyyy + " Time: " + hour + ":" + minute;
    const returnValue = { number: number, appoinmentDate: today };
    const tokenName = hour < 12 ? token + "A" : token + "P";
    let displayMessage =
      "Your appoinment date is " + today + " and your token number is " + token;

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
            "Your Appoinment has been saved please visit us or contact the hospital for your appoinment.",
          bot: true,
        },
      ]);
    }
    return returnValue;
  };

  return (
    <div className=" bottom-0 right-2 fixed flex flex-col w-full md:w-1/4 bg-gray-300 rounded-t-lg">
      <div className="py-4 px-2 bg-blue-900 rounded-t-lg">
        <h3 className="text-xl font-semibold text-white px-2">Chatbot</h3>
      </div>
      <div className="py-4 h-80 overflow-y-auto">
        {messages.map((item) => (
          <Message
            message={item.message}
            bot={item.bot}
            key={item.message}
            widget={item.widget}
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
            className="py-2 px-2 focus:outline-none w-3/4"
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
            onKeyUp={handleAnswerChange}
          />
          <button type="submit" className="mx-2">
            <FaRegPaperPlane className="text-xl px-2 py-2 focus:outline-none w-12 h-12 bg-purple-500 text-white rounded-full" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageBox;
