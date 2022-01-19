import React, { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Table, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "../styles.scss";

const initialState = {
  question: {},
  questionResult: [],
  gameOver: null,
};

function reducer(state, action) {
  console.log(action.type, ": ", action.payload);
  switch (action.type) {
    case "setQuestion":
      return { ...state, question: action.payload };
    case "setQuestionResult":
      return { ...state, questionResult: action.payload };
    case "setGameOver":
      return { ...state, gameOver: action.payload };

    default:
      return state;
  }
}

const Lobby = ({ socket }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("host-join-room", { id: params.id });

    socket.on("noRoomFound", function () {
      navigate(`/quiz`);
    });

    socket.on("roomQuestions", (question) => {
      console.log(111, question);
      dispatch({ type: "setQuestionResult", payload: [] });
      dispatch({ type: "setQuestion", payload: question });
    });

    socket.on("questionOver", (data) => {
      dispatch({ type: "setQuestionResult", payload: data });
    });

    socket.on("RoomOver", (data) => {
      console.log("RoomOver: ", data);
      dispatch({ type: "setGameOver", payload: data });
    });

    () => {
      console.log("disconeect game");
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const nextQuestion = () => {
    socket.emit("nextQuestion");
  };

  const endGame = () => {
    navigate(`/quiz`);
  };

  const { question, questionResult, gameOver } = state;

  if (gameOver) {
    return (
      <div className="game__screen">
        <Row>
          <Col span={20} offset={2}>
            <div className="question-info">
              <Table
                columns={[
                  {
                    title: "Xếp hạng",
                    dataIndex: "num",
                    key: "num",
                  },
                  {
                    title: "Tên",
                    dataIndex: "name",
                    key: "name",
                  },
                ]}
                dataSource={Object.keys(gameOver)
                  .map((key, index) => ({
                    name: gameOver[key],
                    num: index + 1,
                  }))
                  .filter((e) => e.name)}
              />
            </div>
            <Button type="primary" onClick={endGame}>
              Kết thúc
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  if (questionResult.length) {
    return (
      <div className="game__screen">
        <Row>
          <Col span={20} offset={2}>
            <div className="question-info">
              <Table
                columns={[
                  {
                    title: "Tên",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Điểm",
                    dataIndex: "score",
                    key: "score",
                  },
                ]}
                dataSource={questionResult
                  .sort((a, b) => b.roomData.score - a.roomData.score)
                  .map(({ name, roomData: { score } }) => ({ name, score }))}
              />
            </div>
            <Button type="primary" onClick={nextQuestion}>
              Câu hỏi tiếp theo
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div className="game__screen">
      <Row>
        <Col span={20} offset={2}>
          <div className="question-info">
            <h1 className="question">{question.q1}</h1>
            <div className="player">
              <UserOutlined />
              {question.playersInRoom}
            </div>
            <Row gutter={16}>
              <Col span={6}>
                <div className="answer">
                  <div className="answer-index">1</div>
                  <h2>{question.a1}</h2>
                </div>
              </Col>
              <Col span={6}>
                <div className="answer">
                  <div className="answer-index">2</div>
                  <h2>{question.a2}</h2>
                </div>
              </Col>
              <Col span={6}>
                <div className="answer">
                  <div className="answer-index">3</div>
                  <h2>{question.a3}</h2>
                </div>
              </Col>
              <Col span={6}>
                <div className="answer">
                  <div className="answer-index">4</div>
                  <h2>{question.a4}</h2>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Lobby;
