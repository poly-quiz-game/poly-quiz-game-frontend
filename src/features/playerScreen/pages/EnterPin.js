import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";

const EnterPin = ({ socket }) => {
  const [pin, setPin] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [room, setRoomData] = useState(null);

  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.pin) {
      setPin(params.pin);
      checkRoom(params.pin);
    }
    const roomListener = (room) => {
      if (!room) {
        return setError("Phòng không tồn tại!");
      }
      setRoomData(room);
    };

    socket.on("roomDataFromPin", roomListener);
    () => {
      socket.emit("disconnect");
    };
  }, []);

  const checkRoom = (pin) => {
    socket.emit("getRoomByPin", pin);
  };

  return (
    <div className="join-room__screen">
      <div className="enter-pin-form">
        {!room ? (
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
            <Link to={`/play/pre-start/${room.pin}&${name}`}>
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
