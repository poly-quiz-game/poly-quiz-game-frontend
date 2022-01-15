import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Lobby = ({ socket }) => {
  const [quiz, setQuizData] = useState({});
  const [room, setRoomData] = useState({});
  const [players, setPlayers] = useState([]);

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRoom");
    socket.emit("getQuiz", { id: params.quizId });

    const quizListener = (result) => {
      console.log(result);
      setQuizData(result || {});
    };

    const roomListener = (result) => {
      if (!result) {
        return navigate(-1);
      }
      setRoomData(result);
    };

    const playerLobbyListener = (data) => {
      setPlayers(data);
    };

    socket.on("quizData", quizListener);
    socket.on("roomData", roomListener);

    socket.on("updatePlayerLobby", playerLobbyListener);

    return () => {
      socket.off("updatePlayerLobby", playerLobbyListener);
    };
  }, []);

  return (
    <div>
      <h3>{room.pin}</h3>
      <p>{JSON.stringify(quiz, null, 4)}</p>
      <ul>
        {players.map((p) => (
          <li>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
