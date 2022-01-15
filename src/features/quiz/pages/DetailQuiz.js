import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "antd";

import MainLayout from "../../../layouts/main.layout";

import { fetchQuiz, selectQuiz, selectLoading } from "../quizSlice";

import "./styles.css";

const DetailQuiz = ({ socket }) => {
  let params = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector(selectQuiz);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchQuiz(params.id));
  }, [dispatch, params]);

  return (
    <MainLayout>
      <div className="start-quiz">
        <h3>Detail quiz</h3>
        {loading ? <Skeleton /> : <p>{JSON.stringify(quiz)}</p>}
      </div>
    </MainLayout>
  );
};

export default DetailQuiz;
