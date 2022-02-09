import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Statistic, Button, Popover } from "antd";

import "../styles.scss";

const Lobby = ({ socket }) => {
  const [game, setGame] = useState({});
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("host-getGame");

    socket.on("noGameFound-host", () => {
      navigate(-1);
    });

    socket.on("gameData-host", (res) => {
      setGame(res);
    });

    socket.on("updatePlayerLobby-host", (data) => {
      console.log("updatePlayerLobby: ", data);
      setPlayers(data);
    });

    socket.on("gameStarted", function (id) {
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

  const kickPlayer = (playerSocketId) => {
    socket.emit("host-kick-player", {
      hostSocketId: socket.id,
      playerSocketId,
    });
  };

  return (
    <div className="lobby__screen">
      <Row>
        <Col span={12} offset={6}>
          <div className="game-info">
            <Statistic
              title="Mã trò chơi"
              formatter={(val) => val}
              value={game?.pin}
            />
          </div>
          <br />
          <h3>Danh sách người chơi:</h3>
          <div>
            {players.map((p) => (
              <Popover content="Kick" key={p.name}>
                <Button
                  className="player-name"
                  onClick={() => kickPlayer(p.playerSocketId)}
                >
                  {p.name}
                </Button>
              </Popover>
            ))}
          </div>
          <br />
          <br />
          <Button type="primary" onClick={startGame} disabled={!players.length}>
            Bắt đầu game
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Lobby;
