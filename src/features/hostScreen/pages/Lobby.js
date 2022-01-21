import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Statistic, Button, Popover } from "antd";

import "../styles.scss";

const Lobby = ({ socket }) => {
  const [game, setGameData] = useState({});
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRoom");

    socket.on("roomData", (game) => {
      if (!game) {
        return navigate(-1);
      }
      setGameData(game);
    });

    socket.on("updatePlayerLobby", (data) => {
      console.log("updatePlayerLobby: ", data);
      setPlayers(data);
    });

    socket.on("gameStarted", function (id) {
      console.log("id", id);
      navigate(`/host/game/${id}`);
    });

    return () => {
      console.log("disconeect lobby");
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const startGame = () => {
    socket.emit("startGame");
  };

  const kickPlayer = (playerId) => {
    socket.emit("host-kick-player", { hostId: socket.id, playerId });
  };

  return (
    <div className="lobby__screen">
      <Row>
        <Col span={12} offset={6}>
          <div className="game-info">
            <Statistic
              title="Mã trò chơi"
              formatter={(val) => val}
              value={game.pin}
            />
          </div>
          <br />
          <h3>Danh sách người chơi:</h3>
          <div>
            {players.map((p) => (
              <Popover content="Kick" key={p.name}>
                <Button
                  className="player-name"
                  onClick={() => kickPlayer(p.playerId)}
                >
                  {p.name}
                </Button>
              </Popover>
            ))}
          </div>
          <br />
          <br />
          <Button type="primary" onClick={startGame}>
            Bắt đầu game
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Lobby;
