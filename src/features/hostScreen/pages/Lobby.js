import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover, Tooltip } from "antd";
import { UserOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import ReactHowler from "react-howler";

import music from "../../../assets/game_theme.mp3";

import "../styles.scss";

const Lobby = ({ socket }) => {
  const [game, setGame] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [players, setPlayers] = useState([]);
  const [playing, setPlaying] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("get-game-info");

    socket.on("no-game-found", () => {
      navigate(-1);
    });

    socket.on("game-stoped", () => {
      navigate(-1);
    });

    socket.on("game-info", (game) => {
      setGame(game);
    });

    socket.on("lobby-locked", (value) => {
      setIsLocked(value);
    });

    socket.on("lobby-players", (players) => {
      setPlayers(players);
    });

    if (socket?.disconnected) {
      socket.connect();
    }
    return () => {
      socket.off("no-game-found");
      socket.off("game-info");
      socket.off("lobby-players");
    };
  }, []);

  const startGame = () => {
    navigate(`/host/play/game/${socket.id}`);
  };

  const onLockLobby = () => {
    socket.emit("host-lock-lobby", !isLocked);
  };

  const kickPlayer = (playerSocketId) => {
    socket.emit("host-kick-player-on-lobby", {
      hostSocketId: socket.id,
      playerSocketId,
    });
  };

  if (!game) {
    return "";
  }

  return (
    <div className="lobby__screen">
      {playing && <ReactHowler src={music} loop playing type="audio/mpeg" volume={0.2} />}
      <div className="game-info">
        <div className="game-pin">
          <h2>Mã phòng:</h2>
          <Tooltip title="Đã copy" trigger="click">
            <h1
              className="pin"
              onClick={() => navigator.clipboard.writeText(game.pin)}
            >
              {isLocked ? "------" : game?.pin}
            </h1>
          </Tooltip>
        </div>
      </div>
      <div className="gameinfobottom">
        <div className="game-header">
          <div style={{ display: "flex" }}>
            <Button
              size="large"
              type="primary"
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#1F0B40",
                border: "none",
                marginRight: "10px",
              }}
            >
              <UserOutlined /> {players?.length}
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() => {
                setPlaying(!playing);
              }}
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#1F0B40",
                border: "none",
              }}
            >
              {playing ? (
                <i className="fas fa-volume-up"></i>
              ) : (
                <i className="fas fa-volume-mute"></i>
              )}
            </Button>
          </div>
          <div style={{ display: "flex" }}>
            <Button
              size="large"
              type="primary"
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#1F0B40",
                border: "none",
                marginRight: "10px",
              }}
              onClick={onLockLobby}
            >
              {isLocked ? <LockOutlined /> : <UnlockOutlined />}
            </Button>
            <Button
              size="large"
              style={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "#1F0B40",
                color: "#fff",
                border: "none",
              }}
              type="primary"
              onClick={startGame}
              // disabled={!players.length}
            >
              Bắt đầu game
            </Button>
          </div>
        </div>
        <div className="player">
          <h3>Danh sách người chơi:</h3>
          <div className="player-list">
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
    </div>
  );
};

export default Lobby;
