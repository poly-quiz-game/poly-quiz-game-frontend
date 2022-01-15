import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

import { fetchQuiz, selectQuiz, selectLoading } from "../quizSlice";

import "./styles.css";

const StartQuiz = ({ socket }) => {
  let params = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector(selectQuiz);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuiz(params.id));
  }, [dispatch, params]);

  return (
    <div className="start-quiz">
      <h3>Start quiz</h3>
      {loading ? <Skeleton /> : <p>{JSON.stringify(quiz)}</p>}
      <br />
    </div>
  );
};

export default StartQuiz;
