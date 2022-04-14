import { Button, Modal } from "antd";
import React, { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingBottom: "30px",
};

const deleteButtonStyle = {
  position: "absolute",
  bottom: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  padding: "0 10px",
};

const secondsToTime = (seconds) => {
  const date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};

const timesToSeconds = (times) => {
  const [minutes, seconds] = times.split(":");
  return Number(minutes) * 60 + Number(seconds);
};

export const SettingStartEndTimePlayModal = ({
  visible,
  setVisible,
  media,
  setQuestionMediaTime,
}) => {
  const { startTime: start, endTime: end } = media;
  const [startTime, setStartTime] = useState(secondsToTime(start));
  const [endTime, setEndTime] = useState(secondsToTime(end));
  const [error, setError] = useState(false);

  const onChangeStartTime = (e) => {
    setError();
    setStartTime(e.target.value);
  };

  const onChangeEndTime = (e) => {
    setError();
    setEndTime(e.target.value);
  };

  const onSubmit = () => {
    if (timesToSeconds(startTime) >= timesToSeconds(endTime)) {
      setError("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc");
      return;
    }
    if (timesToSeconds(endTime) > media.duration) {
      setError(
        "Thời gian kết thúc phải nhỏ hơn " + secondsToTime(media.duration)
      );
      return;
    }
    setQuestionMediaTime({
      startTime: timesToSeconds(startTime),
      endTime: timesToSeconds(endTime),
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
            <div>Tối đa: {secondsToTime(media.duration)}</div>
          </div>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div style={{ textAlign: "right", marginTop: "16px" }}>
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

const Video = ({ media, setQuestionMedia, setQuestionMediaTime }) => {
  const [setupModal, setSetupModal] = useState(false);

  return (
    <div style={containerStyle} className="video-field">
      <div style={{ width: "100%" }}>
        <iframe
          frameBorder="0"
          allowFullScreen="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="400px"
          height="250px"
          src={`https://www.youtube-nocookie.com/embed/${media.url}?start=${media.startTime}&end=${media.endTime}&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&widgetid=43`}
          id="widget46"
        />
      </div>
      <div style={deleteButtonStyle}>
        <div>
          {secondsToTime(media.startTime)} - {secondsToTime(media.endTime)}
        </div>
        <div>
          <Button
            style={{ marginRight: "8px" }}
            onClick={() => setSetupModal(!setupModal)}
          >
            Cài đặt
          </Button>
          <Button onClick={() => setQuestionMedia()} danger>
            <i className="fas fa-trash-alt" style={{ marginRight: "10px" }} />{" "}
            Xoá
          </Button>
        </div>
      </div>
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

export default Video;
