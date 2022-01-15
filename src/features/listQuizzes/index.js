import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./ListQuizzes.module.css";

const ListQuizzes = ({ socket }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const quizListener = (res) => {
      setQuizzes(res || []);
    };

    socket.emit("requestDbNames");
    socket.on("quizNamesData", quizListener);
    return () => {
      socket.off("requestDbNames", quizListener);
    };
  }, [socket]);
  return (
    <div className="quiz-list">
      <h1>listQuizzes:</h1>
      <table>
        <tr>
          <th>name</th>
          <th>questions</th>
          <th></th>
        </tr>
        {quizzes.map((quiz) => (
          <tbody key={quiz._id}>
            <td>{quiz.name}</td>
            <td>{JSON.stringify(quiz.questions)}</td>
            <td>
              <Link to={`/create-room/quizId=${quiz._id}`}>
                <button>create room</button>
              </Link>
            </td>
          </tbody>
        ))}
      </table>
      <br />
    </div>
  );
};

export default ListQuizzes;
