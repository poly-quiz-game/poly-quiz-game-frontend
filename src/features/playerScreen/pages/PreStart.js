import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const EnterPin = ({ socket }) => {
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.pin || !params.name) {
      navigate("/play/enter-pin");
    }

    socket.emit("player-join", { name: params.name, pin: params.pin });

    socket.on("noRoomFound", function () {
      console.log("noRoomFound");
      // navigate("/play/enter-pin");
    });

    socket.on("hostDisconnect", function () {
      console.log("hostDisconnect");
      // navigate("/play/enter-pin");
    });

    socket.on("gameStartedPlayer", function () {
      console.log("gameStartedPlayer");
      navigate(`/play/play-game/${socket.id}`);
    });

    () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  return (
    <div className="join-room__screen">Thấy tên bạn trên màn hình ko?</div>
  );
};

export default EnterPin;
