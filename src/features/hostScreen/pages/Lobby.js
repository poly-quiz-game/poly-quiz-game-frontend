import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popover, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";
import music from "../../../assets/Welcome-to-Planet-Urf.mp3";

import "../styles.scss";

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

const Lobby = ({ socket }) => {
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [playing, toggle] = useAudio(music);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("get-game-info");

    socket.on("no-game-found", () => {
      navigate(-1);
    });

    socket.on("game-info", (game) => {
      setGame(game);
    });

    socket.on("lobby-players", (players) => {
      setPlayers(players);
    });

    return () => {
      socket.emit("disconnect", socket.id);
      socket.off("no-game-found");
      socket.off("game-info");
      socket.off("lobby-players");
    };
  }, []);

  const startGame = () => {
    navigate(`/host/game/${socket.id}`);
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
      <div className="game-info">
        <div className="game-pin">
          <h2>Mã phòng:</h2>
          <Tooltip title="Đã copy" trigger="click">
            <h1
              className="pin"
              onClick={() => navigator.clipboard.writeText(game.pin)}
            >
              {game?.pin}
            </h1>
          </Tooltip>
        </div>
      </div>
      <div className="gameinfobottom">
        <div className="game-header">
          <div style={{ display: "flex" }}>
            <Button
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
              type="primary"
              onClick={toggle}
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
          <div>
            <Button
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
