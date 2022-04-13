import { Button, Modal } from "antd";
import React, { useState } from "react";
import ReactHowler from "react-howler";

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
  background: "#fff",
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

const SettingStartEndTimePlayModal = ({
  visible,
  setVisible,
  media,
  setQuestionMediaTime,
}) => {
  const { startTime: start, endTime: end } = media;
  const [startTime, setStartTime] = useState(timeFromSeconds(start));
  const [endTime, setEndTime] = useState(timeFromSeconds(end));

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const onSubmit = () => {
    setQuestionMediaTime({
      startTime: startTime.split(":").reduce((acc, cur) => acc * 60 + cur),
      endTime: endTime.split(":").reduce((acc, cur) => acc * 60 + cur),
    });
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      width="400px"
    >
      <div>
        <div
          style={{
            display: "flex",
            marginBottom: "16px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "45%" }}>
            <label>Bắt đầu</label>
            <br />
            <input
              type="time"
              value={startTime}
              className="form-control"
              onChange={onChangeStartTime}
              min="00:00"
              max="23:59"
              style={{
                fontSize: "16px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>

          <div style={{ width: "45%" }}>
            <label>Kết thúc</label>
            <br />
            <input
              type="time"
              value={endTime}
              className="form-control"
              onChange={onChangeEndTime}
              min="00:00"
              max="23:59"
              style={{
                fontSize: "16px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => setVisible(false)}
            danger
            style={{ marginRight: "10px" }}
          >
            Hủy
          </Button>
          <Button onClick={onSubmit} type="primary">
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const Audio = ({
  media,
  setQuestionMedia,
  setQuestionMediaTime,
  editable = true,
}) => {
  const [play, setPlay] = useState(false);
  const [setupModal, setSetupModal] = useState(false);

  return (
    <div style={containerStyle} className="audio-field">
      <ReactHowler src={media.url} playing={play} />
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
        {editable && (
          <div>
            {timeFromSeconds(media.startTime)} -{" "}
            {timeFromSeconds(media.endTime)}
          </div>
        )}
        {editable && (
          <Button onClick={() => setSetupModal(!setupModal)}>Cài đặt</Button>
        )}
      </div>
      {editable && (
        <div style={deleteButtonStyle}>
          <Button onClick={() => setQuestionMedia()} danger>
            <i className="fas fa-trash-alt" style={{ marginRight: "10px" }} />{" "}
            Xoá
          </Button>
        </div>
      )}
      <SettingStartEndTimePlayModal
        media={media}
        visible={setupModal}
        setVisible={setSetupModal}
        setQuestionMediaTime={setQuestionMediaTime}
      />
    </div>
  );
};

export default Audio;
