import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Statistic, Button, Popover,Image } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";

import "../styles.scss";

const Lobby = ({ socket }) => {
  const [game, setGame] = useState(null);
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

  if (!game) {
    return "";
  }

  return (
    <div>
      <div className="lobby__screen">
        <Row>
          <Col span={12} offset={6}>
            <div className="game-info">
              <h2>Mã Phòng</h2>
              <Statistic formatter={(val) => val} value={game?.pin} />
            </div>
          </Col>
        </Row>
      </div>
      <div className="gameinfobottom">
        <div className="game-logo-start">
          <div><Button
              type="primary"
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#1F0B40",
                border: 'none'
              }}
            >
              <UserOutlined/> {players?.length}
            </Button></div>
          <div><Image
                  style={{
                    width: "50%",
                    margin: "0 auto",
                  }}
                  src="/img/logo.png"
                ></Image></div>
          <div>
            <Button
            style={{
              width: "100%",
              margin: "0 auto",
              backgroundColor: "#1F0B40",
              color: "#fff",
              border: 'none'
            }}
              type="primary"
              onClick={startGame}
              disabled={!players.length}
            >
              Bắt đầu game
            </Button>
          </div>
          </div>
          <div className="player">
          <h3>Danh sách người chơi:</h3>
            {players.map((p) => (
              <Popover content="Kick" key={p.name}>
                <Button
                style={{
                  marginTop: "5px",
                }}
                  className="player-name"
                  onClick={() => kickPlayer(p.playerSocketId)}
                >
                  {p.name}
                </Button>
                <br></br>
              </Popover>
            ))}
          </div>
        
      </div>
    </div>
  );
};

export default Lobby;
