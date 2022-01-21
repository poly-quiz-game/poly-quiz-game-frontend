import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EnterPin = ({ socket }) => {
  let params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.pin || !params.name) {
      navigate("/play/enter-pin");
    }

    socket.emit("player-join", { name: params.name, pin: params.pin });

    socket.on("noGameFound", function () {
      navigate("/play/enter-pin");
    });

    socket.on("kickedByHost", function () {
      navigate("/play/enter-pin");
    });

    socket.on("hostDisconnect", function () {
      navigate("/play/enter-pin");
    });

    socket.on("gameStartedPlayer", function () {
      navigate(`/play/play-game/${socket.id}`);
    });

    return () => {
      socket.emit("disconnect", socket.id);
    };
  }, []);

  return (
    <div className="join-room__screen">Thấy tên bạn trên màn hình ko?</div>
  );
};

export default EnterPin;
