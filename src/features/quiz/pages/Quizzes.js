import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuizzes, selectQuizList, selectLoading } from "../quizSlice";
import { Skeleton } from "antd";

import { Link } from "react-router-dom";

import "./styles.css";

const Quizzes = ({ socket }) => {
  const dispatch = useDispatch();

  const quizzes = useSelector(selectQuizList);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <div className="quizzes">
      {loading ? (
        <Skeleton />
      ) : (
        <table>
          <tr>
            <th>name</th>
            <th></th>
          </tr>
          {quizzes.map((quiz) => (
            <tbody key={quiz._id}>
              <td>{quiz.name}</td>
              <td>
                <Link to={`/quiz/start/${quiz._id}`}>
                  <button>create room</button>
                </Link>
              </td>
            </tbody>
          ))}
        </table>
      )}
      <br />
    </div>
  );
};

export default Quizzes;
