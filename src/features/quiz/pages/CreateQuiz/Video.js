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

const Video = ({ media, setQuestionMedia, setQuestionMediaTime }) => {
  const [play, setPlay] = useState(false);
  const [setupModal, setSetupModal] = useState(false);

  return (
    <div style={containerStyle} className="video-field">
      <div style={{ width: "100%" }}>
        <iframe
          frameBorder="0"
          allowFullScreen="1"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube video player"
          width="400px"
          height="250px"
          src={`https://www.youtube.com/embed/${media.url}?autoplay=0&mute=0&controls=0&start=${media.startTime}&end=${media.endTime}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&fs=1&enablejsapi=1&widgetid=45`}
          id="widget46"
        ></iframe>
      </div>
      <div style={deleteButtonStyle}>
        <div>
          {timeFromSeconds(media.startTime)} - {timeFromSeconds(media.endTime)}
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
      <SettingStartEndTimePlayModal
        media={media}
        visible={setupModal}
        setVisible={setSetupModal}
        setQuestionMediaTime={setQuestionMediaTime}
      />
    </div>
  );
};

export default Video;
