import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "./roomSlice";
import "./Rooms.module.css";

const Rooms = ({ socket }) => {
  console.log(111, socket);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const roomListener = (result) => {
      setQuizzes(result || []);
    };

    socket.emit("requestDbNames");

    socket.on("roomNamesData", roomListener);
    socket.on("showRoomPin", (res) => console.log("showRoomPin: ", res));

    return () => {
      socket.off("requestDbNames", roomListener);
    };
  }, [socket]);

  const createRoom = () => {
    // console.log(socket)
    socket.emit("host-join", { id: 1 });
  };
  console.log(quizzes);
  return (
    <div className="room-list">
      list quizzes:
      <table>
        <tr>
          <th>name</th>
          <th>questions</th>
        </tr>
        {quizzes.map((quiz) => (
          <tbody key={quiz._id}>
            <td>{quiz.name}</td>
            <td>{JSON.stringify(quiz.questions)}</td>
          </tbody>
        ))}
      </table>
      <br />
      <button onClick={createRoom}>create room</button>
    </div>
  );
};

export { Rooms };
