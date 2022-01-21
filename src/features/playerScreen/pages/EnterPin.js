import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useParams, Link } from "react-router-dom";

const EnterPin = ({ socket }) => {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [game, setRoomData] = useState(null);

  let params = useParams();

  useEffect(() => {
    if (params.pin) {
      setPin(params.pin);
      checkRoom(params.pin);
    }
    const roomListener = (game) => {
      if (!game) {
        return setError("Phòng không tồn tại!");
      }
      setRoomData(game);
    };

    socket.on("roomDataFromPin", roomListener);

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  const checkRoom = (pin) => {
    socket.emit("getRoomByPin", pin);
  };

  return (
    <div className="join-room__screen">
      <div className="enter-pin-form">
        {!game ? (
          <>
            <p>Nhập mã game</p>
            <Input
              placeholder="Nhập PIN"
              value={pin}
              onChange={(e) => {
                setError("");
                setPin(e.target.value);
              }}
            />
            <Button type="primary" onClick={() => checkRoom(pin)}>
              Tham gia
            </Button>
          </>
        ) : (
          <>
            <p>Nhập tên</p>
            <Input
              placeholder="Nhập tên của bạn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Link to={`/play/pre-start/${game.pin}&${name}`}>
              <Button type="primary">Bắt đầu</Button>
            </Link>
          </>
        )}
        <p>{error}</p>
      </div>
    </div>
  );
};

export default EnterPin;
