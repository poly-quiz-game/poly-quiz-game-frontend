import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Statistic, Button } from "antd";

import "../styles.scss";

const Lobby = ({ socket }) => {
  const [room, setRoomData] = useState({});
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("getRoom");
    const roomListener = (room) => {
      console.log(111, room);
      if (!room) {
        return navigate(-1);
      }
      setRoomData(room);
    };

    const playerLobbyListener = (data) => {
      setPlayers(data);
    };

    socket.on("roomData", roomListener);

    socket.on("updatePlayerLobby", playerLobbyListener);

    return () => {
      socket.off("updatePlayerLobby", playerLobbyListener);
      socket.off("roomData", roomListener);
    };
  }, []);

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
          <Link to={`/play/enter-pin/${room.pin}`}>Bấm vào đây</Link>
          <br />
          <h3>Danh sách người chơi:</h3>
          <div>
            {players.map((p) => (
              <Button key={p.name}>{p.name}</Button>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Lobby;
