import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Switch } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { handleUploadImage } from "../../../../utils";

import "../styles.scss";

// const q = {
//   name: "Khảo sát về Poly Quiz",
//   backgroundImage: "",
//   coverImage: "",
//   music: "",
//   needLogin: false,
//   numberOfPlayer: 20,
// };

const QuestionSettingModal = ({
  quiz,
  setQuiz,
  isShowSetting,
  setIsShowSetting,
  loading: creating,
  submitCreateQuiz,
}) => {
  const [imageData, setImageData] = useState({
    backgroundImage: quiz.backgroundImage,
    coverImage: quiz.coverImage,
  });
  const [loading, setLoading] = useState("");

  const handleSubmitFile = async (e, name) => {
    e.preventDefault();
    const file = e.target.files[0];
    try {
      setLoading(name);
      const imageUrl = await handleUploadImage(file);
      setImageData({
        ...imageData,
        [name]: imageUrl,
      });
      setLoading("");
      e.target.value = null;
    } catch (error) {
      console.log(error);
      setLoading("");
    }
  };

  const onFinish = (values) => {
    if (creating) {
      return;
    }
    if (isShowSetting === "save") {
      submitCreateQuiz({ ...values, ...imageData });
      return;
    }
    setIsShowSetting(false);
    setQuiz({ ...values, ...imageData });
  };

  return (
    <Form
      name="quizSettingForm"
      if="quizSettingForm"
      initialValues={quiz}
      layout="vertical"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên quiz"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Giới hạn số lượng người tham gia" name="numberOfPlayer">
        <InputNumber min={1} max={100} />
      </Form.Item>
      <Form.Item label="Người tham gia cần đăng nhập" name="needLogin">
        <Switch defaultChecked={quiz.needLogin} />
      </Form.Item>
      <Form.Item label="Ảnh bìa" name="coverImage">
        <div className="image-container">
          <div className="image">
            {imageData.coverImage ? (
              <>
                <img src={imageData.coverImage} />
                <div className="image-actions">
                  <Button>
                    <label htmlFor="upload-cover-image">Thay ảnh</label>
                  </Button>
                  <Button
                    onClick={() =>
                      setImageData({ ...imageData, coverImage: "" })
                    }
                  >
                    Xoá
                  </Button>
                </div>
              </>
            ) : (
              <label htmlFor="upload-cover-image">
                <div className="image-upload-button">
                  <FileImageOutlined />
                  <p>
                    {loading === "coverImage"
                      ? "Đang tải ảnh lên..."
                      : "Chọn ảnh"}
                  </p>
                </div>
              </label>
            )}
            <input
              id="upload-cover-image"
              type="file"
              onChange={(e) => handleSubmitFile(e, "coverImage")}
              className="form-input"
            />
          </div>
        </div>
      </Form.Item>
      <Form.Item label="Ảnh nền" name="backgroundImage">
        <div className="image-container">
          <div className="image">
            {imageData.backgroundImage ? (
              <>
                <img src={imageData.backgroundImage} />
                <div className="image-actions">
                  <label htmlFor="upload-background-image">
                    <Button>Thay ảnh</Button>
                  </label>
                  <Button
                    onClick={() =>
                      setImageData({ ...imageData, backgroundImage: "" })
                    }
                  >
                    Xoá
                  </Button>
                </div>
              </>
            ) : (
              <label htmlFor="upload-background-image">
                <div className="image-upload-button">
                  <FileImageOutlined />
                  <p>
                    {loading === "backgroundImage"
                      ? "Đang tải ảnh lên..."
                      : "Chọn ảnh"}
                  </p>
                </div>
              </label>
            )}
            <input
              id="upload-background-image"
              type="file"
              onChange={(e) => handleSubmitFile(e, "backgroundImage")}
              className="form-input"
            />
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default QuestionSettingModal;
