import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Statistic, Button } from "antd";

import "../styles.scss";

const Lobby = ({ socket }) => {
  const [room, setRoomData] = useState({});
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRoom");

    socket.on("roomData", (room) => {
      if (!room) {
        return navigate(-1);
      }
      setRoomData(room);
    });

    socket.on("updatePlayerLobby", (data) => {
      setPlayers(data);
    });

    socket.on("roomStarted", function (id) {
      console.log("id", id);
      navigate(`/host/game/${id}`);
    });

    return () => {
      console.log("disconeect lobby");
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const startGame = () => {
    socket.emit("startRoom");
  };

  return (
    <div className="lobby__screen">
      <Row>
        <Col span={12} offset={6}>
          <div className="room-info">
            <Statistic
              title="Mã trò chơi"
              formatter={(val) => val}
              value={room.pin}
            />
          </div>
          <br />
          <h3>Danh sách người chơi:</h3>
          <div>
            {players.map((p) => (
              <Button key={p.name}>{p.name}</Button>
            ))}
          </div>
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
