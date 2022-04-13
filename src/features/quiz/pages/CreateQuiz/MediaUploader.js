import React, { useState } from "react";
import { handleUploadImage } from "../../../../utils";
import { baseURL } from "../../../../api/axiosClient";
import {
  FileImageOutlined,
  PlayCircleOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Button, Input, Modal, Radio } from "antd";

const MediaUploader = ({ question, setQuestionImage }) => {
  const [loading, setLoading] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleSubmitFile = (e) => {
    const file = e.target.files[0];
  };

  return (
    <div className="image">
      <div
        className="image-upload-button"
        onClick={() => setShowUploadModal(true)}
      >
        <FileImageOutlined />
        <div>Thêm ảnh, video, âm thanh 123</div>
      </div>
      <Modal
        visible={showUploadModal}
        onCancel={() => setShowUploadModal(false)}
      >
        <div className="image-upload-modal">
          <div className="image-upload-modal-header">
            <div className="image-upload-modal-header-title">
              <Radio.Group
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)}
              >
                <Radio.Button value="image">
                  <FileImageOutlined /> Hình ảnh
                </Radio.Button>
                <Radio.Button value="video">
                  <PlayCircleOutlined /> Video
                </Radio.Button>
                <Radio.Button value="audio">
                  <SoundOutlined /> Âm thanh
                </Radio.Button>
              </Radio.Group>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );

  return (
    <div className="image">
      {question.image && !loading ? (
        <>
          <img src={question.image} />
          <div className="image-actions">
            <Button>
              <label htmlFor="upload-image">Thay ảnh</label>
            </Button>
            <Button onClick={() => setQuestionImage("")}>Xoá</Button>
          </div>
        </>
      ) : (
        <label htmlFor="upload-image">
          <div className="image-upload-button">
            <FileImageOutlined />
            <p>
              {!loading ? "Thêm ảnh, video, âm thanh" : "Đang tải ảnh lên..."}
            </p>
          </div>
        </label>
      )}
      <input
        id="upload-image"
        type="file"
        name="image"
        onChange={handleSubmitFile}
        className="form-input"
      />
    </div>
  );
};

export default MediaUploader;
