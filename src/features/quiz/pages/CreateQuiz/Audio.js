import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReactHowler from "react-howler";
import { SettingStartEndTimePlayModal } from "./Video";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const playButtonStyle = {
  width: "100px",
  height: "100px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "30px",
  borderRadius: "50%",
  backgroundColor: "#f5f5f5",
  cursor: "pointer",
  marginBottom: "10px",
  boxShadow: "0px 0px 10px #ccc",
  position: "relative",
};

const deleteButtonStyle = {
  position: "absolute",
  bottom: "20px",
  right: "20px",
};

const audioContentStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const waveAnimationStyle = {
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "#aaa",
  borderRadius: "50%",
};

const playIconStyle = {
  position: "relative",
  zIndex: 10,
};

const timeFromSeconds = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};

const Audio = ({
  media,
  setQuestionMedia,
  setQuestionMediaTime,
  editable = true,
  autoplay = false,
}) => {
  const [play, setPlay] = useState(autoplay);
  const [setupModal, setSetupModal] = useState(false);
  const [time, setTime] = useState(0);

  const timer = React.useRef(null);
  const player = React.useRef(null);

  useEffect(() => {
    if (play) {
      timer.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }
    if (!play || time > media.duration) {
      setPlay(false)
      setTime(0);
      clearInterval(timer.current);
      player.current.stop();
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [play, time]);

  return (
    <div style={containerStyle} className="audio-field">
      <ReactHowler src={media.url} playing={play} loop={false} ref={player} />
      <div style={audioContentStyle}>
        <div onClick={() => setPlay(!play)} style={playButtonStyle}>
          {play ? (
            <>
              <i className="fas fa-stop" style={playIconStyle} />
              <div
                style={waveAnimationStyle}
                className="audio-control-button"
              />
            </>
          ) : (
            <i className="fas fa-play" style={playIconStyle} />
          )}
        </div>
        {/* {editable && ( */}
        {media.duration && (
          <div>
            {timeFromSeconds(time)} - {/* {timeFromSeconds(media.endTime)} */}
            {timeFromSeconds(media.duration)}
          </div>
        )}
        {/* )} */}
        {/* {editable && (
          <Button onClick={() => setSetupModal(!setupModal)}>Cài đặt</Button>
        )} */}
      </div>
      {editable && (
        <div style={deleteButtonStyle}>
          <Button onClick={() => setQuestionMedia()} danger>
            <i className="fas fa-trash-alt" style={{ marginRight: "10px" }} />{" "}
            Xoá
          </Button>
        </div>
      )}
      {setupModal && (
        <SettingStartEndTimePlayModal
          media={media}
          visible={setupModal}
          setVisible={setSetupModal}
          setQuestionMediaTime={setQuestionMediaTime}
        />
      )}
    </div>
  );
};

export default Audio;
