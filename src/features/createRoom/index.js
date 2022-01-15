import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateRoom = ({ socket }) => {
  const [quiz, quizData] = useState({});
  const [gamePin, setGamePin] = useState(null);
  let params = useParams();

  useEffect(() => {
    socket.emit("getQuiz", { id: params.quizId });

    const quizListener = (result) => {
      console.log(result);
      quizData(result || {});
    };

    const roomPinListener = (result) => {
      setGamePin(result);
    };

    socket.on("quizData", quizListener);
    socket.on("showRoomPin", roomPinListener);

    return () => {
      socket.off("getQuiz", quizListener);
    };
  }, [socket, params]);

  const startGame = () => {
    socket.emit("host-join", { id: quiz._id });
  };

  if (gamePin) {
    return <Navigate to="/lobby/quizId=61e058c307f36ad6157d356d" />;
  }

  return (
    <div>
      <ul>
        <li>{quiz._id}</li>
        <li>{quiz.name}</li>
      </ul>

      <button onClick={startGame}>Bắt đầu game</button>
    </div>
  );
};

export default CreateRoom;
